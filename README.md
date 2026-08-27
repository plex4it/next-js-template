# Plex4It Next.js App Template

Reusable Next.js 16 + React 19 + shadcn shell

## What's included

- App shell: sidebar, page layout compound (`Page`), theme, toasts
- Forms: zod + react-hook-form helpers + modal form
- i18n: `next-i18next` with `en` / `pt` (`common`, `users`)
- Data table: TanStack Table under `components/shared/data-table`
- Auth: better-auth + Keycloak OAuth + Bearer calls to .NET
- Env: `@t3-oss/env-nextjs` validation in `env.ts`
- Demo routes:
  - `/dashboard` — welcome page
  - `/admin/users` — users list

## Prerequisites

- Node.js 24+
- pnpm 10
- PostgreSQL with an `auth` schema (Better Auth / Prisma)
- Keycloak realm + confidential OIDC client (see contract below)
- For Docker Compose: Docker, and an external network named `keycloak-network`

## Environment variables

Copy `.env.example` → `.env` and fill values. Validated by `env.ts` (T3 Env).

| Variable             | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `BETTER_AUTH_SECRET` | Better Auth signing secret                    |
| `BETTER_AUTH_URL`    | Public app URL (e.g. `http://localhost:3000`) |
| `PG_HOST`            | Postgres host                                 |
| `PG_PORT`            | Postgres port                                 |
| `PG_DATABASE`        | Database name                                 |
| `PG_USERNAME`        | Database user                                 |
| `PG_PASSWORD`        | Database password                             |
| `KC_ISSUER`          | Keycloak realm issuer URL                     |
| `KC_CLIENT_ID`       | Keycloak client id                            |
| `KC_CLIENT_SECRET`   | Keycloak client secret                        |
| `API_URL`            | .NET API base URL                             |

## Local startup

```bash
pnpm install
cp .env.example .env

pnpm db:migrate
pnpm db:generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) → Login → Keycloak → `/dashboard`.

## Auth

Keycloak issues tokens → Better Auth keeps a cookie session + stored OAuth tokens → server attaches the Keycloak access token as `Authorization: Bearer` → .NET `JwtBearer` validates audience / permissions.

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
| Env schema      | `env.ts`                         |
| Auth config     | `lib/auth/auth.ts`               |
| Session helpers | `lib/auth/session.ts`            |
| API client      | `lib/api/client.ts`              |
| OAuth handler   | `app/api/auth/[...all]/route.ts` |
| Logout          | `app/api/auth/logout/route.ts`   |
| Login           | `app/(auth)/login/page.tsx`      |
| Guard           | `app/(protected)/layout.tsx`     |

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
