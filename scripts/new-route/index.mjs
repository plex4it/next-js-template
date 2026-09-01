import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '../..');
const templateDir = path.join(scriptDir, 'templates');

/** @param {string} message @param {number} [code] */
function exit(message, code = 1) {
  console.error(message);
  process.exit(code);
}

function usage() {
  console.log('Usage: pnpm new:route <route-path>');
  console.log('  route-path  e.g. projects, imports/bmecat');
  process.exit(1);
}

/** @param {string} value */
function toPascal(value) {
  return value.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase());
}

/** @param {string} value */
function toLabel(value) {
  return value
    .replace(/-/g, ' ')
    .replace(/(^| )([a-z])/g, (_, prefix, char) => `${prefix}${char.toUpperCase()}`);
}

/** @param {string} raw */
function normalizeRoutePath(raw) {
  return raw.trim().toLowerCase().replace(/\s+/g, '-').replace(/^\/+|\/+$/g, '');
}

/** @param {string} routeRaw */
function deriveNames(routeRaw) {
  const routePath = normalizeRoutePath(routeRaw);

  if (!routePath) {
    exit('Error: route path is required');
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/.test(routePath)) {
    exit('Error: route path must be kebab-case segments separated by /');
  }

  const parts = routePath.split('/');
  const leaf = parts[parts.length - 1];
  const singular = leaf.endsWith('s') ? leaf.slice(0, -1) : leaf;

  let accum = '';
  const breadcrumbLines = [];

  parts.forEach((part, index) => {
    accum = accum ? `${accum}/${part}` : `/${part}`;
    const isLast = index === parts.length - 1;

    if (isLast) {
      breadcrumbLines.push(`    { label: t('breadcrumbs:${part}'), href: '${accum}' },`);
    } else {
      breadcrumbLines.push(`    { label: t('breadcrumbs:${part}') },`);
    }
  });

  return {
    routePath,
    leaf,
    singular,
    pascal: toPascal(leaf),
    entityPascal: toPascal(singular),
    label: toLabel(leaf),
    urlBase: `/${routePath}`,
    apiPath: routePath,
    i18nNs: leaf,
    parts,
    partLabels: parts.map(toLabel),
    breadcrumbParentItems: `${breadcrumbLines.join('\n')}\n`,
  };
}

/** @param {ReturnType<typeof deriveNames>} names */
function assertTargetsAvailable(names) {
  const checks = [
    {
      exists: fs.existsSync(path.join(rootDir, 'app/(protected)', names.routePath)),
      message: `Route already exists: app/(protected)/${names.routePath}`,
    },
    {
      exists: fs.existsSync(path.join(rootDir, 'lib/api', names.apiPath)),
      message: `API already exists: lib/api/${names.apiPath}`,
    },
    {
      exists: fs.existsSync(path.join(rootDir, 'lib/types', names.singular)),
      message: `Types already exist: lib/types/${names.singular}`,
    },
    {
      exists: fs.existsSync(
        path.join(rootDir, 'components/breadcrumbs', `${names.leaf}-detail-breadcrumb.tsx`)
      ),
      message: `Breadcrumb component already exists: components/breadcrumbs/${names.leaf}-detail-breadcrumb.tsx`,
    },
  ];

  for (const check of checks) {
    if (check.exists) {
      exit(check.message);
    }
  }
}

/** @param {string} src @param {string} dest @param {ReturnType<typeof deriveNames>} names */
function applyTemplate(src, dest, names) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const replacements = {
    '{{ROUTE_PATH}}': names.routePath,
    '{{URL_BASE}}': names.urlBase,
    '{{LEAF}}': names.leaf,
    '{{PASCAL}}': names.pascal,
    '{{ENTITY_PASCAL}}': names.entityPascal,
    '{{LABEL}}': names.label,
    '{{API_PATH}}': names.apiPath,
    '{{SINGULAR}}': names.singular,
    '{{I18N_NS}}': names.i18nNs,
    '{{BREADCRUMB_PARENT_ITEMS}}': names.breadcrumbParentItems,
  };

  let content = fs.readFileSync(src, 'utf8');
  for (const [token, value] of Object.entries(replacements)) {
    content = content.split(token).join(value);
  }

  fs.writeFileSync(dest, `${content.trimEnd()}\n`);
}

/** @param {string} relativePath @param {ReturnType<typeof deriveNames>} names */
function resolveFilename(relativePath, names) {
  return relativePath
    .replace(/\{\{LEAF\}\}/g, names.leaf)
    .replace(/\{\{SINGULAR\}\}/g, names.singular)
    .replace(/\.tpl$/, '');
}

