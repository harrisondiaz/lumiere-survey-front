# Lumière Survey — Frontend

Marketing survey SPA for the Lumière skincare brand. React 18 + Vite + Tailwind + shadcn/ui.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 + shadcn/ui
- React Hook Form + Zod
- Axios, Framer Motion, canvas-confetti

## Quick start

```powershell
pnpm install
copy .env.example .env
pnpm dev
```

App: http://localhost:5173

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend URL. Leave **empty** in dev (uses Vite proxy to `localhost:3000`) |

For production, set to your deployed API URL:

```env
VITE_API_URL=https://api.tudominio.com
```

## Backend

This frontend expects the independent backend API:

- `POST /api/survey` — submit form
- Dev proxy: `/api` → `http://localhost:3000` (configured in `vite.config.ts`)

Run the backend separately before testing form submission.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server (port 5173) |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm typecheck` | TypeScript check |

## Deploy on Vercel

1. Import repo [lumiere-survey-front](https://github.com/harrisondiaz/lumiere-survey-front) on [vercel.com](https://vercel.com)
2. Framework preset: **Vite** (auto-detected)
3. Build command: `pnpm build` · Output: `dist`
4. Environment variable:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

5. Deploy. SPA routing is handled by [`vercel.json`](vercel.json).

> **Note:** `npx plugins add vercel/vercel-plugin` is an optional **Cursor/Claude plugin** for AI-assisted deploys — it is **not** required. Connecting the GitHub repo on Vercel is enough.

## Docker

```bash
docker build --build-arg VITE_API_URL=http://localhost:3000 -t lumiere-frontend .
docker run -p 8080:80 lumiere-frontend
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/survey` | 3-step survey wizard |
| `/thank-you` | Confirmation + confetti |

## License

MIT
