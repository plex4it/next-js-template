'use client';

import { ActionItem, ActionsMenu } from '@/components/ui/actions-menu';
import deleteUser from '@/lib/api/users/delete-user';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TFunction } from 'i18next';
import { UsersPermissionHandler } from '@/lib/permissions/handlers/users-permission-handler';

export function getActionMenuItems(
  user: ListUserResponse,
  t: TFunction<[string, string], undefined>,
  navigate: (href: string) => void
) {
  const handler = UsersPermissionHandler.getInstance();
  const onDelete = async () => {
    const result = await deleteUser(user.id);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('users:notify_deleted', { name: `${user.firstName} ${user.lastName}` }));
    }
  };

  const items: ActionItem[] = [];

  if (handler.canReadDetails()) {
    items.push({
      label: t('common:view'),
      icon: <EyeIcon className="size-4" />,
      onSelect: () => {
        navigate(`/admin/users/${user.id}`);
      },
    });
  }

  if (handler.canDelete()) {
    items.push({
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
    });
  }

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
