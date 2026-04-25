import requests
import os
import json

API_KEY = "sk_375815a036cc8aa6e62bf09f9eeb898dc0668092d63653eb"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public")

SCENES = [
    ("vo_scene01.mp3", "You have a business problem… Production inefficiencies… slow systems… and outdated workflows."),
    ("vo_scene02.mp3", "Instead of automation… you're stuck with manual processes… disconnected systems… and lost opportunities."),
    ("vo_scene03.mp3", "At Egaal Software Solutions… we take your current workflow… and completely transform it."),
    ("vo_scene04.mp3", "From understanding your goals… to designing, building, and delivering scalable systems."),
    ("vo_scene05.mp3", "We ten-x your production speed using AI-driven software and intelligent automation."),
    ("vo_scene06.mp3", "We containerise your application… so you can test and interact with live prototypes in real-time."),
    ("vo_scene07.mp3", "Whether it's B2B platforms… or B2C products… you see your system before it goes live."),
    ("vo_scene08.mp3", "Behind every product… is powerful engineering."),
    ("vo_scene09.mp3", "Our impact spans across the UK… connecting industries… transforming businesses."),
    ("vo_scene10.mp3", "More adoption… more efficiency… more return on investment."),
    ("vo_scene11.mp3", "More volume… more value."),
    ("vo_scene12.mp3", "Egaal Software Solutions."),
]

HEADERS = {"xi-api-key": API_KEY, "Content-Type": "application/json"}

def get_voice_id():
    resp = requests.get("https://api.elevenlabs.io/v1/voices", headers=HEADERS)
    resp.raise_for_status()
    voices = resp.json()["voices"]
    # Prefer Daniel or George (British, premium)
    for name in ["Daniel - Steady Broadcaster", "Daniel", "George", "Charlie"]:
        for v in voices:
            if v["name"] == name:
                print(f"Using voice: {v['name']} ({v['voice_id']})")
                return v["voice_id"]
    # Fall back to first available
    voice = voices[0]
    print(f"Falling back to voice: {voice['name']} ({voice['voice_id']})")
    return voice["voice_id"]

def generate(voice_id, text, out_path):
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.45,
            "similarity_boost": 0.78,
            "style": 0.35,
            "use_speaker_boost": True,
        },
    }
    resp = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        headers={**HEADERS, "Accept": "audio/mpeg"},
        json=payload,
    )
    resp.raise_for_status()
    with open(out_path, "wb") as f:
        f.write(resp.content)
    size_kb = len(resp.content) // 1024
    print(f"  Saved {os.path.basename(out_path)} ({size_kb} KB)")

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    voice_id = get_voice_id()
    print(f"\nGenerating {len(SCENES)} voiceover files...\n")
    for filename, text in SCENES:
        out_path = os.path.join(OUTPUT_DIR, filename)
        print(f"[{filename}] {text[:60]}...")
        generate(voice_id, text, out_path)
    print(f"\nDone. All files saved to: {OUTPUT_DIR}")
