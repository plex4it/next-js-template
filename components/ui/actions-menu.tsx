'use client';

import * as React from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import {
  Modal,
  ModalAction,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void | Promise<void>;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  hasSeparator?: boolean;
  confirm?: {
    title: string;
    description: string;
    cancelLabel?: string;
  };
}

interface ActionsMenuProps {
  items: ActionItem[];
  label?: string;
}

export function ActionsMenu({ items, label }: Readonly<ActionsMenuProps>) {
  const [confirmItem, setConfirmItem] = React.useState<ActionItem | null>(null);
  const [pending, setPending] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile(1024);

  if (items.length === 0) return null;

  const handleConfirm = async () => {
    if (!confirmItem) return;
    setPending(true);
    try {
      await confirmItem.onSelect();
    } finally {
      setPending(false);
      setConfirmItem(null);
      setOpen(false);
    }
  };

  const icon = <MoreHorizontalIcon />;
  const triggerClassName = cn('size-8', buttonVariants({ variant: 'ghost', size: 'icon' }));

  return (
    <>
      {isMobile ? (
        <Drawer onOpenChange={setOpen} open={open}>
          <DrawerTrigger
            aria-label="Open actions menu"
            onClick={(e) => e.stopPropagation()}
            className={triggerClassName}
          >
            {icon}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerFooter className="pt-4 gap-2">
              {items.map((item) => (
                <React.Fragment key={`${item.label}-${item.variant ?? 'default'}`}>
                  <Button
                    disabled={item.disabled}
                    variant={item.variant === 'destructive' ? 'destructive' : 'default'}
                    onClick={() => {
                      setOpen(false);
                      if (item.confirm) {
                        setConfirmItem(item);
                      } else {
                        void item.onSelect();
                      }
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </React.Fragment>
              ))}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            aria-label="Open actions menu"
            onClick={(e) => e.stopPropagation()}
            className={triggerClassName}
          >
            {icon}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit" align="end">
            {label ? (
              <DropdownMenuGroup>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            ) : null}
            {items.map((item) => (
              <React.Fragment key={`${item.label}-${item.variant ?? 'default'}`}>
                <DropdownMenuItem
                  disabled={item.disabled}
                  className={
                    item.variant === 'destructive'
                      ? 'text-destructive focus:text-destructive bg-destructive/10'
                      : undefined
                  }
                  onClick={() => {
                    setOpen(false);
                    if (item.confirm) {
                      setConfirmItem(item);
                    } else {
                      void item.onSelect();
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>

                {item.hasSeparator && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {confirmItem?.confirm && (
        <Modal
          open={!!confirmItem}
          onOpenChange={(open) => {
            if (!open && !pending) {
              setConfirmItem(null);
              setOpen(false);
            }
          }}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle className="text-lg">{confirmItem.confirm.title}</ModalTitle>
              <ModalDescription>{confirmItem.confirm.description}</ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalAction
                onClick={handleConfirm}
                className="hover:bg-destructive/40"
                disabled={pending}
              >
                {pending ? '...' : confirmItem.label}
              </ModalAction>
              <ModalClose disabled={pending}>
                {confirmItem.confirm.cancelLabel ?? 'Cancel'}
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
