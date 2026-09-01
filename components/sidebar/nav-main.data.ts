import {
  LayoutDashboardIcon,
  LucideIcon,
  UsersRoundIcon,
  UserKeyIcon,
  StickyNoteIcon,
} from 'lucide-react';

interface NavRoute {
  titleKey: string;

  url: string;

  icon?: LucideIcon;

  permission?: string;
}

interface NavGroup {
  titleKey?: string;

  routes: NavRoute[];
}

export const groups: NavGroup[] = [
  {
    routes: [
      {
        titleKey: 'breadcrumbs:dashboard',

        url: '/dashboard',

        icon: LayoutDashboardIcon,
      },
    ],
  },

  {
    titleKey: 'breadcrumbs:pages',

    routes: [
      {
        titleKey: 'breadcrumbs:products',

        url: '/pages/products',

        icon: StickyNoteIcon,
      },
    ],
  },

  {
    titleKey: 'breadcrumbs:admin',

    routes: [
      {
        titleKey: 'breadcrumbs:users',

        url: '/admin/users',

        icon: UsersRoundIcon,

        permission: 'read:users',
      },

      {
        titleKey: 'breadcrumbs:roles',

        url: '/admin/roles',

        icon: UserKeyIcon,

        permission: 'read:roles',
      },
    ],
  },
];
