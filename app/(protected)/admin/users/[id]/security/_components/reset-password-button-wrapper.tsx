'use client';

import { Button } from '@/components/ui/button';
import resetPassword from '@/lib/api/users/reset-password';
import { useT } from 'next-i18next/client';
import { toast } from 'sonner';

interface ResetPasswordButtonWrapper {
  id: string;
}

export function ResetPasswordButtonWrapper({ id }: Readonly<ResetPasswordButtonWrapper>) {
  const { t } = useT('users');
  const reset = async () => {
    await resetPassword(id);
    toast.success(t('users:notify_password_reset'));
  };

  return <Button onClick={reset}>{t('users:reset_password')}</Button>;
}
