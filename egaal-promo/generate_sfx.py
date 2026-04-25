"""
Premium SFX for Egaal promo — minimal, clean, resonant.
Reference aesthetic: Linear / Stripe / Apple product videos.
No whooshes. Pure tones, natural decay, subtle micro-interactions.
"""
import numpy as np
import wave
import os

SR = 44100
PUBLIC = os.path.join(os.path.dirname(__file__), 'public')

def save(name, data, volume=1.0):
    data = np.clip(data * volume, -1.0, 1.0)
    ints = (data * 32767).astype(np.int16)
    path = os.path.join(PUBLIC, name)
    with wave.open(path, 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(ints.tobytes())
    kb = os.path.getsize(path) // 1024
    print(f'  {name:<30} {len(data)/SR:.2f}s  {kb}KB')

def t(dur):
    return np.linspace(0, dur, int(SR * dur), endpoint=False)

def fade_in(arr, attack_s=0.008):
    n = int(SR * attack_s)
    arr[:n] *= np.linspace(0, 1, n)
    return arr

print('Generating premium SFX...\n')

# ─────────────────────────────────────────────────────────────────────────────
# 1. AMBIENT PAD — plays throughout entire video (75s)
#    Very quiet A-minor drone: root + minor third + fifth
#    Gives depth without distraction
# ─────────────────────────────────────────────────────────────────────────────
dur = 75.0
T = t(dur)
# Slight detuning on each partial for organic warmth
sig = (np.sin(2*np.pi * 110.0  * T) * 0.55   # A2
     + np.sin(2*np.pi * 110.03 * T) * 0.10   # A2 chorus
     + np.sin(2*np.pi * 130.81 * T) * 0.30   # C3 (minor 3rd)
     + np.sin(2*np.pi * 164.81 * T) * 0.25   # E3 (5th)
     + np.sin(2*np.pi * 220.0  * T) * 0.15)  # A3 (octave)
# Slow attack, hold, slow fade at end
env = np.ones(len(T))
a = int(SR * 2.5); env[:a] = np.linspace(0, 1, a)
r = int(SR * 4.0); env[-r:] = np.linspace(1, 0, r)
save('sfx_ambient.wav', sig * env, volume=0.12)

# ─────────────────────────────────────────────────────────────────────────────
# 2. GOLD CHIME — crystalline bell for reveals and key moments (1.4s)
#    C6 fundamental + G6 + C7 harmonics, natural exponential decay
#    Used: Scene 3 intro, Scene 5 first node, Scene 9 pulse, Scene 10 ROI
# ─────────────────────────────────────────────────────────────────────────────
dur = 1.4
T = t(dur)
sig = (np.sin(2*np.pi * 1046.5 * T) * 0.55   # C6
     + np.sin(2*np.pi * 1568.0 * T) * 0.28   # G6
     + np.sin(2*np.pi * 2093.0 * T) * 0.17)  # C7
env = np.exp(-T * 3.2)
sig = fade_in(sig * env, attack_s=0.003)
save('sfx_chime.wav', sig, volume=0.58)

# ─────────────────────────────────────────────────────────────────────────────
# 3. UI TICK — tiny, precise click for step cards and micro-interactions (0.09s)
#    A sharp sine burst at ~1100 Hz, almost instant decay
#    Used: Scene 4 step cards (x4), Scene 6 container appear
# ─────────────────────────────────────────────────────────────────────────────
dur = 0.09
T = t(dur)
sig = np.sin(2*np.pi * 1100 * T)
env = np.exp(-T / 0.008)
sig = fade_in(sig * env, attack_s=0.001)
save('sfx_tick.wav', sig, volume=0.42)

# ─────────────────────────────────────────────────────────────────────────────
# 4. SOFT APPEAR — gentle low-mid "poof" when UI panels slide in (0.22s)
#    A very soft sine bump around 280 Hz — felt more than heard
#    Used: Scene 3 image slide, Scene 6 image slide, Scene 7 split panels, Scene 8 IDE
# ─────────────────────────────────────────────────────────────────────────────
dur = 0.22
T = t(dur)
sig = np.sin(2*np.pi * 280 * T)
env = np.exp(-T / 0.045)
sig = fade_in(sig * env, attack_s=0.005)
save('sfx_appear.wav', sig, volume=0.38)

# ─────────────────────────────────────────────────────────────────────────────
# 5. NODE PING — clean, airy notification tone for network/radar pulses (0.55s)
#    E5 + B5 — open, spacious. Faster decay than the chime.
#    Used: Scene 5 AI connections, Scene 9 UK map nodes
# ─────────────────────────────────────────────────────────────────────────────
dur = 0.55
T = t(dur)
sig = (np.sin(2*np.pi * 659.3 * T) * 0.6    # E5
     + np.sin(2*np.pi * 987.8 * T) * 0.4)   # B5
env = np.exp(-T * 5.5)
sig = fade_in(sig * env, attack_s=0.002)
save('sfx_ping.wav', sig, volume=0.52)

# ─────────────────────────────────────────────────────────────────────────────
# 6. TAGLINE IMPACT — deep resonant hit for "MORE VOLUME / MORE VALUE" (0.9s)
#    Low D2 (73 Hz) + A2 (110 Hz) + shimmer at A4 (440 Hz)
#    Clean, no noise — premium "gong" quality
# ─────────────────────────────────────────────────────────────────────────────
dur = 0.9
T = t(dur)
# Pitch-drop on the bass (adds weight)
f_drop = 73.4 * np.exp(-T * 1.2)
phase = np.cumsum(f_drop / SR * 2 * np.pi)
bass = np.sin(phase) * 0.65
mid  = np.sin(2*np.pi * 110.0 * T) * 0.25
shim = np.sin(2*np.pi * 440.0 * T) * 0.10
sig = bass + mid + shim
env = np.exp(-T * 2.8)
sig = fade_in(sig * env, attack_s=0.003)
save('sfx_impact.wav', sig, volume=0.72)

# ─────────────────────────────────────────────────────────────────────────────
# 7. OUTRO RESOLVE — warm A-major chord swell for brand close (3.0s)
#    A3 + C#4 + E4: resolves the minor tension from the ambient pad
#    Long attack, long release — cinematic
# ─────────────────────────────────────────────────────────────────────────────
dur = 3.0
T = t(dur)
sig = (np.sin(2*np.pi * 220.0 * T) * 0.50   # A3
     + np.sin(2*np.pi * 277.2 * T) * 0.30   # C#4
     + np.sin(2*np.pi * 329.6 * T) * 0.20)  # E4
a = int(SR * 0.4); r = int(SR * 1.2)
env = np.ones(len(T))
env[:a] = np.linspace(0, 1, a)
env[-r:] = np.linspace(1, 0, r)
save('sfx_outro.wav', sig * env, volume=0.48)

print('\nAll SFX saved.')