/** @param {string} srcRoot @param {string} destRoot @param {ReturnType<typeof deriveNames>} names */
function renderTree(srcRoot, destRoot, names) {
  /** @param {string} currentSrc @param {string} [currentRel] */
  const walk = (currentSrc, currentRel = '') => {
    for (const entry of fs.readdirSync(currentSrc, { withFileTypes: true })) {
      const srcPath = path.join(currentSrc, entry.name);
      const relPath = currentRel ? path.join(currentRel, entry.name) : entry.name;

      if (entry.isDirectory()) {
        walk(srcPath, relPath);
        continue;
      }

      if (!entry.name.endsWith('.tpl')) {
        continue;
      }

      const destRel = resolveFilename(relPath, names);
      applyTemplate(srcPath, path.join(destRoot, destRel), names);
    }
  };

  walk(srcRoot);
}

/** @param {string} relativePath */
function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

/** @param {string} relativePath @param {string} content */
function writeProjectFile(relativePath, content) {
  fs.writeFileSync(path.join(rootDir, relativePath), content);
}

/** @param {ReturnType<typeof deriveNames>} names */
function patchConfig(names) {
  patchI18nConfig(names);
  patchBuildStaticItems(names);

  names.parts.forEach((part, index) => {
    const label = names.partLabels[index] ?? part;
    patchBreadcrumbsLocale('en', part, label);
    patchBreadcrumbsLocale('pt', part, label);
  });

  patchBreadcrumbsIndex(names);
  patchRedirectRoutes(names);
  patchNavMain(names);
}

/** @param {ReturnType<typeof deriveNames>} names */
function patchI18nConfig(names) {
  const filePath = 'i18n.config.ts';
  let content = readProjectFile(filePath);
  if (content.includes(`'${names.leaf}'`)) return;

  content = content.replace("'breadcrumbs',", `'breadcrumbs',\n    '${names.leaf}',`);
  writeProjectFile(filePath, content);
}

/** @param {ReturnType<typeof deriveNames>} names */
function patchBuildStaticItems(names) {
  const filePath = 'components/breadcrumbs/build-static-items.ts';
  let content = readProjectFile(filePath);

  for (const part of names.parts) {
    const entry = `  ${part}: 'breadcrumbs:${part}',`;
    if (content.includes(entry)) continue;
    content = content.replace("  roles: 'breadcrumbs:roles',", `  roles: 'breadcrumbs:roles',\n${entry}`);
  }

  writeProjectFile(filePath, content);
}

