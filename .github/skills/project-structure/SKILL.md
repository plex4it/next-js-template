---
name: project-structure
description: >-
  Guides file placement and conventions for new feature pages in this Next.js 16
  template. Use when adding routes under app/(protected)/ (e.g. projects,
  imports/bmecat), server actions, types, components, i18n, breadcrumbs, or
  sidebar nav. Admin (users/roles) is already in the template — do not recreate it.
---

# Project Structure

This is a **template**. `admin/users` and `admin/roles` are baked in — use them as reference only, do not scaffold new admin entities unless explicitly asked.

This skill covers **new app features** under `app/(protected)/`, e.g.:

- `app/(protected)/projects/`
- `app/(protected)/imports/bmecat/`
- `app/(protected)/imports/xml/`

Read `AGENTS.md` and `node_modules/next/dist/docs/` before writing Next.js code.

## Stack

Next.js 16 · React 19 · shadcn/ui · better-auth + Keycloak · Prisma (auth only) · external .NET API via `lib/api/client.ts` · next-i18next · Zod + react-hook-form · TanStack Table · pnpm

## Where to put new code

```mermaid
flowchart TD
  start[New feature code] --> route{Page/route?}
  route -->|protected feature| feature["app/(protected)/{feature}/"]
  route -->|nested group| nested["app/(protected)/{group}/{child}/"]
  route -->|HTTP handler| apiRoute["app/api/{segment}/route.ts"]
  route -->|no| comp{Reused UI?}
  comp -->|shadcn primitive| ui["components/ui/"]
  comp -->|cross-feature compound| shared["components/shared/"]
  comp -->|feature-specific| local["app/.../_components/"]
  start --> serverFn{Server data call?}
  serverFn -->|yes| libapi["lib/api/{entity}/{verb}-{entity}.ts"]
  start --> types{Type?}
  types -->|yes| libtypes["lib/types/{entity}/request|response/"]
  start --> i18n{i18n string?}
  i18n -->|yes| locales["lib/i18n/locales/{en,pt}/{namespace}.json"]
```

## Route patterns for new features

All new features live under `app/(protected)/` and inherit session guard, sidebar, and breadcrumbs from the layout.

| Pattern       | Example                           | Files                                                                |
| ------------- | --------------------------------- | -------------------------------------------------------------------- |
| Single page   | `/projects`                       | `projects/page.tsx` + optional `loading.tsx`                         |
| Nested group  | `/imports/bmecat`, `/imports/xml` | `imports/bmecat/page.tsx`, shared `imports/layout.tsx` optional      |
| List + table  | `/projects` with datatable        | `page.tsx` + `_components/table-wrapper.tsx`, columns, actions       |
| Detail + tabs | `/projects/[id]/overview`         | `[id]/layout.tsx`, `[id]/page.tsx` → redirect, `[id]/{tab}/page.tsx` |
| Client-heavy  | upload wizards, live forms        | `_components/` with `'use client'` wrappers                          |

**Do not** put new features under `admin/` unless they are admin concerns. `admin/` is reserved for template CRUD (users, roles).
