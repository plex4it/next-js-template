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

const MOCK_USER = {
  firstName: 'Ricardo',
  lastName: 'Soares',
  email: 'ricardo.soares@plexit.pt',
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser
          firstName={MOCK_USER.firstName}
          lastName={MOCK_USER.lastName}
          email={MOCK_USER.email}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
