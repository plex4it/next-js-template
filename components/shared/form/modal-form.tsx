'use client';

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal';
import { PageAddAction } from '@/components/shared/pages-layout/pages-add-action';
import { Button, buttonVariants } from '@/components/ui/button';
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface ModalFormProps {
  form: React.ReactElement;
  trigger?: React.ReactElement;
  title: string | React.ReactElement;
  description?: string | React.ReactElement;
  triggerAriaLabel?: string;
}

export function ModalForm({
  form,
  trigger,
  title,
  description,
  triggerAriaLabel,
}: Readonly<ModalFormProps>) {
  const modalTrigger = trigger ?? <PageAddAction className="w-full" />;

  return (
    <Modal>
      <ModalTrigger render={modalTrigger} ariaLabel={triggerAriaLabel} />
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        {form}
      </ModalContent>
    </Modal>
  );
}

interface FormFooterProps {
  isProcessing: boolean;
  actionAriaLabel?: string;
  loadingLabel?: string;
  actionLabel?: string;
}

export function FormFooter({
  actionLabel = 'Add',
  isProcessing,
  loadingLabel = 'Processing',
  actionAriaLabel,
}: Readonly<FormFooterProps>) {
  return (
    <ModalFooter>
      <Button type="submit" aria-label={actionAriaLabel} disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Spinner className="size-4" />
            {loadingLabel}
          </>
        ) : (
          actionLabel
        )}
      </Button>
      <ModalClose disabled={isProcessing} className={buttonVariants({ variant: 'outline' })}>
        Cancel
      </ModalClose>
    </ModalFooter>
  );
}
