'use client';

import * as React from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface PageActionsProps {
  className?: string;
  children: React.ReactNode;
}

export function PageActions({ className, children }: Readonly<PageActionsProps>) {
  return (
    <>
      <div className="md:hidden">
        <Drawer showSwipeHandle>
          <DrawerTrigger render={<Button variant="ghost" size="icon" aria-label="open menu" />}>
            <MoreHorizontalIcon />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Actions</DrawerTitle>
              <DrawerDescription>Choose an action</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              {React.Children.map(children, (child) => (child ? <div>{child}</div> : null))}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className={cn('hidden sm:flex sm:shrink-0 sm:items-center sm:gap-2', className)}>
        {children}
      </div>
    </>
  );
}
