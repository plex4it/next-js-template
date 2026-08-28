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

import { groups } from './nav-main.data';

export function NavMain() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { t } = useT(['common', 'breadcrumbs']);

  return (
    <>
      {groups.map((group, index) => (
        <SidebarGroup key={group.titleKey ?? index}>
          {group.titleKey && <SidebarGroupLabel>{t(group.titleKey)}</SidebarGroupLabel>}
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {group.routes.map((route) => {
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
      ))}
    </>
  );
}
