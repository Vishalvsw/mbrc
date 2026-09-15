# MBRC & Infrastructure Private Limited — Corporate Website

A premium corporate website for **MBRC & Infrastructure Private Limited**, a Class-I EPC contractor headquartered in Bhatambra, Bhalki, Bidar, Karnataka, India.

The site showcases the company's 52+ year heritage, executive leadership, captive infrastructure plants, heavy machinery fleet, and full-service portfolio across road construction, highway infrastructure, earthwork, concrete works, and material production.

---

## 🌐 Live Site

**Production:** [https://mbrc-website.vercel.app](https://mbrc-website.vercel.app)

> Replace with your actual Vercel URL once deployed.

---

## 🏢 About the Company

| Field | Details |
|---|---|
| **Legal Name** | MBRC & Infrastructure Private Limited |
| **CIN** | U45309KA2021PTC146469 |
| **Incorporated** | 13 April 2021 |
| **Founder (1972)** | Late Maqbool Ahmed |
| **Managing Director** | Riyaz Ahmed |
| **Headquarters** | 2-475/68, Bhatambra, Tq. Bhalki, Bidar, Karnataka – 585411 |
| **Registration** | Class-I EPC Contractor (PWD Karnataka) |
| **Contact** | +91 97310 49500 • inframbrc@gmail.com |

**Core Services:**
- Road Construction & Development
- Highway Infrastructure
- Earthwork & Site Development
- Concrete Works
- Retaining & Structural Works
- Asphalt & Bituminous Works
- Captive Material Production (Crusher, M-Sand, Batching, Hot-Mix)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **State Management** | React Context API |
| **Persistence** | Browser `localStorage` (CRM data) |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## 📁 Project Structure

```
mbrc-website-premium/
├── public/
│   └── photo/                    # Client photos (directors, plants, machinery)
├── src/
│   ├── components/
│   │   ├── pages/                # Top-level public pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── admin/                # Admin panel (CMS + CRM)
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminProjects.tsx
│   │   │   ├── AdminEnquiries.tsx
│   │   │   ├── AdminMedia.tsx
│   │   │   ├── AdminContentCMS.tsx
│   │   │   └── AdminLogin.tsx
│   │   ├── client/
│   │   │   └── ClientPortal.tsx  # Client requisition tracker
│   │   ├── Header.tsx
│   │   ├── TopStatusBar.tsx
│   │   ├── Hero.tsx
│   │   ├── LeadershipSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── MachinerySection.tsx
│   │   ├── InfrastructureSection.tsx
│   │   ├── QualitySafetySection.tsx
│   │   ├── ExecutionProcess.tsx
│   │   ├── OurStoryTimeline.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EnquiryForm.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── AppContext.tsx        # Global state + localStorage persistence
│   ├── data/
│   │   └── initialData.ts        # Master content dataset
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── App.tsx                   # Root component + routing
│   ├── main.tsx                  # React mounting point
│   └── index.css                 # Global Tailwind styles
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json                   # SPA rewrite config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mbrc-website.git
cd mbrc-website

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
```

Output goes to `dist/`. Preview with:

```bash
npm run preview
```

---

## 🔧 Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (if configured) |

---

## 📸 Photo Assets

All client photos live in `public/photo/`:

```
public/photo/
├── riyaz.png       # Managing Director
├── iliyas.png      # Director — Supply Chain
├── mushtaq.png     # Director — Public Affairs
├── khaleel.png     # Director — Plant Governance
├── ejaz.png        # Director — Field Quality
└── maqbool.png     # Founder (legacy)
```

### Adding or Replacing Photos

1. Drop the new photo into `public/photo/`
2. Reference it in `src/data/initialData.ts` as `/photo/filename.png`
3. **Important:** Paths must start with `/photo/` (not `public/photo/`)

### Recommended Specs

| Use | Size | Format |
|---|---|---|
| Director headshot | 800×800 | JPG/PNG |
| Project/plant photo | 1600×900 | JPG |
| Hero background | 1920×1080 | JPG |
| Target file size | < 300 KB | — |

---

## 🎯 Key Features

### Public Site
- **Home** — Hero banner, company overview, services preview, featured projects, why-choose-us, execution process
- **About** — 52-year heritage timeline, MBRC meaning, leadership, captive infrastructure, machinery, quality & safety
- **Services** — 7 core EPC services with process steps and technical specifications
- **Contact** — Address, phone, WhatsApp, email, Google Maps, enquiry form

### Admin Panel (`/admin`)
- **Dashboard** — KPIs, CRM pipeline snapshot, media strip
- **Projects** — Add/edit/publish/delete project portfolio
- **Enquiries** — Full CRM with status tracking, notes, CSV export
- **Media** — Categorize and manage photos/videos/documents
- **Content CMS** — Live edit taglines, statistics, contact info
- **Login** — Password gate

### Client Portal
- Requisition tracker
- Docket status lookup
- Milestone progress

---

## 💾 Data & Persistence

The app stores its CMS state in browser `localStorage`. The initial seed data lives in `src/data/initialData.ts`.

### Important: Clearing Cached Data

When you change `initialData.ts` and the browser still shows old data, it's reading from `localStorage`. To force a refresh, run this in the browser console:

```js
Object.keys(localStorage)
  .filter(k => k.startsWith('mbrc_'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## 🌍 Deployment to Vercel

### Auto-Deploy Setup

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. **Import** your GitHub repository
4. Vercel auto-detects Vite. Confirm:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**

### SPA Routing Fix

Ensure `vercel.json` exists in the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This makes `/about`, `/services`, etc. work when accessed directly.

### Auto-Deploy on Push

Every `git push` to the `main` branch triggers a new Vercel deployment (~30 seconds).

---

## 🔄 Update Workflow

```bash
# 1. Make your changes
# 2. Commit and push
git add .
git commit -m "Describe your change"
git push

# 3. Vercel auto-deploys
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Dark navy | `#0B111E` | Backgrounds, headers |
| Gold accent | `#D4AF37` | Highlights, CTAs, borders |
| Gold hover | `#E5B842` | Button hover state |
| Slate gray | `#64748b` | Body text, borders |
| Font display | Bold uppercase | Headings |
| Font mono | Code | Numeric data, specs |
| Card radius | `rounded-sm` | Industrial, sharp look |

---

## 🔐 Environment Variables

The project does **not** require any `.env` file for the current build. If you add backend/API integration later, create `.env.local` (which is gitignored).

---

## 🧪 Testing Checklist Before Deploy

- [ ] `npm run build` succeeds with no errors
- [ ] All pages load without console errors
- [ ] All `/photo/...` images render (no 404s)
- [ ] Mobile responsive at 375px, 768px, 1440px
- [ ] Admin login works
- [ ] Enquiry form submits
- [ ] No `node_modules/` or `dist/` committed

---

## 🐛 Troubleshooting

### Images show 404

- Verify file exists in `public/photo/`
- Verify path in `initialData.ts` starts with `/photo/` (no `public/` prefix)
- Restart dev server after adding new files to `public/`

### Old data still showing after edit

- Clear `localStorage` (see **Data & Persistence** section above)

### Direct route returns 404 on Vercel

- Add `vercel.json` with the rewrite rule (see **SPA Routing Fix**)

### Build fails on Vercel but works locally

- Check Node version — set `"engines": { "node": ">=18" }` in `package.json`
- Run `npm run build` locally to reproduce

---

## 📞 Contact

**MBRC & Infrastructure Private Limited**
- 📍 2-475/68, Bhatambra, Tq. Bhalki, Bidar, Karnataka – 585411, India
- 📞 +91 97310 49500
- ✉️ inframbrc@gmail.com
- 🌐 https://mbrc-gray.vercel.app/
  

---

## 📄 License

**Proprietary** — © 2025 MBRC & Infrastructure Private Limited. All rights reserved.

This codebase is confidential and intended solely for the use of MBRC & Infrastructure Private Limited.

---

## 👨‍💻 Development

Built with ❤️ for MBRC & Infrastructure Private Limited.
