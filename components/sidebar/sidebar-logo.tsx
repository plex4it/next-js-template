'use client';

import Link from 'next/link';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { CompanyLogo } from '@/components/sidebar/company-logo';

export function SidebarLogo() {
  const pathname = usePathname();
  return (
    <SidebarMenuButton
      size="lg"
      isActive={pathname === '/dashboard'}
      render={
        <Link href="/dashboard">
          <CompanyLogo />
        </Link>
      }
    />
  );
}
