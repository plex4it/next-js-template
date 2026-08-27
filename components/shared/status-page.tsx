'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import EmptyWrapper from '@/components/shared/empty-wrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StatusPageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function StatusPage({ icon, title, description, children }: Readonly<StatusPageProps>) {
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center p-6">
      <EmptyWrapper icon={icon} title={title} description={description}>
        {children}
      </EmptyWrapper>
    </div>
  );
}

interface StatusRetryButtonProps {
  label: string;
  onRetry: () => void;
}

export function StatusRetryButton({ label, onRetry }: Readonly<StatusRetryButtonProps>) {
  return (
    <Button variant="outline" size="sm" onClick={onRetry}>
      {label}
    </Button>
  );
}

interface StatusHomeLinkProps {
  label: string;
  href?: string;
  className?: string;
}

export function StatusHomeLink({ label, href = '/', className }: Readonly<StatusHomeLinkProps>) {
  return (
    <Link href={href} className={cn(buttonVariants({ size: 'sm' }), className)}>
      {label}
    </Link>
  );
}
