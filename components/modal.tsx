'use client';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { JSX } from 'react/jsx-runtime';
import React, { createContext, useContext, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';

interface ModalContext {
  close: () => void;
}

const ModalContext = createContext<ModalContext | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal');
  }
  return context;
}

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

function Modal({ children, onOpenChange, open }: Readonly<ModalProps>) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isMobile = useIsMobile();

  const isControlled = open !== undefined;

  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  return (
    <ModalContext.Provider value={{ close: () => handleOpenChange(false) }}>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={handleOpenChange} showSwipeHandle>
          {children}
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          {children}
        </Dialog>
      )}
    </ModalContext.Provider>
  );
}

interface ModalTriggerProps {
  render?: JSX.Element;
  nativeButton?: boolean;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

function ModalTrigger({
  render,
  nativeButton = true,
  children,
  className,
  ariaLabel,
}: Readonly<ModalTriggerProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerTrigger
          aria-label={ariaLabel}
          className={className}
          nativeButton={nativeButton}
          render={render}
        >
          {children}
        </DrawerTrigger>
      ) : (
        <DialogTrigger
          aria-label={ariaLabel}
          className={className}
          nativeButton={nativeButton}
          render={render}
        >
          {children}
        </DialogTrigger>
      )}
    </>
  );
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function ModalHeader({ children, className }: Readonly<ModalHeaderProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerHeader className={className}>{children}</DrawerHeader>
      ) : (
        <DialogHeader className={className}>{children}</DialogHeader>
      )}
    </>
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

function ModalContent({ children, className }: Readonly<ModalContentProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerContent className={className}>{children}</DrawerContent>
      ) : (
        <DialogContent className={cn('flex max-h-[90vh] flex-col', className)}>
          {children}
        </DialogContent>
      )}
    </>
  );
}

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

function ModalTitle({ children, className }: Readonly<ModalTitleProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerTitle className={className}>{children}</DrawerTitle>
      ) : (
        <DialogTitle className={className}>{children}</DialogTitle>
      )}
    </>
  );
}

interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function ModalDescription({ children, className }: Readonly<ModalDescriptionProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerDescription className={className}>{children}</DrawerDescription>
      ) : (
        <DialogDescription className={className}>{children}</DialogDescription>
      )}
    </>
  );
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

function ModalFooter({ children, className }: Readonly<ModalFooterProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerFooter className={cn('pt-4 gap-2', className)}>{children}</DrawerFooter>
      ) : (
        <DialogFooter className={cn('pt-4', className)}>{children}</DialogFooter>
      )}
    </>
  );
}

interface ModalCloseProps {
  render?: JSX.Element;
  nativeButton?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

function ModalClose({
  render,
  nativeButton = true,
  children,
  className,
  disabled = false,
  ariaLabel,
}: Readonly<ModalCloseProps>) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <DrawerClose
          aria-label={ariaLabel}
          className={className}
          nativeButton={nativeButton}
          render={render}
          disabled={disabled}
        >
          {children}
        </DrawerClose>
      ) : (
        <DialogClose
          aria-label={ariaLabel}
          className={className}
          nativeButton={nativeButton}
          render={render}
          disabled={disabled}
        >
          {children}
        </DialogClose>
      )}
    </>
  );
}

interface ModalActionProps {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function ModalAction({
  children,
  className,
  onClick,
  disabled = false,
  ariaLabel,
}: Readonly<ModalActionProps>) {
  const modal = useModal();

  const click = () => {
    onClick();
    modal.close();
  };

  return (
    <Button className={className} onClick={click} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </Button>
  );
}

export {
  useModal,
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalAction,
};
