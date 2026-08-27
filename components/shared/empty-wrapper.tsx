'use client';

import { LucideIcon } from 'lucide-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import React from 'react';

interface EmptyWrapperProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function EmptyWrapper({
  description,
  icon,
  title,
  children,
}: Readonly<EmptyWrapperProps>) {
  const Icon = icon;

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="rounded-4xl">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}
