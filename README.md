# ASATA

Association Sportive Atlas Toubkal Asni repository.

## Structure

- `apps/web` - current React website and Vercel deployment source
- `archive/web-old-v1` - first static HTML/CSS/JS site kept as reference
- `archive/web-static-final` - final static HTML/CSS/JS site kept as reference
- `docs` - source documents provided by the association

## Notes

- The live website is the React app in `apps/web`.
- Archived static versions are kept for reference only and are not the active deployment target.
- Website assets are canonical in `apps/web/public`.

## Mobile App

Location: `apps/mobile/`

Run locally:
```bash
cd apps/mobile
npx expo start
```

To connect to a real backend: set `USE_MOCK = false` in all service files and
configure `API_BASE_URL` in `src/api/client.ts`.
