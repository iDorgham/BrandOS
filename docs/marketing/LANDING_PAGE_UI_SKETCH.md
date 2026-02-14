# Brand OS Landing Page: UI Sketch & Component Guide 🎨

*Architecture for a high-fidelity, conversion-engineered enterprise landing page inspired by IBM Carbon.*

---

## 🏗️ Visual Architecture

The page is designed as a **long-form vertical story**, moving from high-level emotional hooks to deep technical proof and finally social/business closure.

### 1. Header: The Structural Gate
- **Style**: Fixed, thin (48px), #161616 with 80% blur.
- **Elements**: 
    - Mini Carbon Logo (Zap).
    - Utility Nav (Identity, Infrastructure, Governance).
    - Status Indicator: `[SYSTEM: OPERATIONAL]`.
    - CTA: "Request Access" (Carbon Blue 60).

### 2. Section: The Mega Hero (Big Bold Titles)
- **Title Style**: IBM Plex Sans, 120px+, Weight 600, Tracking -0.05em. 
- **Selling Hook**: "SCALE YOUR **IDENTITY**. <br/> NOT JUST YOUR OUTPUT."
- **Background**: Subtle 2x Grid (32px) + Cinematic Noise.
- **Micro-Interaction**: Floating "DNA Fragments" (SVG paths) that react to scroll.

### 3. Section: The Drift Crisis (Problem)
- **Visual**: Data-heavy "Audit Fail" visualizations.
- **Headline**: "YOUR BRAND GUIDELINES ARE **DEAD**."
- **Content**: Explaining the cost of "Brand Drift."
- **Element**: Carbon-style "Status Card" showing a failing compliance score.

### 4. Section: The AI Studio (Intelligence)
- **Layout**: 50/50 Split.
- **Left**: Bold description of "Multi-Model Orchestration."
- **Right**: A "Live UI" mockup of the Studio view with Intensity Sliders (`Energy`, `Warmth`, `Sophistication`).

### 5. Section: The Moodboard Canvas (Infrastructure)
- **Headline**: "DESIGN THE **LOGIC**. <br/> NOT JUST THE PIXELS."
- **Visual**: A large, interactive-looking mock of the Node-based canvas.
- **Elements**: Reference nodes connected to "Prompt Generator" nodes.

### 6. Section: Governance & ROI (Business Proof)
- **Headline**: "BULLETPROOF **COMPLIANCE**."
- **Component**: A Carbon Data Table showing comparative "Creative Velocity" and "ROI."
- **Stat Grid**: Huge numbers (80% Faster, 0% Drift) in Carbon Gray 100 boxes.

### 7. Section: Enterprise FAQ (Conversion)
- **Headline**: "TECHNICAL **SPECIFICATIONS**."
- **Component**: Carbon Accordion (Flat, no radius, 48px rows).
- **Content**: Questions on Security, Data Sovereignty, and Integration.

### 8. Footer: The Protocol Closure
- **Elements**: Deep site map, Network Status, Legal, and "Precision in creative governance" tagline.

---

## 🛠️ Component Specifications

| Component | Style | Attributes |
| :--- | :--- | :--- |
| **MegaTitle** | Custom | `text-8xl`, `font-semibold`, `tracking-tighter`, `uppercase` |
| **GridBackground** | CSS Pattern | `32px` radial dots, `opacity-5` |
| **CarbonButton** | Carbon Blue 60 | No border-radius, `h-14`, `px-10`, hover: `Blue 70` |
| **StatusBadge** | Mono | `bg-red-900/20`, `text-red-500`, `text-[10px]`, `font-mono` |
| **DataGrid** | 4-Column | Bordered boxes, `p-12`, `border-[#393939]` |
| **SectionDivider** | Carbon Gray 80 | `h-px`, `w-full`, absolute positioning |

---

*Drafted by Brand OS Design Engineering - February 2026*
