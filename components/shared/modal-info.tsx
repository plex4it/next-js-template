'use client';

import { LucideIcon, Trash2Icon } from 'lucide-react';
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
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { toast } from 'sonner';
import { useT } from 'next-i18next/client';

interface ModalInfoProps {
  title: string;
  triggerIcon?: LucideIcon;
  triggerLabel: string;
  description?: string;
  confirmLabel: string;
  confirmClick?: () => Promise<void>;
  variant?: VariantProps<typeof buttonVariants>['variant'];
}

export default function ModalInfo({
  title,
  confirmClick,
  confirmLabel,
  variant = 'destructive',
  description,
  triggerIcon = Trash2Icon,
  triggerLabel,
}: Readonly<ModalInfoProps>) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useT(['errors', 'common']);

  const confirm = async () => {
    setIsProcessing(true);
    try {
      await confirmClick?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('errors:generic'));
    }
    setIsProcessing(false);
  };

  const TriggerIcon = triggerIcon;

  return (
    <Modal>
      <ModalTrigger className={buttonVariants({ variant: variant })}>
        {TriggerIcon && <TriggerIcon data-icon="inline-start" aria-hidden="true" />}
        {triggerLabel ? triggerLabel : <span className="sr-only">{title}</span>}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && (
            <ModalDescription className="wrap-break-word">{description}</ModalDescription>
          )}
        </ModalHeader>
        <ModalFooter>
          <Button disabled={isProcessing} variant={variant} onClick={confirm}>
            {isProcessing ? (
              <>
                <Spinner className="size-4" />
                {t('common:processing')}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
          <ModalClose className={buttonVariants({ variant: 'outline' })} disabled={isProcessing}>
            {t('common:close')}
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
