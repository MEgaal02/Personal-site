"""
1. Generate sfx_cinematic_pulse.wav — replaces the ping pings
2. Process egaal_outro.mp4 voice: sharpen + cinematic reverb tail
"""
import numpy as np
import wave
import subprocess
import os
import struct
from scipy import signal as sp

SR = 44100
FFMPEG = r'D:\Egaal Software Solutions Ltd\Company Tools\Company Website\Personal-site\egaal-promo\node_modules\@remotion\compositor-win32-x64-msvc\ffmpeg.exe'
PUBLIC = r'D:\Egaal Software Solutions Ltd\Company Tools\Company Website\Personal-site\egaal-promo\public'

def save_wav(name, data, sr=SR):
    data = np.clip(data, -1.0, 1.0)
    ints = (data * 32767).astype(np.int16)
    path = os.path.join(PUBLIC, name)
    with wave.open(path, 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sr)
        f.writeframes(ints.tobytes())
    kb = os.path.getsize(path) // 1024
    print(f'  {name}  ({len(data)/sr:.2f}s  {kb}KB)')
    return path

def read_wav(path):
    with wave.open(path, 'r') as f:
        nch = f.getnchannels()
        sr = f.getframerate()
        raw = f.readframes(f.getnframes())
    data = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32767.0
    if nch == 2:
        data = data[::2]  # take left channel
    return data, sr

# ─────────────────────────────────────────────────────────────────────────────
# PART 1: CINEMATIC PULSE — replaces sfx_ping.wav
# Layered: sub-bass thud + mid body + high shimmer
# Sounds like a system activation or cinematic "hit"
# ─────────────────────────────────────────────────────────────────────────────
print('Generating sfx_cinematic_pulse.wav...')
dur = 1.2
n = int(SR * dur)
T = np.linspace(0, dur, n, endpoint=False)

# Layer 1: Sub-bass thud (38 Hz, fast punch)
f_drop = 38 * np.exp(-T * 2.5)       # pitch drops slightly for weight
phase1 = np.cumsum(f_drop / SR * 2 * np.pi)
sub = np.sin(phase1) * np.exp(-T * 4.5)

# Layer 2: Body presence (160 Hz, sustained)
body = np.sin(2 * np.pi * 160 * T) * np.exp(-T * 3.0) * 0.5

# Layer 3: High shimmer that rises then fades (2.2 kHz)
shimmer = np.sin(2 * np.pi * 2200 * T) * np.exp(-T * 6.0) * 0.22

# Layer 4: Ultra-subtle "air" at 8 kHz
air = np.sin(2 * np.pi * 8000 * T) * np.exp(-T * 18.0) * 0.08

sig = sub * 0.55 + body * 0.28 + shimmer * 0.12 + air * 0.05

# Smooth attack
a = int(SR * 0.004)
sig[:a] *= np.linspace(0, 1, a)

save_wav('sfx_cinematic_pulse.wav', sig * 0.72)

# ─────────────────────────────────────────────────────────────────────────────
# PART 2: PROCESS VOICE — egaal_outro.mp4
# Chain: high-pass → presence boost → air boost → compression → reverb tail
# ─────────────────────────────────────────────────────────────────────────────
print('\nExtracting voice from egaal_outro.mp4...')
src_mp4 = os.path.join(PUBLIC, 'egaal_outro.mp4')
raw_wav = os.path.join(PUBLIC, '_voice_raw.wav')

# Extract mono 44100 Hz WAV via bundled ffmpeg
subprocess.run([
    FFMPEG, '-y', '-i', src_mp4,
    '-vn', '-ac', '1', '-ar', str(SR), '-f', 'wav', raw_wav
], check=True, capture_output=True)

voice, _ = read_wav(raw_wav)
os.remove(raw_wav)
print(f'  Loaded voice: {len(voice)/SR:.3f}s  ({len(voice)} samples)')

# ── EQ Chain ─────────────────────────────────────────────────────────────────

def apply_filter(data, filter_sos):
    return sp.sosfilt(filter_sos, data)

