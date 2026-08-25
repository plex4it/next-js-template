'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { BellIcon, UserIcon } from 'lucide-react';
import { UserAvatar } from '@/components/sidebar/user/user-avatar';

interface NavUserProps {
  firstName: string;
  lastName: string;
  email: string;
}

const Footer = React.forwardRef<
  HTMLButtonElement,
  Readonly<NavUserProps> & React.ComponentPropsWithoutRef<typeof SidebarMenuButton>
>(({ firstName, lastName, email, ...props }, ref) => {
  return (
    <SidebarMenuButton
      ref={ref}
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      {...props}
    >
      <UserAvatar className="h-8 w-8" firstName={firstName} lastName={lastName} />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{`${firstName} ${lastName}`}</span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </SidebarMenuButton>
  );
});

Footer.displayName = 'NavUserTrigger';

export function NavUser({ firstName, lastName, email }: Readonly<NavUserProps>) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Footer firstName={firstName} lastName={lastName} email={email} />}
          />
          <DropdownMenuContent
            className="min-w-56 rounded-lg bg-popover before:hidden"
            align="end"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <UserAvatar className="h-8 w-8" firstName={firstName} lastName={lastName} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{`${firstName} ${lastName}`}</span>
                    <span className="truncate text-xs text-muted-foreground">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenMobile(false)}
                render={
                  <Link href="/dashboard">
                    <UserIcon data-icon="inline-start" />
                    Account
                  </Link>
                }
              />
              <DropdownMenuItem
                onClick={() => setOpenMobile(false)}
                render={
                  <span>
                    <BellIcon data-icon="inline-start" />
                    Notifications
                  </span>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