/** @param {string} lang @param {string} part @param {string} label */
function patchBreadcrumbsLocale(lang, part, label) {
  const filePath = `lib/i18n/locales/${lang}/breadcrumbs.json`;
  const data = JSON.parse(readProjectFile(filePath));

  if (part in data) return;

  data[part] = label;
  writeProjectFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

/** @param {ReturnType<typeof deriveNames>} names */
function patchBreadcrumbsIndex(names) {
  const filePath = 'components/breadcrumbs/index.ts';
  const content = readProjectFile(filePath);
  const exportLine = `export { ${names.entityPascal}DetailBreadcrumb } from './${names.leaf}-detail-breadcrumb';`;

  if (content.includes(exportLine)) return;

  writeProjectFile(filePath, `${content.trimEnd()}\n${exportLine}\n`);
}

/** @param {ReturnType<typeof deriveNames>} names */
function patchRedirectRoutes(names) {
  const filePath = 'components/breadcrumbs/redirect-routes.ts';
  let content = readProjectFile(filePath);
  const escapedPath = names.routePath.replace(/\//g, '\\/');
  const pattern = `/^\\/${escapedPath}\\/\\d+$/`;

  if (content.includes(pattern)) return;

  content = content.replace(
    /const REDIRECT_ONLY_PATTERNS = \[([\s\S]*?)\];/,
    (_, patterns) => {
      const trimmed = patterns.trim();
      const nextPattern = `  ${pattern}`;

      if (!trimmed) {
        return `const REDIRECT_ONLY_PATTERNS = [\n${nextPattern},\n];`;
      }

      return `const REDIRECT_ONLY_PATTERNS = [\n${nextPattern},${patterns}\n];`;
    }
  );
  writeProjectFile(filePath, content);
}

/** @param {ReturnType<typeof deriveNames>} names */
function patchNavMain(names) {
  const filePath = 'components/sidebar/nav-main.data.ts';
  let content = readProjectFile(filePath);

  if (content.includes(`url: '${names.urlBase}'`)) return;

  if (!content.includes('FolderIcon')) {
    content = content.replace(
      'StickyNoteIcon,\n} from',
      'StickyNoteIcon,\n  FolderIcon,\n} from'
    );
  }

  const navGroup = `  {
    routes: [
      {
        titleKey: 'breadcrumbs:${names.leaf}',
        url: '${names.urlBase}',
        icon: FolderIcon,
      },
    ],
  },
`;

  content = content.replace(/\n];$/, `\n${navGroup}];`);
  writeProjectFile(filePath, content);
}

/** @param {ReturnType<typeof deriveNames>} names */
function scaffoldBreadcrumbParentDefaults(names) {
  if (names.parts.length < 2) {
    return;
  }

  const defaultTemplate = path.join(templateDir, 'app-breadcrumbs/default.tsx.tpl');
  let accum = '';

  for (let i = 0; i < names.parts.length - 1; i++) {
    accum = accum ? `${accum}/${names.parts[i]}` : names.parts[i];
    const defaultPath = path.join(rootDir, 'app/(protected)/@breadcrumbs', accum, 'default.tsx');

    if (fs.existsSync(defaultPath)) {
      continue;
    }

    applyTemplate(defaultTemplate, defaultPath, names);
  }
}

/** @param {ReturnType<typeof deriveNames>} names */
function scaffold(names) {
  renderTree(path.join(templateDir, 'app-route'), path.join(rootDir, 'app/(protected)', names.routePath), names);
  renderTree(
    path.join(templateDir, 'app-breadcrumbs'),
    path.join(rootDir, 'app/(protected)/@breadcrumbs', names.routePath),
    names
  );
  scaffoldBreadcrumbParentDefaults(names);
  renderTree(path.join(templateDir, 'lib-api'), path.join(rootDir, 'lib/api', names.apiPath), names);
  renderTree(path.join(templateDir, 'lib-types'), path.join(rootDir, 'lib/types', names.singular), names);

  applyTemplate(
    path.join(templateDir, 'components-breadcrumbs/detail-breadcrumb.tsx.tpl'),
    path.join(rootDir, 'components/breadcrumbs', `${names.leaf}-detail-breadcrumb.tsx`),
    names
  );
  applyTemplate(
    path.join(templateDir, 'i18n/en.json.tpl'),
    path.join(rootDir, 'lib/i18n/locales/en', `${names.leaf}.json`),
    names
  );
  applyTemplate(
    path.join(templateDir, 'i18n/pt.json.tpl'),
    path.join(rootDir, 'lib/i18n/locales/pt', `${names.leaf}.json`),
    names
  );

  patchConfig(names);
}

/** @param {ReturnType<typeof deriveNames>} names */
function printSummary(names) {
  console.log('');
  console.log(`Route created: app/(protected)/${names.routePath}`);
  console.log('');
  console.log(`   app/(protected)/${names.routePath}/`);
  console.log(`   app/(protected)/@breadcrumbs/${names.routePath}/default.tsx`);
  console.log(`   app/(protected)/@breadcrumbs/${names.routePath}/[id]/default.tsx`);
  console.log(`   app/(protected)/@breadcrumbs/${names.routePath}/[id]/overview/page.tsx`);
  console.log(`   lib/api/${names.apiPath}/`);
  console.log(`   lib/types/${names.singular}/`);
  console.log(`   components/breadcrumbs/${names.leaf}-detail-breadcrumb.tsx`);
  console.log('');
  console.log(`   List page:  ${names.urlBase}`);
  console.log(`   Detail URL: ${names.urlBase}/{id}/overview`);
  console.log(`   i18n ns:    ${names.leaf}`);
  console.log('');
  console.log('   Extra detail tabs:');
  console.log(`     1. Add tab under app/(protected)/${names.routePath}/[id]/`);
  console.log(`     2. Mirror slot page at app/(protected)/@breadcrumbs/${names.routePath}/[id]/{tab}/page.tsx`);
  console.log(`     3. Update components/breadcrumbs/${names.leaf}-detail-breadcrumb.tsx tab map`);
  console.log('     Copy slot page from: scripts/new-route/templates/examples/breadcrumb-tab-page.tsx.tpl');
  console.log('');
}

const routeArg = process.argv[2];
if (!routeArg) {
  usage();
}

const names = deriveNames(routeArg);
assertTargetsAvailable(names);
scaffold(names);
printSummary(names);
