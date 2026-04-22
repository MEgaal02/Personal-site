# Egaal Software Solutions — Website Audit & Technical Documentation

**Domain:** builtbyegaal.com
**Repository:** github.com/MEgaal02/Personal-site
**Hosting:** Netlify (auto-deploys from GitHub main branch)
**Last Audited:** April 2026

---

## 1. Executive Summary

The Egaal Software Solutions website is a static, multi-page marketing site built with vanilla HTML, CSS, and JavaScript. It is hosted on Netlify with automatic deployments triggered by pushes to the `main` branch of the GitHub repository. The site uses Netlify Forms for contact and job application submissions, with a custom thank-you page redirect.

The site is currently in a **functional but unpolished state** — the core structure is in place but there are several technical issues, missing assets, inconsistent code quality, and no SEO metadata. A refactor is recommended before the site can be considered production-grade.

---

## 2. Hosting & Deployment

### Platform: Netlify
- **Deploy method:** Auto-deploy from GitHub (`main` branch)
- **Build command:** None (static site — no build step)
- **Publish directory:** Root (`/`)
- **Custom domain:** builtbyegaal.com (configured via Namecheap DNS)
- **SSL:** Managed by Netlify (automatic Let's Encrypt)

### DNS Configuration (Namecheap)
- A record pointing to Netlify
- MX records configured for Google Workspace email
- DKIM TXT record set up for email authentication
- Business email: egaalsoftwaresolutions@builtbyegaal.com

### Netlify Forms
Two forms are configured using Netlify's built-in form handling:

| Form Name | Page | Fields | Redirect |
|-----------|------|--------|----------|
| `contact` | contact.html | name, email, company, message | /thank-you.html |
| `application` | join.html | name, email, phone, location, role (select), portfolio URL, about | /thank-you.html |

Both forms use:
- `data-netlify="true"` attribute for Netlify detection
- `data-netlify-honeypot="bot-field"` for spam protection
- Hidden `form-name` input for Netlify's form identification
- POST method with action pointing to `/thank-you.html`

**Note:** Netlify detects forms at deploy time by scanning HTML for `data-netlify="true"`. Form submissions appear in the Netlify dashboard under Forms.

---

## 3. Repository Structure

```
Personal-site/
├── index.html                  # Home page (18.7 KB)
├── crm-development.html        # Solution page (13.6 KB)
├── inventory-management.html   # Solution page (13.0 KB)
├── financial-dashboards.html   # Solution page (13.2 KB)
├── pos-systems.html            # Solution page (13.0 KB)
├── maintenance-logs.html       # Solution page (13.0 KB)
├── backend-api.html            # Solution page (13.2 KB)
├── mobile-apps.html            # Solution page (13.0 KB)
├── ui-ux-design.html           # Solution page (12.8 KB)
├── bespoke-apps.html           # Solution page (13.6 KB)
├── ai-integration.html         # Solution page (13.0 KB)
├── education.html              # Industry page (11.6 KB)
├── housing.html                # Industry page (10.5 KB)
├── projects.html               # Case studies page (17.0 KB)
├── team.html                   # Team page (12.7 KB)
├── join.html                   # Job application page (11.0 KB)
├── contact.html                # Contact page (12.8 KB)
├── thank-you.html              # Form submission confirmation (2.3 KB)
├── style.css                   # Global stylesheet (24.0 KB)
├── main.js                     # Global JavaScript (6.2 KB)
├── favicon.svg                 # SVG favicon (265 bytes)
├── mahamood.jpg                # Team photo - CEO (71 KB)
├── leban.jpg                   # Team photo - COO (95 KB)
├── khaalid.jpg                 # Team photo - Security (77 KB)
├── nageye-demo.mp4             # Project demo video (13 MB)
└── .git/                       # Git history
```

**Total files:** 25 (excluding .git)
**Total size:** ~13.5 MB (dominated by nageye-demo.mp4 at 13 MB)

---

## 4. Site Architecture

### 4.1 Navigation Structure

The site uses a mega dropdown navigation with 6 top-level items:

```
Home
Solutions (dropdown - 10 subpages)
├── Development
│   ├── CRM Development
│   ├── Inventory Management
│   ├── Financial Dashboards
│   ├── POS Systems
│   └── Maintenance Log Systems
└── Engineering
    ├── Backend API
    ├── iOS / Android Apps
    ├── UI/UX Design
    ├── Bespoke Full Stack Apps
    └── AI Agentic Integration

Industries (dropdown - 2 subpages)
├── Education
└── Housing (HMO)

Company (dropdown - 2 subpages)
├── Our Team
└── Join Our Team

Projects
Contact
```

The navigation is duplicated in every HTML file (no templating system). Any nav change must be made in all 17 pages manually.

### 4.2 Page Types

| Type | Pages | Template Pattern |
|------|-------|-----------------|
| Home | 1 | Hero + stats + solutions preview + featured projects + CTA |
| Solution | 10 | Page hero + features grid + process steps + use cases + tech stack + CTA |
| Industry | 2 | Page hero + project showcase/detail + features + CTA |
| Company | 2 | Team page (cards) / Join page (application form) |
| Projects | 1 | Case study format with problem/plan/resolution |
| Contact | 1 | Contact info + Netlify form |
| Thank You | 1 | Standalone confirmation page |

### 4.3 Design System

**Theme:** Dark background with gold accent

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#0a0a0c` | Page background |
| `--bg-elevated` | `#0f0f12` | Section backgrounds |
| `--bg-card` | `#141418` | Card backgrounds |
| `--accent` | `#e8c547` | Gold accent (buttons, labels, highlights) |
| `--text` | `#e8e6e1` | Primary text |
| `--text-dim` | `#8a8a8d` | Secondary text |
| `--text-muted` | `#555558` | Tertiary text |
| `--border` | `rgba(255,255,255,0.06)` | Borders |

**Fonts (Google Fonts):**
- Display: Syne (headings, 400/600/700/800)
- Body: Outfit (text, 300/400/500/600)
- Mono: JetBrains Mono (labels, code, 300/400/500)

**Breakpoints:**
- Desktop: > 1024px
- Tablet: 900px - 1024px
- Mobile: < 900px
- Small mobile: < 600px

---

## 5. JavaScript Functionality

All JavaScript is in a single `main.js` file (6.2 KB). It handles:

| Feature | Implementation | Status |
|---------|---------------|--------|
| Nav scroll effect | Adds `.scrolled` class on scroll > 50px | ✅ Working |
| Hamburger menu | Toggles `.open` on nav, `.active` on hamburger | ✅ Working |
| Mobile dropdown toggles | Adds `.mobile-open` to mega-dropdowns on tap | ⚠️ Has issues |
| Close nav on sublink click | Calls `toggleMenu()` when mega-link clicked on mobile | ✅ Working |
| Scroll reveal animations | IntersectionObserver adds `.visible` to `.reveal` elements | ✅ Working |
| Video hover autoplay | Plays muted video on `mouseenter`, pauses on `mouseleave` | ✅ Desktop only |
| Video click modal | Opens fullscreen modal with video controls | ✅ Working |
| Smooth scroll | Scrolls to anchor targets | ✅ Working |

**Known JS limitation:** The `case-video` class used on the projects.html page is NOT handled by main.js. The JS only targets `.project-preview` and `.project-detail-video` selectors. Videos on the projects page case study cards will not have hover-to-play or click-to-modal functionality.

---

## 6. Team Members

| Name | Role | Photo | Links |
|------|------|-------|-------|
| Mahamood Egaal | CEO & Lead Developer | mahamood.jpg (71 KB) | GitHub, LinkedIn, Email |
| Leban Egaal | COO | leban.jpg (95 KB) | Facebook, Email |
| Khaalid Egaal | Cyber Security Expert | khaalid.jpg (77 KB) | LinkedIn, Email |
| Osman Abudo | Frontend Developer & Designer | No photo (initials "OA") | None |

---

## 7. Projects / Case Studies

### Nageye School of Languages
- **Status:** Live
- **URL:** nageyeschooloflanguages.com
- **Demo video:** nageye-demo.mp4 (13 MB)
- **Thumbnail:** nageye-thumb.jpg (**MISSING FROM REPO**)
- **Tech stack listed:** Django 6.0, PostgreSQL (AWS RDS), Gunicorn, Nginx, Docker, AWS EC2, AWS S3, CloudFront CDN, Redis, Jitsi Meet (Self-Hosted), Stripe API, Let's Encrypt SSL, JavaScript, HTML/CSS
- **Case study:** Problem/Plan/Resolution format on projects.html
- **Featured on:** index.html, projects.html, education.html

### HMO Property CRM
- **Status:** In Development
- **Demo video:** None
- **Thumbnail:** None
- **Tech stack listed:** Django, React, PostgreSQL, REST API, Docker, AWS
- **Featured on:** index.html, projects.html, housing.html

---

## 8. Known Issues & Bugs

### Critical

| # | Issue | Impact | Location |
|---|-------|--------|----------|
| 1 | **nageye-thumb.jpg missing from repo** | Video poster image shows nothing — blank black rectangle before video plays | index.html, projects.html, education.html |
| 2 | **`case-video` class not handled by main.js** | Videos on projects.html case study won't play on hover or open modal on click | projects.html |
| 3 | **Mobile dropdown still has display issues** | Mega dropdowns may not render properly on some mobile devices due to CSS specificity conflicts between desktop hover states and mobile toggle states | All pages |

### Moderate

| # | Issue | Impact | Location |
|---|-------|--------|----------|
| 4 | **No active nav state for most pages** | Solutions, Industries, and Company subpages show the parent dropdown link as `class="active"` pointing to `#` — only Home, Projects, and Contact have correct active states | 14 pages |
| 5 | **Windows line endings (CRLF) in all files** | `\r\n` line endings throughout — not a rendering issue but causes noisy git diffs and inconsistency | All 20 source files |
| 6 | **No meta descriptions on any page** | Zero SEO metadata — search engines have no description to display in results | All 18 HTML pages |
| 7 | **No Open Graph / social sharing tags** | Links shared on LinkedIn, Twitter, WhatsApp show no preview image or description | All pages |
| 8 | **13 MB video file in git repo** | Bloats repository size and slows clone/deploy. Should use Git LFS or external hosting | nageye-demo.mp4 |
| 9 | **Navigation duplicated in every file** | Any nav change requires editing 17 files manually — high risk of inconsistency | All pages |

### Minor

| # | Issue | Impact | Location |
|---|-------|--------|----------|
| 10 | **No 404 page** | Users hitting bad URLs see Netlify's default 404 | Site-wide |
| 11 | **No robots.txt or sitemap.xml** | Search engines can't efficiently crawl the site | Site-wide |
| 12 | **No favicon.ico fallback** | Only SVG favicon — older browsers may not display it | Site-wide |
| 13 | **Solution pages are template-identical** | All 10 solution pages follow exact same layout — feels repetitive | Solution pages |
| 14 | **No analytics tracking** | No Google Analytics, Plausible, or any analytics — no visibility into traffic | Site-wide |
| 15 | **Thank-you page has no nav** | Users land on a dead-end page with only a "Back to Home" link | thank-you.html |

---

## 9. CSS Architecture

The stylesheet (`style.css`, 24 KB) is a single monolithic file with 108 CSS variable references. It is organized into clearly labelled sections:

```
EGAAL SOFTWARE SOLUTIONS v2 (variables + reset)
TYPOGRAPHY
NAVIGATION
MEGA DROPDOWN
BUTTONS
PAGE HERO
STATS
CARDS
PROJECT CARDS
PROJECT DETAIL
VIDEO MODAL
SOLUTION PAGE
CTA BANNER
TEAM
FORMS
FOOTER
ANIMATIONS
HAMBURGER
RESPONSIVE (3 breakpoints: 1024px, 900px, 600px)
```

**Notable patterns:**
- Uses CSS custom properties throughout for theming
- Animations use `cubic-bezier(0.22, 1, 0.36, 1)` for scroll reveals
- Hover effects use `translateY(-3px)` for subtle lift
- Mobile breakpoint at 900px converts nav to slide-out panel

---

## 10. Deployment Workflow

```
Developer makes changes locally
        ↓
Push to GitHub (main branch)
        ↓
Netlify webhook triggers
        ↓
Netlify pulls latest from main
        ↓
No build step (static files)
        ↓
Files deployed to Netlify CDN
        ↓
Live at builtbyegaal.com
```

**Current deployment method:** Files are uploaded manually via the GitHub web interface (not git push from terminal). This is evident from the git log showing "Add files via upload" commit messages.

---

## 11. Recommendations for Refactor

### Priority 1 — Fix broken functionality
1. Add missing `nageye-thumb.jpg` to repo
2. Fix `main.js` to handle `.case-video` selector for projects page
3. Fix mobile dropdown CSS/JS to work reliably on all devices
4. Add correct `class="active"` states to all nav links per page

### Priority 2 — SEO & discoverability
5. Add `<meta name="description">` to every page
6. Add Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing
7. Create `robots.txt` and `sitemap.xml`
8. Add a custom 404.html page

### Priority 3 — Performance & code quality
9. Move `nageye-demo.mp4` to external hosting (S3/CloudFront) or use Git LFS — 13 MB in a git repo is not sustainable
10. Convert all files to Unix line endings (LF)
11. Add Google Analytics or Plausible for traffic tracking
12. Consider a static site generator (11ty, Astro) to eliminate nav/footer duplication across 17 files

### Priority 4 — Content & polish
13. Add a photo for Osman Abudo
14. Differentiate solution page layouts to reduce repetitiveness
15. Add real testimonials or client logos
16. Add a proper About page (currently no standalone about page)

---

## 12. File Dependency Map

```
index.html ──→ style.css
           ──→ main.js
           ──→ favicon.svg
           ──→ nageye-demo.mp4 (video)
           ──→ nageye-thumb.jpg (poster) ⚠️ MISSING
           ──→ Google Fonts (external CDN)

team.html  ──→ mahamood.jpg
           ──→ leban.jpg
           ──→ khaalid.jpg

contact.html ──→ Netlify Forms API (on submit)
join.html    ──→ Netlify Forms API (on submit)

All pages  ──→ style.css
           ──→ main.js
           ──→ favicon.svg
           ──→ Google Fonts
```

---

## 13. Legal & Business Info

- **Trading name:** Egaal Software Solutions
- **Registered company:** TaxGen AI Ltd
- **Location:** Birmingham, England
- **Email:** egaalsoftwaresolutions@builtbyegaal.com
- **GitHub:** github.com/MEgaal02
- **LinkedIn:** linkedin.com/in/mahmoodegaal
- **Footer text:** "© 2026 Egaal Software Solutions. All rights reserved. Trading name of TaxGen AI Ltd"

---

*Document generated from direct repository analysis. All findings are based on the codebase as of April 2026.*
