# ASATA — Association Sportive Atlas Toubkal Asni

<div align="center">

![ASATA](https://img.shields.io/badge/ASATA-Sports%20Association-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live%20in%20Production-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

**[🌐 Website](https://asata-website.vercel.app) · [⚙️ API](https://asata-production.up.railway.app/health) · [🔐 Admin Panel](https://asata-website.vercel.app/admin)**

</div>

---

## Overview

ASATA is a full-stack sports association management platform for Association Sportive Atlas Toubkal Asni — a multi-discipline sports club based in Asni, Morocco, at the foot of Djebel Toubkal.

The platform includes a public website, an admin panel, a REST API, and a mobile app.

---

## Project Structure

```
ASATA/
├── apps/
│   ├── web/          # React website + admin panel (Vercel)
│   ├── api/          # Express REST API (Railway)
│   └── mobile/       # Expo React Native app (ASATA Connect)
├── archive/          # Older prototypes (reference only)
└── docs/             # Planning and source documents
```

---

## Live URLs

| Service | URL | Platform |
|---------|-----|----------|
| **Website** | https://asata-website.vercel.app | Vercel |
| **API** | https://asata-production.up.railway.app | Railway |
| **Admin Panel** | https://asata-website.vercel.app/admin | Vercel |
| **API Health** | https://asata-production.up.railway.app/health | Railway |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, TailwindCSS, Framer Motion |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | JWT + bcryptjs |
| Validation | Zod |
| Mobile | Expo, React Native, TypeScript |
| Hosting | Vercel (web), Railway (API), Neon (DB) |

---

## Apps

### `apps/web` — Public Website & Admin Panel

The React frontend deployed on Vercel. Includes:
- Public pages: Home, About, Events, Gallery, Contact, Donations, Sport clubs
- Admin panel at `/admin` with full CRUD for events, gallery, donations, and contact messages

**Run locally:**
```bash
cd apps/web
npm install
npm run dev        # http://localhost:5173
```

**Environment variables** (create `apps/web/.env`):
```env
VITE_API_URL=http://localhost:3001
```

---

### `apps/api` — REST API

The Express API deployed on Railway, connected to Neon PostgreSQL.

**Run locally:**
```bash
cd apps/api
npm install
npm run dev        # http://localhost:3001
```

**Environment variables** (create `apps/api/.env`):
```env
DATABASE_URL=postgresql://...
DATABASE_URL_UNPOOLED=postgresql://...
JWT_SECRET=your_secret
ADMIN_EMAIL=admin@asata.ma
ADMIN_PASSWORD=your_password
ALLOWED_ORIGINS=http://localhost:5173
NODE_ENV=development
```

**Database setup:**
```bash
npx prisma migrate deploy    # Run migrations
npx prisma db seed           # Seed admin + sample data
npx prisma studio            # Visual DB browser
```

**API Endpoints:**

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/admin/login` | Public |
| GET | `/api/admin/me` | Admin |
| GET | `/api/events` | Public |
| POST/PUT/DELETE | `/api/events/:id` | Admin |
| GET | `/api/gallery` | Public |
| POST/DELETE | `/api/gallery/:id` | Admin |
| POST | `/api/donations` | Public |
| GET | `/api/donations` | Admin |
| POST | `/api/contact` | Public |
| GET | `/api/contact` | Admin |
| POST | `/api/upload` | Admin |
| GET | `/health` | Public |

---

### `apps/mobile` — ASATA Connect (Mobile App)

The Expo React Native mobile app connected to the live API.

**Run locally:**
```bash
cd apps/mobile
npm install
npx expo start
```

**Targets:**
```bash
npm run android
npm run ios
npm run web
```

**Backend connection:**
- API URL is set in `apps/mobile/src/api/client.ts`
- Set `USE_MOCK=false` in service files to use the live API

---

## Development Setup (Full Stack)

Run the full stack locally with Docker for PostgreSQL:

```bash
# 1. Start local PostgreSQL
docker-compose up -d

# 2. Start API
cd apps/api && npm install && npm run dev

# 3. Start Web (new terminal)
cd apps/web && npm install && npm run dev
```

Or use Neon directly — update `apps/api/.env` with your Neon connection string.

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
- See `apps/api/railway.toml` for full config

---

## Database Models

| Model | Description |
|-------|-------------|
| `Event` | Sports events (upcoming / past) |
| `Admin` | Admin accounts (JWT auth) |
| `Donation` | Donation records |
| `GalleryPhoto` | Gallery images |
| `ContactMessage` | Contact form submissions |

<div align="center">
  <sub>Built with ❤️ for the youth of Asni, Morocco 🇲🇦</sub>
</div>
