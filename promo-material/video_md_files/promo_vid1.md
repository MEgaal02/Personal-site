# Video Analysis & Remotion Blueprint: Egaal Process Trailer
**Reference Video:** [Our Process Template (LangEase)](https://youtu.be/SgmuplXU2iY?si=Dkee0z29Mz7c-_Xu)  
**Total Duration:** 33.1 Seconds (993 Frames @ 30fps)  
**Goal:** Reverse-engineer visual details for recreation in Remotion.dev using Egaal assets.

---

## PASS 1: STRUCTURE
**Overall Message:** A high-speed, premium showcase of a digital product's workflow and impact.  
**Total Scenes:** 12  
**Average Scene Length:** ~2.7 seconds  

| Scene | Start (s) | End (s) | Duration (s) | Description |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0:00.0 | 0:01.2 | 1.2s | High-impact intro word |
| 2 | 0:01.2 | 0:03.5 | 2.3s | Primary value proposition expansion |
| 3 | 0:03.5 | 0:06.0 | 2.5s | UI Mockup: Desktop Context |
| 4 | 0:06.0 | 0:08.5 | 2.5s | Feature interaction: Tooltip/Selection |
| 5 | 0:08.5 | 0:11.5 | 3.0s | Workflow: Sidebar/Library management |
| 6 | 0:11.5 | 0:14.5 | 3.0s | Data Visualization: Dashboard/Stats |
| 7 | 0:14.5 | 0:17.0 | 2.5s | Interactivity: Interactive UI/Game |
| 8 | 0:17.0 | 0:20.0 | 3.0s | Content Integration: Video/Media |
| 9 | 0:20.0 | 0:23.0 | 3.0s | Multi-device: Mobile Mockup |
| 10 | 0:23.0 | 0:26.0 | 3.0s | Secondary Value Proposition |
| 11 | 0:26.0 | 0:30.0 | 4.0s | Call to Action (CTA) |
| 12 | 0:30.0 | 0:33.1 | 3.1s | Outro & Brand Identity |

---

## PASS 2: VISUAL INVENTORY

### Backgrounds & Global Elements
- **Background:** Solid `#0a0a0c` (Near Black) with a subtle radial gradient at the center (slightly lighter `#0f0f12`).
- **Watermark:** Faint Egaal logo at top-left, opacity 5% (Gold `#e8c547`).
- **Layout:** Centered content with 10% safe-area margins.

### Scene-Specific Elements
| Scene | Text Elements | Image/UI Assets |
| :--- | :--- | :--- |
| **1** | "Turn" (Large, Gradient Gold) | N/A |
| **2** | "Turn your browser into a language tutor" | N/A |
| **3** | N/A | **Asset:** `IDE.png` (Context: Development Environment) |
| **4** | Translation tooltips | Cursor icon, Text selection highlight |
| **5** | "Saved Words", "Add to Library" | **Asset:** `Our-proccess.png` (Sidebar/Flow) |
| **6** | "Words Learned: 452", "7-Day Streak" | **Asset:** `increased_roi.png` (Stats Card) |
| **7** | Matching pairs, UI buttons | UI Cards, Interaction icons |
| **8** | "History Lecture", Play button | **Asset:** `our_impact.png` (Video Card) |
| **9** | "Sync Complete" | Mobile Frame mockup |
| **10** | "Learn anywhere, anytime" | N/A |
| **11** | "Start your journey", "Start for free" | CTA Button (Gold `#e8c547`) |
| **12** | "langease.ai" (Update to `builtbyegaal.com`) | Egaal Logo |

---

## PASS 3: MOTION & ANIMATION

### Global Transitions
- **Cuts:** All scenes use hard cuts EXCEPT between Scene 11 and 12.
- **Fade-to-White:** 10-frame transition from Scene 11 to 12.

### Animation Logic (Remotion Implementation)
1.  **Text Entrance (Scene 1-2):**
    - **Opacity:** 0 -> 1 (Frames 0-15).
    - **Scale:** 0.8 -> 1.0 (Frames 0-15) with `spring(frame, { mass: 0.5, stiffness: 100 })`.
    - **Stagger:** Each word starts 3 frames after the previous one.
2.  **UI Mockup Slide (Scene 3, 5, 9):**
    - **Entrance:** `translateY`: 100px -> 0px over 20 frames.
    - **Easing:** `spring` with slight overshoot (bouncy).
3.  **Cursor Choreography (Scene 4, 8):**
    - **Path:** Linear movement from (X1, Y1) to (X2, Y2).
    - **Click:** 10-frame circular ripple effect (`scale`: 0 -> 2, `opacity`: 0.5 -> 0).
4.  **Counter Animation (Scene 6):**
    - **Logic:** `interpolate(frame, [0, 45], [0, 452])` wrapped in `Math.round()`.
5.  **Progress/Sync Bar (Scene 9):**
    - **Width:** 0% -> 100% (Linear, 60 frames).

---

## PASS 4: COLOR & TYPOGRAPHY

### Color Palette (Hex)
- **Primary Background:** `#0a0a0c` (Near Black)
- **Elevated Background:** `#0f0f12` (Sections/Header)
- **Main Accent (Gold):** `#e8c547` (Buttons, Icons, Highlights)
- **Heading Text:** `#e8e6e1` (Off-white)
- **Body/UI Text:** `#8a8a8d` (Medium Grey)
- **Success Green:** `#4ade80` (Checkmarks/Status)
- **Accent Glow:** `rgba(232, 197, 71, 0.08)` (Subtle gold glow for cards)

### Typography Specs
- **Heading Font:** `Syne` (Bold/Extra Bold for high impact)
- **Body Font:** `Outfit` (Medium/Regular for readability)
- **Mono Font:** `JetBrains Mono` (For technical/code elements)
- **Weights:**
  - **Extra Bold (800):** Intro words, CTA headings.
  - **Semi Bold (600):** UI labels, sub-headings.
  - **Regular (400):** Descriptions, tooltips.
- **Sizes:**
  - **Large:** 120px (Intro text).
  - **Medium:** 48px (Primary value prop).
  - **Small:** 24px (UI/Mockup text).

---

## ASSET MAPPING (FOR EGAAL RECREATION)
To adapt this structure using the provided images from `promo-material/images`:

1.  **Scene 3 (Browser):** Use `IDE.png` as the main desktop context.
2.  **Scene 5 (Process):** Use `Our-proccess.png` as the sidebar or central flow visualization.
3.  **Scene 6 (Impact/Stats):** Use `increased_roi.png` for the dashboard/stats section.
4.  **Scene 8 (Impact/Video):** Use `our_impact.png` as the featured content card.
5.  **Outro:** Ensure the URL is updated to `builtbyegaal.com`.
6. **Reference the detailed transcript file for the exact text and timing of each scene. It contains all the text and timing information needed to recreate the video exactly as it is in the reference video. It also includes the color palette and typography specs for each scene. This will ensure that the video is recreated exactly as it is in the reference video.**