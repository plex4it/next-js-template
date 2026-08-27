# Plex4It Next.js App Template

Reusable Next.js 16 + React 19 + shadcn shell

## What's included

- App shell: sidebar, page layout compound (`Page`), theme, toasts
- Forms: zod + react-hook-form helpers + modal form
- i18n: `next-i18next` with `en` / `pt` (`common`, `users`)
- Data table: TanStack Table under `components/shared/data-table`
- Auth: better-auth + Keycloak OAuth + Bearer calls to .NET
- Demo routes:
  - `/dashboard` — welcome page
  - `/admin/users` — users list

## Auth

Keycloak issues tokens → Better Auth keeps a cookie session + stored OAuth tokens → server attaches the Keycloak access token as `Authorization: Bearer` → .NET `JwtBearer` validates audience / permissions.

### Setup

1. Copy `.env.example` → `.env` and fill values.
2. Run migrations and generate the client:

```bash
pnpm db:migrate
pnpm db:generate
```

3. Start the app: `pnpm dev`

### Keycloak / .NET contract

Configure the confidential OIDC client the same way existing .NET APIs expect:

| Requirement       | Detail                                                       |
| ----------------- | ------------------------------------------------------------ |
| Audience mapper   | JWT `aud` includes `api`                                     |
| Permissions claim | Client roles → claim `permissions`                           |
| Profile claims    | `firstName` / `lastName`                                     |
| Scopes            | `openid`, `profile`, `email`, `offline_access`               |
| Redirects         | `{BETTER_AUTH_URL}/*` and post-logout to `{BETTER_AUTH_URL}` |

### App wiring

| Piece           | Path                             |
| --------------- | -------------------------------- |
| Auth config     | `lib/auth/auth.ts`               |
| Session helpers | `lib/auth/session.ts`            |
| API client      | `lib/api/client.ts`              |
| OAuth handler   | `app/api/auth/[...all]/route.ts` |
| Logout          | `app/api/auth/logout/route.ts`   |
| Login           | `app/(auth)/login/page.tsx`      |
| Guard           | `app/(protected)/layout.tsx`     |

## Quick start

```bash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm db:generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) → Login → Keycloak → `/dashboard`.

## Scripts

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `pnpm dev`            | Dev server                                |
| `pnpm build`          | Generate Prisma client + production build |
| `pnpm lint`           | ESLint                                    |
| `pnpm format`         | Prettier write                            |
| `pnpm db:generate`    | Prisma generate                           |
| `pnpm db:migrate`     | Apply migrations                          |
| `pnpm db:migrate:dev` | Dev migrations                            |
