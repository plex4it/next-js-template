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
import { useRouter } from 'next/navigation';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  firstName: string;
  lastName: string;
  email: string;
  userPermissions: string[];
}

export function AppSidebar({
  firstName,
  lastName,
  email,
  userPermissions,
  ...props
}: AppSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/api/auth/logout');
    return;
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
        <NavMain userPermissions={userPermissions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser firstName={firstName} lastName={lastName} email={email} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
