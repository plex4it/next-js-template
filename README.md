# Plex4It Next.js App Template

Reusable Next.js 16 + React 19 + shadcn shell

## What's included

- App shell: sidebar, page layout compound (`Page`), theme, toasts
- Forms: zod + react-hook-form helpers + modal form
- i18n: `next-i18next` with `en` / `pt` (`common`, `users`)
- Data table: TanStack Table under `components/shared/data-table`
- Demo routes:
  - `/dashboard` — welcome page
  - `/admin/users` — users list

## Auth

**Not wired yet.**

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/dashboard`.

## Scripts

| Command       | Description      |
| ------------- | ---------------- |
| `pnpm dev`    | Dev server       |
| `pnpm build`  | Production build |
| `pnpm lint`   | ESLint           |
| `pnpm format` | Prettier write   |
