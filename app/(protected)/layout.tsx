import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { requireSession } from '@/lib/auth/session';

export default async function ProtectedLayout({
  children,
  breadcrumbs,
}: Readonly<{
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <SidebarProvider>
      <AppSidebar
        firstName={session.user.firstName}
        lastName={session.user.lastName}
        email={session.user.email}
      />
      <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {breadcrumbs}
        </header>
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
