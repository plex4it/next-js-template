'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { useT } from 'next-i18next/client';

import { PermissionHandler } from '@/lib/permissions/permission-handler';

import { groups } from './nav-main.data';

interface NavMainProps {
  userPermissions: string[];
}

export function NavMain({ userPermissions }: Readonly<NavMainProps>) {
  const pathname = usePathname();

  const { setOpenMobile } = useSidebar();

  const { t } = useT(['common', 'breadcrumbs']);

  PermissionHandler.setPermissions(userPermissions);

  return (
    <>
      {groups.map((group, index) => {
        const visibleRoutes = group.routes.filter(
          (route) => !route.permission || userPermissions.includes(route.permission)
        );

        if (visibleRoutes.length === 0) {
          return null;
        }

        return (
          <SidebarGroup key={group.titleKey ?? index}>
            {group.titleKey && <SidebarGroupLabel>{t(group.titleKey)}</SidebarGroupLabel>}

            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                {visibleRoutes.map((route) => {
                  const label = t(route.titleKey);

                  return (
                    <SidebarMenuItem key={route.titleKey}>
                      <SidebarMenuButton
                        onClick={() => setOpenMobile(false)}

                        tooltip={label}

                        isActive={pathname === route.url || pathname.startsWith(`${route.url}/`)}

                        render={
                          <Link href={route.url}>
                            {route.icon && <route.icon className="h-4 w-4" />}

                            <span>{label}</span>
                          </Link>
                        }
                      />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </>
  );
}
