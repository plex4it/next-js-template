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

import { groups } from './nav-main.data';

export function NavMain() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <>
      {groups.map((group, index) => (
        <SidebarGroup key={group.title ?? index}>
          {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {group.routes.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton
                    onClick={() => setOpenMobile(false)}
                    tooltip={route.title}
                    isActive={pathname === route.url || pathname.startsWith(`${route.url}/`)}
                    render={
                      <Link href={route.url}>
                        {route.icon && <route.icon className="h-4 w-4" />}
                        <span>{route.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
