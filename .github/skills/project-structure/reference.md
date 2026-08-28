# Project Structure Reference

## What is already in the template

Do not rebuild these — use as reference only:

| Area             | Path                                 |
| ---------------- | ------------------------------------ |
| Admin users CRUD | `app/(protected)/admin/users/`       |
| Admin roles CRUD | `app/(protected)/admin/roles/`       |
| Dashboard        | `app/(protected)/dashboard/`         |
| Demo page        | `app/(protected)/pages/products/`    |
| Auth             | `app/(auth)/login/`, `app/api/auth/` |

## Top-level tree

```
app/
├── (protected)/
│   ├── layout.tsx              # requireSession + sidebar + @breadcrumbs
│   ├── @breadcrumbs/           # parallel route slot
│   ├── dashboard/
│   ├── pages/products/         # demo — replace with your features
│   ├── admin/                  # template CRUD — do not add here
│   └── {your-feature}/         # ← new features go here
│       ├── page.tsx
│       ├── loading.tsx
│       ├── layout.tsx          # optional, for groups
│       ├── _components/
│       └── [id]/               # optional, detail routes
├── (auth)/login/
└── api/auth/

components/
├── ui/                         # shadcn
├── shared/                     # Page, Details, DataTable, Form
├── sidebar/nav-main.data.ts    # sidebar routes
└── breadcrumbs/                # breadcrumb builders

lib/
├── api/{entity}/               # 'use server' → .NET API
├── types/{entity}/
├── i18n/locales/{en,pt}/
└── test-data/
```

## Scaffold: single feature page

`app/(protected)/projects/`

```
projects/
├── page.tsx
└── loading.tsx                 # optional
```

```tsx
// app/(protected)/projects/page.tsx
import { Page } from '@/components/shared/pages-layout';
import { FolderIcon } from 'lucide-react';
import { getT } from 'next-i18next/server';

export default async function ProjectsPage() {
  const { t } = await getT('projects');

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('projects:page_title')}>
          <Page.Icon icon={FolderIcon} />
        </Page.Title>
      </Page.Header>
      <Page.Content>{/* feature content */}</Page.Content>
    </Page>
  );
}
```

## Scaffold: nested feature group

`app/(protected)/imports/bmecat/`, `app/(protected)/imports/xml/`

```
imports/
├── layout.tsx                  # optional shared layout
├── bmecat/
│   ├── page.tsx
│   ├── loading.tsx
│   └── _components/
│       └── import-bmecat-form.tsx
└── xml/
    ├── page.tsx
    ├── loading.tsx
    └── _components/
        └── import-xml-form.tsx
```

Shared group layout (optional):

```tsx
// app/(protected)/imports/layout.tsx
export default function ImportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

## Scaffold: feature with list + detail

`app/(protected)/projects/` with `[id]` tabs — same pattern as `admin/users`, but under your feature path:

```
projects/
├── page.tsx
├── loading.tsx
└── _components/
    ├── table-wrapper.tsx
    ├── projects-datatable-columns.tsx
    └── page-actions-wrapper.tsx

projects/[id]/
├── page.tsx                    # redirect → /overview
├── layout.tsx                  # fetch project, Details header
├── loading.tsx
├── _components/projects-tabs.tsx
└── overview/
    ├── page.tsx
    └── _components/

lib/api/projects/
├── get-projects.ts
└── get-project-details.ts

lib/types/project/
├── request/
└── response/

lib/i18n/locales/{en,pt}/projects.json
```

## Sidebar registration

`components/sidebar/nav-main.data.ts`:

```ts
// Single feature
{
  titleKey: 'breadcrumbs:projects',
  url: '/projects',
  icon: FolderIcon,
}

// Nested group
{
  titleKey: 'breadcrumbs:imports',
  routes: [
    { titleKey: 'breadcrumbs:bmecat', url: '/imports/bmecat', icon: FileIcon },
    { titleKey: 'breadcrumbs:xml', url: '/imports/xml', icon: FileCodeIcon },
  ],
}
```

`lib/i18n/locales/en/breadcrumbs.json`:

```json
{
  "projects": "Projects",
  "imports": "Imports",
  "bmecat": "BMECat",
  "xml": "XML"
}
```

Mirror in `pt/breadcrumbs.json`.

## Breadcrumbs

### Architecture

```
app/(protected)/
├── layout.tsx                          # renders {breadcrumbs} in header
└── @breadcrumbs/
    ├── default.tsx                     # returns null
    ├── [...catchAll]/page.tsx          # static — handles most feature routes
    └── {feature}/[id]/[tab]/page.tsx   # dynamic — detail pages with API data
```

### Static breadcrumbs

**When:** labels from URL segments only.

**Handled by:** `@breadcrumbs/[...catchAll]/page.tsx` + `buildStaticBreadcrumbItems`

**Add segment for `/imports/bmecat`:**

1. i18n — `breadcrumbs.json` (`en` + `pt`):

```json
{ "imports": "Imports", "bmecat": "BMECat" }
```

2. `components/breadcrumbs/build-static-items.ts`:

```ts
const BREADCRUMB_SEGMENT_KEYS: Record<string, string> = {
  imports: 'breadcrumbs:imports',
  bmecat: 'breadcrumbs:bmecat',
  xml: 'breadcrumbs:xml',
  projects: 'breadcrumbs:projects',
};

