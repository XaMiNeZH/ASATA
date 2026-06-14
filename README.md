<div align="center">
  <img src="apps/web/public/Association%20Logo.jpg" alt="ASATA association logo" width="150" />

  <h1>ASATA Digital Platform</h1>

  <p>
    <strong>Association Sportive Atlas Toubkal Asni</strong> is a sports association based in Asni,
    Al Haouz, Morocco. Founded on June 6, 2010 near Djebel Toubkal, ASATA develops youth sport
    through ski and mountain activities, football, athletics, events, training, and community programs.
  </p>

  <p>
    <a href="https://asata-website.vercel.app">Public Website</a>
    |
    <a href="https://asata-website.vercel.app/admin">Admin Panel</a>
    |
    <a href="https://asata-production.up.railway.app/health">Web API Health</a>
  </p>
</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Association Context](#association-context)
- [Product Surfaces](#product-surfaces)
- [Repository Structure](#repository-structure)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Applications](#applications)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [Deployment](#deployment)
- [Documentation and Assets](#documentation-and-assets)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Project Notes](#project-notes)

---

## Project Overview

This repository contains the full ASATA digital ecosystem:

- A public multilingual website for the association.
- A protected web admin panel for managing content and operational data.
- A web REST API for events, gallery photos, contact messages, donations, uploads, and admin authentication.
- A mobile app named **ASATA Connect** for members, coaches, and administrators.
- A dedicated mobile API for authentication, events, participations, announcements, notifications, profiles, and admin statistics.
- Technical reports, UML diagrams, mobile UI references, release checklists, and archived prototypes.

The project is organized as a multi-application repository. Each app owns its dependencies, scripts, and environment files.

---

## Association Context

ASATA exists to use sport as a structured social and educational path for the youth of Asni and the surrounding High Atlas region.

Key facts represented in the website content:

| Item | Details |
| --- | --- |
| Full name | Association Sportive Atlas Toubkal Asni |
| Acronym | A.S.A.T.A |
| Founded | June 6, 2010 |
| Location | Asni, Province of Al Haouz, Morocco |
| Region | High Atlas, about 50 km south of Marrakech |
| Altitude | Around 1,150 m |
| Contact email | `asata.club@gmail.com` |
| Official accreditation | May 2024, reference `2024/1111` |
| Registered logo | No. `218955`, Class 41 |

Sports sections:

- **Ski and mountain sports**: alpine skiing, hiking, climbing, trail and mountain activities.
- **Football**: youth training and regional competitions.
- **Athletics**: running, mountain trail, and athletics activities.

Federation affiliations shown in the product:

- `FRMSSM` - Federation Royale Marocaine de Ski et Sports de Montagne.
- `FRMF` - Federation Royale Marocaine de Football.
- `FRMA` - Federation Royale Marocaine d'Athletisme.

---

## Product Surfaces

| Surface | Path | Purpose |
| --- | --- | --- |
| Public website | `apps/web` | Association presentation, sport sections, team, gallery, events, contact, donations |
| Web admin panel | `apps/web/src/pages/admin` | Protected admin UI for operational management |
| Web API | `apps/api` | REST backend for the public website and web admin panel |
| Mobile app | `apps/mobile` | Expo React Native app for ASATA Connect |
| Mobile API | `apps/mobile-api` | Dedicated REST backend for mobile users, roles, events, participations, announcements, and notifications |
| Documentation | `docs` | Technical reports, UML, release notes, mobile UI kit references |
| Archived prototypes | `archive` | Older static web and mobile prototypes kept as reference |

---

## Repository Structure

```text
ASATA/
├── apps/
│   ├── web/                 # React + Vite public website and web admin panel
│   ├── api/                 # Express + Prisma API for website/admin features
│   ├── mobile/              # Expo React Native app: ASATA Connect
│   └── mobile-api/          # Express + Prisma API dedicated to the mobile app
├── docs/
│   ├── UML/                 # PlantUML sources and rendered diagrams
│   ├── mobile UI kit design (stitch)/
│   ├── mobile-eas-build.md
│   ├── mobile-final-technical-section.md
│   └── mobile-release-checklist.md
├── archive/                 # Historical prototypes and references
├── docker-compose.yml       # Local PostgreSQL service
├── MIGRATION_SUMMARY.md
├── POSTGRESQL_SETUP.md
├── RAPPORT_TECHNIQUE.md
└── README.md
```

Generated and local-only folders such as `node_modules`, `dist`, `.expo`, `.vercel`, logs, and build artifacts are not the source of truth for project behavior.

---

## Architecture

### Website and Web Admin

```text
Visitor / Admin
      |
      | HTTPS
      v
apps/web - React, TypeScript, Vite, TailwindCSS, Framer Motion
      |
      | REST JSON via VITE_API_URL
      v
apps/api - Express, TypeScript, Zod, JWT, Multer, Nodemailer
      |
      | Prisma
      v
PostgreSQL
```

### Mobile App

```text
Member / Coach / Administrator
      |
      | Expo app, HTTPS JSON, Bearer JWT
      v
apps/mobile - Expo, React Native, React Navigation, Zustand
      |
      | EXPO_PUBLIC_API_BASE_URL
      v
apps/mobile-api - Express, TypeScript, Zod, JWT, Prisma
      |
      | Prisma
      v
PostgreSQL
```

The web and mobile applications currently use separate API projects and separate Prisma schemas. This keeps the public website/admin workflows independent from the mobile membership workflows.

---

## Technology Stack

| Layer | Main Technologies |
| --- | --- |
| Public web | React 18, TypeScript, Vite 5, React Router 6, TailwindCSS 3, Framer Motion, i18next |
| Web API | Node.js, Express 4, TypeScript, Prisma 5, PostgreSQL, Zod, JWT, bcryptjs, Multer, Nodemailer |
| Mobile app | Expo 54, React Native 0.81, React 19, TypeScript, React Navigation, Zustand, AsyncStorage |
| Mobile API | Node.js, Express 5, TypeScript, Prisma 6, PostgreSQL, Zod 4, JWT, bcryptjs |
| Database | PostgreSQL with Prisma migrations |
| Deployment | Vercel for web, Railway-compatible APIs, Neon/Supabase-compatible PostgreSQL, Expo EAS for mobile builds |

---

## Local Development

### Prerequisites

- Node.js 22 is used by the mobile release workflow. Node 18+ is suitable for most local web/API development.
- npm.
- Docker and Docker Compose for local PostgreSQL.
- Expo tooling for mobile development.
- PostgreSQL connection strings for cloud database usage.

### 1. Start Local PostgreSQL

```bash
docker-compose up -d
```

The included service creates:

```text
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=asata_dev
PORT=5432
```

### 2. Run the Web API

```bash
cd apps/api
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Default local URL:

```text
http://localhost:3001
```

For the Docker database, use this in `apps/api/.env`:

```text
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/asata_dev
DATABASE_URL_UNPOOLED=postgresql://postgres:postgres@localhost:5432/asata_dev
```

### 3. Run the Public Website

```bash
cd apps/web
npm install
cp .env.example .env
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

### 4. Run the Mobile API

If the mobile backend should use a separate database, configure `apps/mobile-api/.env` with its own `DATABASE_URL`.

```bash
cd apps/mobile-api
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Default local URL:

```text
http://localhost:3001
```

Do not run `apps/api` and `apps/mobile-api` on the same port at the same time unless one of them is configured with a different `PORT`.

For the Docker database, use this in `apps/mobile-api/.env`:

```text
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/asata_dev
DIRECT_URL=postgresql://postgres:postgres@localhost:5432/asata_dev
JWT_SECRET=change_this_to_a_random_32_character_minimum_secret
```

### 5. Run the Mobile App

```bash
cd apps/mobile
npm install
npm start
```

Useful mobile scripts:

```bash
npm run android
npm run ios
npm run web
npm run build:android:preview
npm run build:android:production
npm run build:ios:simulator
```

Installed APKs cannot call `localhost` on your development machine. Set `EXPO_PUBLIC_API_BASE_URL` to a reachable API URL before creating preview or production builds.

---

## Environment Variables

### `apps/web`

| Variable | Required | Description | Local example |
| --- | --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL for `apps/api` | `http://localhost:3001` |

### `apps/api`

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma |
| `DATABASE_URL_UNPOOLED` | Required for migrations | Direct PostgreSQL URL used by Prisma `directUrl` |
| `PORT` | No | API port, defaults to `3001` |
| `NODE_ENV` | No | `development`, `production`, or `test` |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS allowlist |
| `RATE_LIMIT_MAX` | No | Global API rate limit |
| `GMAIL_USER` | Optional | Gmail account for contact notifications |
| `GMAIL_APP_PASSWORD` | Optional | Gmail app password |
| `CONTACT_RECEIVER` | No | Contact email receiver, defaults to `asata.club@gmail.com` |
| `JWT_SECRET` | No in dev | Admin JWT secret. Set a strong value in production |
| `JWT_EXPIRES_IN` | No | JWT lifetime, defaults to `7d` |
| `ADMIN_EMAIL` | No | Seed/default admin email |
| `ADMIN_PASSWORD` | No | Seed/default admin password |

### `apps/mobile-api`

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | No | `development`, `production`, or `test` |
| `PORT` | No | Mobile API port, defaults to `3001` |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `DIRECT_URL` | Provider-dependent | Direct PostgreSQL URL for migrations |
| `JWT_SECRET` | Yes | Minimum 32-character JWT secret |
| `JWT_EXPIRES_IN` | No | JWT lifetime, defaults to `7d` |
| `ALLOWED_ORIGINS` | No | CORS allowlist, defaults to Expo local origin |
| `RATE_LIMIT_MAX` | No | Global API rate limit |

### `apps/mobile`

| Variable | Required | Description |
| --- | --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | Recommended for builds | Base URL for the mobile API, including `/api` |

Default in source:

```text
https://asata-production-ae83.up.railway.app/api
```

---

## Applications

### `apps/web` - Public Website and Admin Panel

Main source folders:

```text
apps/web/src/
├── components/       # Navbar, footer, heroes, transitions, counters, lightbox, protected route
├── context/          # Admin auth provider
├── data/             # Static image paths and gallery fallback data
├── i18n/             # French, English, Arabic translations
├── lib/              # API client
└── pages/            # Public pages and admin pages
```

Public routes:

| Route | Purpose |
| --- | --- |
| `/` | Home page, ASATA introduction, stats, activities, mission |
| `/about` | Association history, identity, region, values, federations |
| `/ski` | Ski and mountain sports section |
| `/football` | Football section |
| `/athletisme` | Athletics section |
| `/equipe` | Committee, leadership, trainers, club direction |
| `/galerie` | Gallery photos, API data with static fallback assets |
| `/evenements` | Events and activities calendar |
| `/contact` | Contact form |
| `/don` | Donation form |
| `/admin/login` | Admin authentication |
| `/admin` | Protected admin dashboard |

Run commands:

```bash
cd apps/web
npm run dev
npm run build
npm run preview
```

### `apps/api` - Web REST API

Main source folders:

```text
apps/api/src/
├── config/           # Environment, Prisma, mailer
├── modules/
│   ├── auth/         # Admin JWT auth
│   ├── contact/      # Contact submissions and statuses
│   ├── donations/    # Donation records and stats
│   ├── events/       # Website/admin events
│   ├── gallery/      # Gallery records
│   └── upload/       # Admin image upload
├── utils/            # API response helpers
├── app.ts
└── main.ts
```

Run commands:

```bash
cd apps/api
npm run dev
npm run build
npm start
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
```

### `apps/mobile` - ASATA Connect

ASATA Connect is the mobile experience for members, coaches, and administrators.

Core member workflows:

- Register and log in.
- View association home information.
- Browse events and event details.
- Register for events.
- Cancel participations.
- Track joined, pending, cancelled, and past participations.
- Read announcements.
- View and mark notifications.
- Edit profile information and profile photo reference.

Admin and coach workflows in the current app:

- View admin dashboard statistics.
- Manage events.
- Manage announcements.
- View members.
- Access admin tabs when the authenticated role is `administrateur` or `coach`.

Main source folders:

```text
apps/mobile/src/
├── api/              # HTTP client with Bearer token support
├── components/       # Reusable UI and domain components
├── config/           # API base URL config
├── constants/        # Colors, spacing, typography, image registry
├── hooks/            # Feature hooks
├── navigation/       # Auth, root, tab, and stack navigators
├── screens/          # Auth, home, events, announcements, admin, profile
├── services/         # API-facing service modules
├── store/            # Zustand auth and notification state
├── types/            # Shared app types
└── utils/            # Date, storage, validation helpers
```

### `apps/mobile-api` - Mobile REST API

Main source folders:

```text
apps/mobile-api/src/
├── config/           # Environment and Prisma
├── middleware/       # Auth, role guard, error handler
├── modules/
│   ├── admin/        # Members and admin stats
│   ├── announcements/
│   ├── auth/
│   ├── events/
│   ├── notifications/
│   ├── participations/
│   └── profile/
├── utils/
├── app.ts
└── main.ts
```

Run commands:

```bash
cd apps/mobile-api
npm run dev
npm run build
npm start
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
```

---

## Deployment

### Frontend → Vercel
Deploys automatically on push to `main` in `XaMiNeZH/ASATA`.
- Build: `cd apps/web && npm run build`
- Required env var: `VITE_API_URL`

### API → Railway
Deploys automatically on push to `main` in `Hamzaaxx/ASATA`.
- Build: `npm install --include=dev && npm run build`
- Start: `npm start`
- See `apps/api/railway.toml` for full configuration

---

## Database Models

### Web API Schema

| Model | Purpose |
| --- | --- |
| `Event` | Website events with sport, category, status, highlight, image, result, and location details |
| `Admin` | Web admin accounts with password hashes |
| `Donation` | Donation intents, method, status, donor details, and reference |
| `GalleryPhoto` | Gallery image records by category |
| `ContactMessage` | Contact form messages and processing status |

### Mobile API Schema

| Model | Purpose |
| --- | --- |
| `User` | Member, coach, or administrator account |
| `Profil` | Optional user profile fields such as age, phone, address, and photo |
| `Evenement` | Mobile event/activity with capacity and status |
| `Participation` | User event registration, attendance, and cancellation state |
| `Annonce` | Announcement content and visibility |
| `Notification` | User notification records and read state |

---

## Deployment

### Public Website

The website is designed for Vercel.

```bash
cd apps/web
npm install
npm run build
```

Production variable:

```text
VITE_API_URL=https://asata-production.up.railway.app
```

`apps/web/vercel.json` rewrites all routes to `index.html`, which is required for React Router SPA routes.

### Web API

The web API is Railway-compatible and configured through `apps/api/railway.toml`.

```bash
cd apps/api
npm install --include=dev
npm run build
npm start
```

Production requirements:

- PostgreSQL `DATABASE_URL`.
- Strong `JWT_SECRET`.
- Correct `ALLOWED_ORIGINS` for the deployed website.
- Optional Gmail variables for contact message notifications.

### Mobile App

The mobile app is built with Expo EAS.

```bash
cd apps/mobile
npm run build:android:preview
npm run build:android:production
npm run build:ios:simulator
```

The GitHub Actions workflow `.github/workflows/mobile-release.yml` can create Android APK and iOS simulator artifacts and publish a GitHub Release. It expects:

- GitHub secret `EXPO_TOKEN`.
- GitHub variable `EXPO_PUBLIC_API_BASE_URL`.

More detail is available in `docs/mobile-eas-build.md` and `docs/mobile-release-checklist.md`.

### Mobile API

The mobile API can be deployed on a Node-compatible platform such as Railway or Render.

Production requirements:

- PostgreSQL `DATABASE_URL`.
- `DIRECT_URL` when the database provider needs a direct connection for migrations.
- Strong 32+ character `JWT_SECRET`.
- `ALLOWED_ORIGINS` aligned with mobile/web clients if browser access is used.

---

## Documentation and Assets

Important references:

| File or folder | Purpose |
| --- | --- |
| `RAPPORT_TECHNIQUE.md` | Detailed French technical report for the web platform |
| `POSTGRESQL_SETUP.md` | PostgreSQL setup notes |
| `MIGRATION_SUMMARY.md` | Migration summary |
| `docs/mobile-final-technical-section.md` | Detailed mobile architecture and implementation report |
| `docs/mobile-eas-build.md` | EAS build and release instructions |
| `docs/mobile-release-checklist.md` | Mobile release checklist |
| `docs/UML` | PlantUML source diagrams |
| `docs/UML/rendered` | Rendered UML PNG diagrams |
| `docs/mobile UI kit design (stitch)` | Mobile UI reference screens and exported HTML |
| `apps/web/public` | Website images, logo, sport photos, team photos |
| `apps/mobile/assets` | Expo icons, splash assets, mobile image assets |
| `archive` | Older web and mobile prototypes |

Logo assets:

- Website README/logo source: `apps/web/public/Association Logo.jpg`.
- Website app constant: `apps/web/src/data/images.ts` exports `LOGO`.
- Mobile ASATA image set: `apps/mobile/assets/images/asata/logo.jpg`.

---

## Verification

Recommended checks after code changes:

```bash
cd apps/web
npm run build
```

```bash
cd apps/api
npm run build
```

```bash
cd apps/mobile-api
npm run build
```

```bash
cd apps/mobile
npx tsc --noEmit
```

For documentation-only changes, a minimal local check is:

```bash
git diff --check README.md
```

---

## Troubleshooting

### Web app cannot reach the API

Check `apps/web/.env`:

```text
VITE_API_URL=http://localhost:3001
```

Do not add a trailing slash if it creates double slashes in API requests.

### CORS error

Add the frontend origin to `ALLOWED_ORIGINS` in the relevant API environment file.

Example:

```text
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Both APIs want port `3001`

Set one API to a different port:

```text
PORT=3002
```

Then update the corresponding frontend or mobile API base URL.

### Mobile APK cannot call local API

Use a reachable deployed API URL or a tunnel. `localhost` inside a phone or emulator is not the same machine as your laptop.

Set before building:

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-mobile-api.example.com/api
```

### Prisma migration cannot connect through a pooler

Some providers require a direct connection for migrations. Use:

- `DATABASE_URL` for pooled runtime access.
- `DATABASE_URL_UNPOOLED` or `DIRECT_URL` for direct migration access, depending on the app schema.

---

## Project Notes

- Keep the web API and mobile API schemas separate unless a future migration explicitly consolidates them.
- Keep secrets out of git. Use `.env.example` files only for safe templates.
- Update this README when routes, deployment URLs, required variables, or release commands change.
- Prefer existing UI components, services, stores, and Prisma patterns before adding new abstractions.

<div align="center">
  <sub>Built for ASATA and the sports community of Asni, Morocco.</sub>
</div>
