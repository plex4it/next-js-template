'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import { SidebarLogo } from '@/components/sidebar/sidebar-logo';
import { redirect } from 'next/navigation';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  firstName: string;
  lastName: string;
  email: string;
}

export function AppSidebar({ firstName, lastName, email, ...props }: AppSidebarProps) {
  const handleLogout = () => {
    redirect('/api/auth/logout');
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser firstName={firstName} lastName={lastName} email={email} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
