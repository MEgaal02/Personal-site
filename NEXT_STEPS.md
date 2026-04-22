# Egaal Software Solutions — Website Refactor: Next Steps

**Reference site:** iostudios.co.uk
**Our domain:** builtbyegaal.com
**Brand colours:** Black (#0a0a0c) & Gold (#e8c547)
**Approach:** Sequential build — each phase requires sign-off before proceeding

---

## 1. Refactor Philosophy

We are **not** redesigning the site from scratch. The existing page structure, dropdown navigation, and content remain intact. What we are doing is elevating the site from a functional static site to a **premium, interactive, animation-rich experience** that rivals established agencies like ioSTUDIOS — while maintaining our distinctive black and gold identity.

### What stays the same
- All existing pages (18 pages)
- Mega dropdown navigation structure (Solutions, Industries, Company, Projects, Contact)
- Dark/gold colour theme
- Netlify hosting with Netlify Forms
- Team members and project case studies
- All solution and industry page content

### What changes
- Visual quality, animations, and interactivity across every page
- Two new pages added
- Navigation gets one new standalone button
- Every page gets polished with scroll-triggered animations, parallax, and micro-interactions
- Mobile experience fully refined

---

## 2. New Pages to Add

### 2.1 Process Page (under Company dropdown)

**Nav location:** Company → Our Process
**URL:** `process.html`
**Purpose:** Show our development methodology in a visually engaging, interactive format

**Content structure — three phases:**

#### Phase 1: Discovery
- Initial consultation and stakeholder interviews
- Understanding the client's existing workflows, pain points, and goals
- Competitive analysis and technical feasibility assessment
- Requirements gathering and documentation
- Budget scoping and timeline estimation
- Deliverable: Discovery Report with project specification

#### Phase 2: Development
- Architecture design and technology selection
- UI/UX wireframing and prototyping (client approval before build)
- Iterative agile development in 2-week sprints
- **USP: Remote Docker Installation** — during development, we deploy containerised prototypes directly to the client's environment via remote Docker installation. Clients receive live, working prototypes they can interact with at any point during development. This gives full transparency into progress — no waiting until launch day to see the product. Clients can request a prototype push at any time.
- Continuous testing (unit, integration, UAT)
- Security audit by our in-house cyber security team (Khaalid Egaal)
- Staging environment for client review before production

#### Phase 3: Ongoing
- Production deployment (AWS, Docker, CI/CD pipeline)
- Post-launch monitoring and bug fixes (30-day warranty)
- Optional SLA support packages for ongoing maintenance
- Performance optimisation and scaling as the client grows
- Feature iterations and roadmap planning
- Regular health checks and security patching

**Design approach:** Interactive timeline/stepper that the user clicks through, with animated transitions between phases. Each phase expands to show detailed sub-steps. Consider a vertical scroll-driven timeline with progress indicator.

**Key differentiator to highlight:** The Docker prototype delivery system. This should be the centrepiece of the page — a visual showing how a prototype gets pushed from our dev environment to the client's machine, with a "Request a prototype" CTA.

---

### 2.2 AI Agency Page (standalone nav button)

**Nav location:** Standalone button in nav bar (gold accent, stands out from other links)
**Button style:** Pill-shaped gold button with subtle glow animation, text: "AI Agency"
**URL:** `ai-agency.html`
**Status:** Coming soon landing page (platform will be built later)

**Content:**
- Bold hero section: "AI Academy — Coming Soon"
- Subheading: "State-of-the-art AI courses for software engineers and UI/UX designers"
- Brief description of what the platform will offer:
  - Hands-on AI courses tailored for developers (not generic AI overviews)
  - Practical agentic AI integration skills
  - UI/UX design for AI-powered interfaces
  - Real project-based curriculum
- Email signup form (Netlify Forms) for early access / waitlist
- Animated visual element (could be a pulsing AI brain, neural network animation, or code-to-AI transformation)
- "Notify me when it launches" CTA

**Design approach:** This page should feel premium and aspirational. Dark background with gold and a secondary accent (perhaps a subtle purple or cyan glow for the "AI" feel). Minimal content but maximum visual impact.

---

## 3. Navigation Updates

### Current nav structure (unchanged):
```
Home | Solutions ▼ | Industries ▼ | Company ▼ | Projects | Contact
```

### Updated nav:
```
Home | Solutions ▼ | Industries ▼ | Company ▼ | Projects | Contact | [AI Agency ✦]
```

### Company dropdown — add Process:
```
Company ▼
├── Our Team       (team.html)
├── Join Our Team  (join.html)
└── Our Process    (process.html)  ← NEW
```

### AI Agency nav button:
- Not inside any dropdown — standalone button on the right side of the nav
- Styled differently from other nav links: gold background pill with subtle glow
- On mobile: appears at the top of the slide-out panel with gold accent styling
- Links to: `ai-agency.html`

---

## 4. Animation & Interaction Upgrade Plan

Reference: iostudios.co.uk uses smooth scroll reveals, hover effects, parallax sections, and clean transitions. We will match and exceed this quality while keeping our black/gold identity.

### 4.1 Global Animations (apply to all pages)

| Animation | Description | Implementation |
|-----------|-------------|----------------|
| Scroll reveal | Elements fade up and slide in as they enter viewport | IntersectionObserver with staggered delays |
| Parallax sections | Background elements move at different scroll speeds | CSS `transform: translateY()` on scroll |
| Counter animation | Stats count up from 0 when they enter viewport | JS counter with easing function |
| Text split reveal | Headings animate letter-by-letter or word-by-word | CSS animation with `clip-path` or span wrapping |
| Smooth page transitions | Fade between pages | CSS opacity transition on page load |
| Cursor glow effect | Subtle gold glow follows cursor on desktop | JS mousemove + radial gradient |
| Nav blur on scroll | Navigation gains frosted glass effect as user scrolls | CSS `backdrop-filter: blur()` — already implemented, refine |
| Card hover lift | Cards lift with shadow and border glow on hover | CSS transform + box-shadow — already implemented, enhance |
| Magnetic buttons | CTA buttons subtly pull toward cursor on hover | JS mousemove within button bounds |
| Loading animation | Brief gold logo animation on first page load | CSS keyframes, only on index.html |

### 4.2 Page-Specific Interactions

| Page | Interaction |
|------|-------------|
| Home | Hero text types in letter by letter; terminal animation already exists but needs polish; project cards have tilt effect on hover |
| Solution pages | Feature cards stagger in from alternating sides; process steps connect with animated line that draws as user scrolls |
| Projects | Case study cards have depth parallax on scroll; tech stack pills pop in sequentially |
| Process | Interactive 3-phase stepper with animated transitions; Docker prototype delivery visualisation |
| Team | Cards flip or expand on click to reveal bio; photo has subtle zoom on hover |
| Contact | Form fields highlight with gold underline animation on focus; submit button has loading state |
| AI Agency | Neural network or particle animation in background; email input has typewriter placeholder |

---

## 5. Sequential Build Plan

Each phase must be approved before proceeding to the next.

### Phase 1: Foundation & Polish
**Scope:** Fix all bugs from audit, upgrade CSS animations, refine mobile experience
**Files changed:** `style.css`, `main.js`, all HTML files (nav consistency fix)
**Deliverables:**
- [ ] Fix missing `nageye-thumb.jpg`
- [ ] Fix `case-video` JS handler for projects page
- [ ] Fix mobile dropdown reliably across all devices
- [ ] Add correct nav active states to all pages
- [ ] Convert all files to Unix line endings
- [ ] Add meta descriptions and OG tags to all pages
- [ ] Add `robots.txt`, `sitemap.xml`, custom `404.html`
- [ ] Upgrade scroll reveal animations (staggered, directional)
- [ ] Add counter animation to stats sections
- [ ] Polish all hover effects site-wide
- [ ] Add cursor glow effect (desktop only)

**Sign-off required before Phase 2**

---

### Phase 2: Process Page
**Scope:** Build the Our Process page with interactive timeline
**Files added:** `process.html`
**Files changed:** All HTML files (add Process to Company dropdown + footer)
**Deliverables:**
- [ ] Design approval for Process page layout
- [ ] Interactive 3-phase timeline/stepper
- [ ] Docker prototype delivery USP section with visual
- [ ] Animated scroll-driven progress indicator
- [ ] Mobile responsive version
- [ ] Connected to existing nav and footer

**Sign-off required before Phase 3**

---

### Phase 3: AI Agency Page + Nav Button
**Scope:** Build the coming-soon AI Agency page and add nav button
**Files added:** `ai-agency.html`
**Files changed:** All HTML files (add AI Agency button to nav), `style.css` (button styles)
**Deliverables:**
- [ ] Design approval for AI Agency page
- [ ] Gold pill button in nav bar with glow animation
- [ ] Coming soon hero with animated background
- [ ] Email waitlist form (Netlify Forms)
- [ ] Mobile responsive version

**Sign-off required before Phase 4**

---

### Phase 4: Home Page Redesign
**Scope:** Elevate the home page to agency-grade quality
**Files changed:** `index.html`, `style.css`, `main.js`
**Deliverables:**
- [ ] Design approval for new home page sections
- [ ] Hero animation upgrade (text split reveal, parallax background)
- [ ] Animated solutions preview section
- [ ] Project showcase with hover effects and depth
- [ ] Client trust section (if testimonials available)
- [ ] Smooth scroll-driven narrative from hero to CTA
- [ ] Performance optimisation (lazy loading, compressed assets)

**Sign-off required before Phase 5**

---

### Phase 5: Solution Pages Upgrade
**Scope:** Differentiate and polish all 10 solution pages
**Files changed:** All solution HTML files, `style.css`
**Deliverables:**
- [ ] Design approval for upgraded solution layout
- [ ] Each solution page gets a unique hero visual/icon
- [ ] Feature sections with alternating layouts (not all identical grids)
- [ ] Process steps connected with animated SVG line
- [ ] Tech stack section with animated pills
- [ ] Contextual CTAs linking to relevant case studies

**Sign-off required before Phase 6**

---

### Phase 6: Project & Industry Pages
**Scope:** Upgrade projects and industry pages with richer case studies
**Files changed:** `projects.html`, `education.html`, `housing.html`, `style.css`
**Deliverables:**
- [ ] Design approval for case study layout
- [ ] Before/after visual for Nageye (6 tools → 1 platform)
- [ ] Interactive tech stack diagram
- [ ] Metric highlights (if available — load times, user count, etc.)
- [ ] HMO CRM page updated with progress/teaser content

**Sign-off required before Phase 7**

---

### Phase 7: Company & Contact Pages
**Scope:** Polish team, join, and contact pages
**Files changed:** `team.html`, `join.html`, `contact.html`, `thank-you.html`
**Deliverables:**
- [ ] Team cards with hover expand/flip animation
- [ ] Join page with better form UX and role descriptions
- [ ] Contact page with animated form interactions
- [ ] Thank-you page with nav and next steps
- [ ] Link to Process page from relevant sections

---

### Phase 8: Performance & SEO
**Scope:** Final optimisation pass
**Deliverables:**
- [ ] Move video to external CDN (S3/CloudFront)
- [ ] Compress all images (WebP format)
- [ ] Add structured data (JSON-LD) for organisation
- [ ] Google Analytics / Plausible analytics setup
- [ ] Lighthouse audit — target 90+ on all metrics
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Cross-device testing (iPhone, Android, iPad, desktop)

---

## 6. USP: Docker Prototype Delivery — How It Works

This is our key differentiator and should be prominently featured on the Process page, home page, and potentially a standalone section.

### The concept:
During development, instead of just showing screenshots or staging URLs, we install Docker on the client's machine (remote setup via SSH/screen share) and push fully containerised, working prototypes directly to them. The client runs the actual application locally — identical to what will go to production.

### Why this matters to clients:
- **Full transparency** — see exactly what's being built, not mockups
- **Test with real data** — import their own data and test workflows
- **On-demand** — request a prototype push at any milestone
- **No surprises at launch** — they've been using the software throughout development
- **Offline access** — prototype runs locally, no internet dependency

### Visual for the website:
An animated diagram showing:
```
Egaal Dev Environment → Docker Image → Push → Client's Machine → Live Prototype
```
With a "Request a Prototype" button that links to the contact form.

---

## 7. Design Language for Refactor

### Colours (unchanged, refined usage)
- **Primary black:** #0a0a0c (backgrounds)
- **Gold accent:** #e8c547 (CTAs, highlights, borders)
- **Gold hover:** #f0d060 (lighter gold for hover states)
- **Gold glow:** rgba(232, 197, 71, 0.04-0.15) (ambient glows)
- **Text primary:** #e8e6e1
- **Text secondary:** #8a8a8d
- **Text muted:** #555558
- **Card backgrounds:** #141418
- **Elevated surfaces:** #0f0f12
- **Success green:** #4ade80 (live status badges)

### Typography (unchanged)
- Display: Syne (headings)
- Body: Outfit (paragraphs)
- Mono: JetBrains Mono (labels, code, tech tags)

### Animation principles
- **Subtle over dramatic** — animations should feel natural, not jarring
- **Purpose-driven** — every animation communicates something (attention, hierarchy, state change)
- **Performance-first** — use `transform` and `opacity` only (GPU-accelerated)
- **Respect reduced motion** — wrap in `@media (prefers-reduced-motion: no-preference)`
- **Consistent easing** — use `cubic-bezier(0.22, 1, 0.36, 1)` for reveals, `ease-out` for hovers

### Inspiration from iostudios.co.uk
- Clean sectioned layout with generous whitespace
- Smooth scroll-triggered reveals
- Professional but approachable tone
- Client logos / trust signals section
- Process page as a narrative journey, not just steps
- Case studies with visual impact

### Where we diverge from iostudios.co.uk
- **Dark theme** — iostudios uses white/light; we stay black and gold
- **More interactive** — iostudios is clean but static; we add interactive elements
- **Developer-oriented aesthetic** — terminal animations, code snippets, monospace accents
- **Bolder typography** — Syne gives us a more distinctive heading presence
- **Docker USP** — no agency we've found offers containerised prototype delivery

---

## 8. Technical Considerations

### Stay on Netlify (no framework migration yet)
The site remains static HTML/CSS/JS deployed on Netlify. No build step, no static site generator. The refactor improves quality within this constraint. A future migration to Astro or 11ty could be considered after the refactor is complete and the AI Agency platform is built.

### File management
- Navigation and footer are still duplicated across all pages
- Any nav change (adding Process, AI Agency button) requires updating every HTML file
- This is manageable for now but should be noted for the future

### Asset hosting
- Team photos stay in repo (small files)
- `nageye-demo.mp4` (13 MB) should ideally move to S3/CloudFront but can stay for now
- Any new videos or large assets should be hosted externally

### Forms
- Contact form and Application form continue using Netlify Forms
- AI Agency waitlist form will also use Netlify Forms
- All forms redirect to `thank-you.html`

---

## 9. Summary of All Pages After Refactor

| # | Page | URL | Nav Location | Status |
|---|------|-----|-------------|--------|
| 1 | Home | index.html | Home | Existing — upgrade |
| 2 | CRM Development | crm-development.html | Solutions → | Existing — polish |
| 3 | Inventory Management | inventory-management.html | Solutions → | Existing — polish |
| 4 | Financial Dashboards | financial-dashboards.html | Solutions → | Existing — polish |
| 5 | POS Systems | pos-systems.html | Solutions → | Existing — polish |
| 6 | Maintenance Logs | maintenance-logs.html | Solutions → | Existing — polish |
| 7 | Backend API | backend-api.html | Solutions → | Existing — polish |
| 8 | iOS / Android Apps | mobile-apps.html | Solutions → | Existing — polish |
| 9 | UI/UX Design | ui-ux-design.html | Solutions → | Existing — polish |
| 10 | Bespoke Full Stack Apps | bespoke-apps.html | Solutions → | Existing — polish |
| 11 | AI Agentic Integration | ai-integration.html | Solutions → | Existing — polish |
| 12 | Education | education.html | Industries → | Existing — polish |
| 13 | Housing (HMO) | housing.html | Industries → | Existing — polish |
| 14 | Our Team | team.html | Company → | Existing — polish |
| 15 | Join Our Team | join.html | Company → | Existing — polish |
| 16 | Our Process | process.html | Company → | **NEW** |
| 17 | AI Agency | ai-agency.html | Standalone nav button | **NEW** |
| 18 | Projects | projects.html | Projects | Existing — upgrade |
| 19 | Contact | contact.html | Contact | Existing — polish |
| 20 | Thank You | thank-you.html | Form redirect | Existing — add nav |

**Total after refactor: 20 pages**

---

*This document serves as the master plan for the Egaal Software Solutions website refactor. Every design decision and build phase requires explicit approval before implementation. The black and gold theme is non-negotiable — it is the brand identity.*