# 1. High-pass at 100 Hz — removes low-end rumble and muddiness
hp = sp.butter(4, 100 / (SR / 2), btype='high', output='sos')
voice = apply_filter(voice, hp)

# 2. Cut box/mud at 320 Hz (−3 dB notch shelf)
b320, a320 = sp.iirpeak(320 / (SR / 2), Q=1.2)
notch_sos = np.array([[b320[0], b320[1], b320[2], a320[0], a320[1], a320[2]]])
voice = sp.sosfilt(notch_sos, voice) * 0.88 + voice * 0.12  # gentle blend

# 3. Presence boost at 3.5 kHz (+4 dB shelf) — sharpens articulation
b_pre, a_pre = sp.iirpeak(3500 / (SR / 2), Q=1.0)
presence_sos = np.array([[b_pre[0], b_pre[1], b_pre[2], a_pre[0], a_pre[1], a_pre[2]]])
presence_boost = sp.sosfilt(presence_sos, voice) * 0.35
voice = voice + presence_boost

# 4. Air boost at 10 kHz (+3 dB) — adds brilliance/cinematic openness
b_air, a_air = sp.iirpeak(10000 / (SR / 2), Q=0.8)
air_sos = np.array([[b_air[0], b_air[1], b_air[2], a_air[0], a_air[1], a_air[2]]])
air_boost = sp.sosfilt(air_sos, voice) * 0.22
voice = voice + air_boost

# ── Compression ──────────────────────────────────────────────────────────────
# Simple lookahead-free brick compression: ratio 3:1, threshold -18 dBFS
threshold = 0.126   # -18 dBFS
ratio = 3.0
attack_c = int(SR * 0.005)   # 5ms attack
release_c = int(SR * 0.08)   # 80ms release
gain = np.ones(len(voice))
level = 0.0
for i in range(len(voice)):
    sample_level = abs(voice[i])
    if sample_level > level:
        level = level + (sample_level - level) / max(attack_c, 1)
    else:
        level = level + (sample_level - level) / max(release_c, 1)
    if level > threshold:
        gain[i] = threshold + (level - threshold) / ratio
        gain[i] = gain[i] / max(level, 1e-9)
    else:
        gain[i] = 1.0
voice_comp = voice * gain
# Make-up gain: bring up 4 dB
voice_comp = voice_comp * 1.58

# ── Reverb tail ──────────────────────────────────────────────────────────────
# Algorithmic reverb: short pre-delay + decaying noise IR
# Cinematic but tight — adds space without washing out the voice
rng = np.random.default_rng(44)
ir_dur = 1.1       # 1.1s reverb tail
pre_delay_ms = 22  # 22ms pre-delay (separates direct sound)
ir_n = int(SR * ir_dur)
ir = rng.standard_normal(ir_n)

# Shape IR: exponential decay with early reflection boost
decay_curve = np.exp(-np.linspace(0, 5.5, ir_n))
early = np.zeros(ir_n)
for ms in [8, 14, 20, 28]:           # early reflections
    idx = int(SR * ms / 1000)
    if idx < ir_n:
        early[idx] = 0.35 * np.exp(-ms / 30)
ir = (ir * decay_curve * 0.6) + early

# Normalize IR
ir = ir / (np.max(np.abs(ir)) + 1e-9)

# Pre-delay
pre_n = int(SR * pre_delay_ms / 1000)
ir_delayed = np.concatenate([np.zeros(pre_n), ir])

# Convolve (fast with scipy)
wet = sp.fftconvolve(voice_comp, ir_delayed, mode='full')[:len(voice_comp)]

# Mix: 80% dry, 20% wet (subtle cinematic space)
out = voice_comp * 0.80 + wet * 0.20

# Normalize to -2 dBFS headroom
peak = np.max(np.abs(out))
if peak > 0:
    out = out / peak * 0.80

print('  EQ + compression + reverb applied')
save_wav('egaal_outro_processed.wav', out)

# Clean up any temp files
for f in ['_voice_raw.wav']:
    p = os.path.join(PUBLIC, f)
    if os.path.exists(p):
        os.remove(p)

print('\nDone.')
