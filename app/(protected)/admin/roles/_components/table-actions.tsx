'use client';

import { ActionItem, ActionsMenu } from '@/components/ui/actions-menu';
import deleteRole from '@/lib/api/roles/delete-role';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TFunction } from 'i18next';
import { RolesPermissionHandler } from '@/lib/permissions/handlers/roles-permission-handler';

export function getActionMenuItems(
  role: ListRolesResponse,
  t: TFunction<[string, string], undefined>,
  navigate: (href: string) => void
) {
  const handler = RolesPermissionHandler.getInstance();
  const onDelete = async () => {
    const result = await deleteRole(role.id);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('roles:notify_deleted', { name: role.name }));
    }
  };

  const items: ActionItem[] = [];

  if (handler.canReadDetails()) {
    items.push({
      label: t('common:view'),
      icon: <EyeIcon className="size-4" />,
      onSelect: () => {
        navigate(`/admin/roles/${role.id}`);
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
        title: t('roles:delete_modal_title'),
        description: t('roles:delete_modal_description', { name: role.name }),
      },
    });
  }

  return items;
}

interface RoleRowActionsProps {
  role: ListRolesResponse;
  t: TFunction<[string, string], undefined>;
}

export function RoleRowActions({ role, t }: Readonly<RoleRowActionsProps>) {
  const router = useRouter();
  return <ActionsMenu items={getActionMenuItems(role, t, (href) => router.push(href))} />;
}
