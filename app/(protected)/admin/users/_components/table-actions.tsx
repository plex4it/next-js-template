'use client';

import { ActionItem, ActionsMenu } from '@/components/ui/actions-menu';
import deleteUser from '@/lib/api/users/delete-user';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TFunction } from 'i18next';

export function getActionMenuItems(
  user: ListUserResponse,
  t: TFunction<[string, string], undefined>,
  navigate: (href: string) => void
) {
  const onDelete = async () => {
    try {
      await deleteUser(user.id);
      toast.success(t('users:notify_deleted', { name: `${user.firstName} ${user.lastName}` }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('users:error_deleting'));
    }
  };

  const items: ActionItem[] = [
    {
      label: t('common:view'),
      icon: <EyeIcon className="size-4" />,
      onSelect: () => {
        navigate(`/admin/users/${user.id}`);
      },
    },
    {
      label: t('common:delete'),
      icon: <Trash2Icon className="size-4" />,
      variant: 'destructive',
      onSelect: async () => await onDelete(),
      confirm: {
        title: t('users:delete_modal_title'),
        description: t('users:delete_modal_description', {
          name: `${user.firstName} ${user.lastName}`,
        }),
      },
    },
  ];

  return items;
}

interface UserRowActionsProps {
  user: ListUserResponse;
  t: TFunction<[string, string], undefined>;
}

export function UserRowActions({ user, t }: Readonly<UserRowActionsProps>) {
  const router = useRouter();
  return <ActionsMenu items={getActionMenuItems(user, t, (href) => router.push(href))} />;
}