const LABEL_ONLY_SEGMENTS = new Set(['admin', 'imports']);
```

`imports` in `LABEL_ONLY_SEGMENTS` → parent label, not a link.

**Trail:** `/imports/bmecat` → Imports → BMECat

**Trail:** `/projects` → Projects

### Dynamic `[id]` breadcrumbs

**When:** breadcrumb needs fetched entity name — e.g. `/projects/42/overview`.

#### Step 1 — detail breadcrumb component

`components/breadcrumbs/project-detail-breadcrumb.tsx`

```tsx
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';
import getProjectDetails from '@/lib/api/projects/get-project-details';
import { Breadcrumbs } from './breadcrumbs';
import type { BreadcrumbItem } from './types';

const PROJECT_TAB_LABEL_KEYS: Record<string, string> = {
  settings: 'projects:settings',
  files: 'projects:files',
};

type ProjectDetailBreadcrumbProps = { id: string; tab: string };

export async function ProjectDetailBreadcrumb({ id, tab }: ProjectDetailBreadcrumbProps) {
  const { t } = await getT(['breadcrumbs', 'common', 'projects']);

  let project;
  try {
    project = await getProjectDetails(BigInt(id));
  } catch {
    notFound();
  }
  if (!project) notFound();

  const items: BreadcrumbItem[] = [{ label: t('breadcrumbs:projects'), href: '/projects' }];

  if (tab === 'overview') {
    items.push({ label: project.name });
  } else {
    const tabLabelKey = PROJECT_TAB_LABEL_KEYS[tab];
    if (!tabLabelKey) notFound();
    items.push({ label: project.name, href: `/projects/${id}/overview` });
    items.push({ label: t(tabLabelKey) });
  }

  return <Breadcrumbs items={items} backLabel={t('breadcrumbs:back')} />;
}
```

#### Step 2 — export

`components/breadcrumbs/index.ts`:

```ts
export { ProjectDetailBreadcrumb } from './project-detail-breadcrumb';
```

#### Step 3 — slot page

`app/(protected)/@breadcrumbs/projects/[id]/[tab]/page.tsx`

```tsx
import { ProjectDetailBreadcrumb } from '@/components/breadcrumbs';

type Props = { params: Promise<{ id: string; tab: string }> };

export default async function ProjectBreadcrumbsSlot({ params }: Props) {
  const { id, tab } = await params;
  return <ProjectDetailBreadcrumb id={id} tab={tab} />;
}
```

#### Step 4 — redirect-only `[id]` route

If `projects/[id]/page.tsx` redirects to `/overview`, add to `redirect-routes.ts`:

```ts
const REDIRECT_ONLY_PATTERNS = [
  /^\/admin\/users\/\d+$/,
  /^\/admin\/roles\/\d+$/,
  /^\/projects\/\d+$/, // new feature
];
```

### Breadcrumb trail examples

| URL                     | Trail                              |
| ----------------------- | ---------------------------------- |
| `/dashboard`            | Dashboard                          |
| `/projects`             | Projects                           |
| `/imports/bmecat`       | Imports → BMECat                   |
| `/imports/xml`          | Imports → XML                      |
| `/projects/42/overview` | Projects → Project Name            |
| `/projects/42/settings` | Projects → Project Name → Settings |

Admin dynamic breadcrumbs (`admin/users/[id]`) already exist — copy pattern from `user-detail-breadcrumb.tsx` if needed.

## i18n

1. Create `lib/i18n/locales/en/{namespace}.json` + `pt/{namespace}.json`
2. Register in `i18n.config.ts`:

```ts
ns: ['common', 'users', 'roles', 'projects', 'imports'],
```

3. Server: `const { t } = await getT('projects')`
4. Client: `const { t } = useT('projects')`
5. Cross-namespace: `t('breadcrumbs:projects')`

## API server action

`lib/api/projects/get-projects.ts`

```ts
'use server';

import { api } from '@/lib/api/utils';
import { ListQuery } from '@/lib/types/list-query';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { ListProjectResponse } from '@/lib/types/project/response/list-project-response';

export default async function getProjects(
  data: ListQuery
): Promise<CursorPaginatedList<ListProjectResponse>> {
  const result = await api.get('projects', data);
  if (!result.ok) throw Error('Failed to retrieve projects');
  return result.json();
}
```

## Import aliases

| Alias          | Maps to        |
| -------------- | -------------- |
| `@/*`          | repo root      |
| `@/components` | `./components` |
| `@/lib`        | `./lib`        |
| `@/hooks`      | `./hooks`      |

## Shared compounds

- `components/shared/pages-layout` → `Page`, `PageAddAction`, `PageExportAction`
- `components/shared/details` → `Details` + header/tabs/content
- `components/shared/data-table` → `DataTable` + table context
- `components/shared/form` → `Form`, `FormGroup`, `ModalForm`, `SelectField`
