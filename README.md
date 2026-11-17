# Carribu — School Transport, Reimagined

School transport platform connecting parents, drivers and schools through trip visibility, student transport records and communication.

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool with hot module replacement (HMR)
- **ESLint** — Code linting

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ahmedsebit/carribu.git
cd carribu
```

### 2. Configure environment variables

Copy the example env file and update values as needed:

```bash
cp .env.example .env
```

| Variable         | Description                                   | Default                        |
| ---------------- | --------------------------------------------- | ------------------------------ |
| `VITE_API_URL`   | Backend API base URL (for APK download links)  | `http://localhost:5000/api`    |
| `VITE_ADMIN_URL` | Admin portal URL                               | `https://admin.carribu.app`   |

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173). Changes to source files are reflected instantly via HMR.

> **Note:** The Parent App and Driver App download links in the footer are fetched from the backend at `GET /api/app-versions/latest/parent` and `GET /api/app-versions/latest/driver`. The Admin Portal link is read from `VITE_ADMIN_URL`. If the backend is unavailable, all links gracefully fall back to `#` placeholders.

## Available Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the Vite dev server with HMR               |
| `npm run build`     | Build the app for production (output in `dist/`)  |
| `npm run preview`   | Preview the production build locally              |
| `npm run lint`      | Run ESLint across the project                     |
| `npm test`          | Check demo-draft validation and email encoding     |

## Project Structure

```
carribu/
├── index.html                  # HTML entry point (fonts, meta tags)
├── vite.config.js              # Vite configuration
├── package.json
├── eslint.config.js
├── public/                     # Static assets served as-is
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component
    ├── index.css               # Global styles (CSS variables, layout)
    ├── hooks/
    │   └── useScrollReveal.js  # IntersectionObserver scroll animation hook
    └── components/
        ├── Navbar.jsx          # Fixed navbar with scroll effect & mobile menu
        ├── Hero.jsx            # Hero section with phone mockups
        ├── Features.jsx        # Tabbed feature showcase (Parents/Drivers/Schools)
        ├── AppPreview.jsx      # Labeled illustrative mobile / actual admin previews
        ├── SchoolDay.jsx       # Interactive example morning and role perspectives
        ├── HowItWorks.jsx      # Step-by-step onboarding flow
        ├── Safety.jsx          # Safety & trust feature grid
        ├── FAQ.jsx             # Searchable native-disclosure questions
        ├── CTA.jsx             # Validated email-draft enquiry form (no submission)
        ├── LandingDetails.css  # Story, previews, trust, FAQ and enquiry styling
        ├── Footer.jsx          # Footer with links & social icons
        ├── KenteBorder.jsx     # Decorative Kente-inspired divider
        ├── ScrollJourney.jsx   # Scroll-synchronized bus, road and section stops
        ├── ScrollJourney.css   # Responsive journey illustration and navigation
        └── Reveal.jsx          # Scroll-reveal animation wrapper
```

## Illustrated Bus Journey

Scrolling or using section links takes an illustrated bus along a winding road
from Home through the School Day, Apps & Features, Getting Started, Trust &
Support and Questions to the School Gates (Demo Enquiry). The floating journey
controls navigate between all seven stops and explain each stop. Houses,
pickup signage, trees, a crossing and school gates accompany the road.
This is a website illustration, not live vehicle tracking.

The route adapts to viewport and section-size changes, including feature tabs
and font loading. Mobile layouts keep the road clear of the content.
With reduced motion enabled, the moving bus is hidden and section navigation
scrolls immediately; the road, stops and navigation remain available.

## Product Previews and Enquiries

The selectable school-day story uses example times and names. Parent and driver
previews (including the hero mockups) are explicitly labeled illustrations, not
actual screenshots. `public/images/school-admin-preview.png` shows the actual
local admin dashboard rendered with synthetic Example Academy API fixtures.
No real account, student data or production API response was used in the capture.
The image can be opened full-size from the school feature tab.

Onboarding covers preparation, roster validation, a controlled pilot and rollout.
Trust and FAQ content describe location/notification limitations and direct
schools to agree data-handling and support arrangements; no certification,
customer endorsement, fixed pricing or response-time promise is implied.

The demo form validates required school/contact details, a positive whole-number
fleet size and any preferred date/time. It prepares a URL-encoded draft addressed
to `hello@carribu.app`, never submits to a backend, and does not persist its data.
Users must open their email application and send the request themselves, or use
the copy action / selectable-text fallback. Editing the form invalidates the old
draft. A requested time is not a confirmed booking.

## Building for Production

```bash
npm run build
```

This outputs optimized files to the `dist/` directory. To preview the production build locally:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

ESLint is configured with React-specific rules including `react-hooks` and `react-refresh` plugins.

## License

© 2026 Carribu. All rights reserved.
