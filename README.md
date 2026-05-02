# ASATA

Repository for Association Sportive Atlas Toubkal Asni.

This project currently contains two active applications:

- `apps/web` - the public React website for ASATA
- `apps/mobile` - the Expo mobile app, currently using mock data until the backend is implemented

The backend is not part of the repository yet. The mobile app already has service and API-client boundaries so it can be connected to the backend later without rewriting the screens.

## Project Structure

```text
apps/
  web/       React, Vite, TypeScript, Tailwind CSS
  mobile/    Expo, React Native, TypeScript
archive/     Older website and mobile prototypes kept for reference
docs/        Source documents and planning material
```

## Website

Location: `apps/web`

The website is the current public web experience and the Vercel deployment source.

Run locally:

```bash
cd apps/web
npm install
npm run dev
```

Build:

```bash
cd apps/web
npm run build
```

Website assets live in `apps/web/public`.

## Mobile App

Location: `apps/mobile`

The mobile app is named `ASATA Connect`. It is built with Expo and React Native.

Run locally:

```bash
cd apps/mobile
npm install
npx expo start
```

Common Expo targets:

```bash
npm run android
npm run ios
npm run web
```

The app currently uses mock data from `apps/mobile/src/mocks`. Backend-ready service files live in `apps/mobile/src/services`, and the shared API client is in `apps/mobile/src/api/client.ts`.

When the backend is ready:

1. Update `API_BASE_URL` in `apps/mobile/src/api/client.ts`.
2. Set `USE_MOCK = false` in the mobile service files.
3. Verify the API routes expected by the service files match the backend routes.

## Backend Status

The backend is planned but not implemented yet.

Until then:

- The website is static/client-side and does not depend on a backend.
- The mobile app uses mock data for authentication, events, announcements, notifications, participations, and profile flows.
- API integration points are present in the mobile app but inactive while `USE_MOCK` is enabled.

## Archived Work

The `archive` directory contains older versions and prototypes. These are kept as reference material only and are not active deployment targets.
