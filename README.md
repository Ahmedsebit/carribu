# Carribu — School Transport, Reimagined

Smart school transport platform that connects parents, drivers, and schools — so every ride is tracked, every child accounted for.

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
        ├── HowItWorks.jsx      # Step-by-step onboarding flow
        ├── Safety.jsx          # Safety & trust feature grid
        ├── CTA.jsx             # Call-to-action section
        ├── Footer.jsx          # Footer with links & social icons
        ├── KenteBorder.jsx     # Decorative Kente-inspired divider
        └── Reveal.jsx          # Scroll-reveal animation wrapper
```

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
