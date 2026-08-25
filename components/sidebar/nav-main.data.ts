import { LayoutDashboardIcon, LucideIcon, UsersRoundIcon, StickyNoteIcon } from 'lucide-react';

interface NavRoute {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface NavGroup {
  title?: string;
  routes: NavRoute[];
}

export const groups: NavGroup[] = [
  {
    routes: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    title: 'Pages',
    routes: [
      {
        title: 'Products',
        url: '/products',
        icon: StickyNoteIcon,
      },
    ],
  },
  {
    title: 'Administration',
    routes: [
      {
        title: 'Users',
        url: '/admin/users',
        icon: UsersRoundIcon,
      },
    ],
  },
];
