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
| `pnpm new:route`      | Scaffold a CRUD feature route             |

## Scaffold a CRUD route

Shell script scaffolds a full server-backed CRUD feature under `app/(protected)/` — list page, detail layout, overview tab, breadcrumbs slot, API layer, types, and i18n.

### Usage

```bash
pnpm new:route <route-path>
```

| Argument     | Required | Description                                          |
| ------------ | -------- | ---------------------------------------------------- |
| `route-path` | Yes      | Kebab-case path under `(protected)/` — may be nested |

### Examples

**Top-level route**

```bash
pnpm new:route projects
```

Creates `/projects` with files under `app/(protected)/projects/`, `lib/api/projects/`, `lib/types/project/`, etc.

**Nested route**

```bash
pnpm new:route imports/bmecat
```

Creates `/imports/bmecat` with the same structure mirrored under each path segment.

### What gets generated

```text
app/(protected)/{route-path}/
├── page.tsx
├── loading.tsx
├── _components/
│   ├── table-wrapper.tsx
│   ├── {leaf}-datatable-columns.tsx
│   ├── table-actions.tsx
│   ├── mobile-card-template.tsx
│   ├── page-actions-wrapper.tsx
│   ├── add-{leaf}-modal.tsx
│   └── add-{leaf}-form.tsx
└── [id]/
    ├── page.tsx                    # redirect → /overview
    ├── layout.tsx
    ├── loading.tsx
    ├── _components/{leaf}-tabs.tsx # overview tab only
    └── overview/
        ├── page.tsx
        ├── loading.tsx
        └── _components/
            ├── edit-{leaf}-modal.tsx
            ├── edit-{leaf}-form.tsx
            └── delete-{leaf}-modal.tsx

app/(protected)/@breadcrumbs/{route-path}/
├── default.tsx
└── [id]/
    ├── default.tsx
    └── overview/page.tsx
components/breadcrumbs/{leaf}-detail-breadcrumb.tsx
lib/api/{route-path}/
lib/types/{singular-leaf}/
lib/i18n/locales/{en,pt}/{leaf}.json
```

### Name derivation

| Input            | Route dir                         | URL               | API dir                   | Types dir            | i18n ns    |
| ---------------- | --------------------------------- | ----------------- | ------------------------- | -------------------- | ---------- |
| `projects`       | `app/(protected)/projects/`       | `/projects`       | `lib/api/projects/`       | `lib/types/project/` | `projects` |
| `imports/bmecat` | `app/(protected)/imports/bmecat/` | `/imports/bmecat` | `lib/api/imports/bmecat/` | `lib/types/bmecat/`  | `bmecat`   |

### Generic entity fields

Scaffolded types and forms use:

```ts
// list + detail
{
  id: bigint;
  name: string;
  createdAt: string;
  createdBy: string;
}

// create / update — only name is editable in the UI
{
  name: string;
}
```

### Config files auto-patched

The script also updates:

- `i18n.config.ts` — registers the new namespace
- `components/breadcrumbs/build-static-items.ts` — adds segment keys
- `lib/i18n/locales/{en,pt}/breadcrumbs.json` — segment labels
- `components/breadcrumbs/index.ts` — exports detail breadcrumb component
- `components/breadcrumbs/redirect-routes.ts` — mobile back skip for `[id]` redirect
- `components/sidebar/nav-main.data.ts` — sidebar entry with `FolderIcon`

### After scaffolding

1. Swap `FolderIcon` in the list page and sidebar for a route-specific icon
2. Adjust API endpoint paths in `lib/api/{route-path}/` if the .NET API differs
3. Add extra detail tabs under `[id]/` (security, permissions, etc.) — only `overview` is generated
   - Mirror each tab in `app/(protected)/@breadcrumbs/{route-path}/[id]/{tab}/page.tsx` (see `scripts/new-route/templates/examples/breadcrumb-tab-page.tsx.tpl`)
   - Update `{leaf}-detail-breadcrumb.tsx` with tab label keys
4. Update `lib/i18n/locales/pt/{leaf}.json` copy if needed

### Guards

The script exits with an error and makes no changes if:

- No route path is provided
- The route path is not valid kebab-case
- The target route, API, types, or breadcrumb component already exists

```bash
pnpm new:route projects
# Route already exists: app/(protected)/projects
```
