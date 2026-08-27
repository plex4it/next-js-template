'use client';

import { ActionItem, ActionsMenu } from '@/components/ui/actions-menu';
import deleteRole from '@/lib/api/roles/delete-role';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TFunction } from 'i18next';

export function getActionMenuItems(
  role: ListRolesResponse,
  t: TFunction<[string, string], undefined>,
  navigate: (href: string) => void
) {
  const onDelete = async () => {
    try {
      await deleteRole(role.id);
      toast.success(t('roles:notify_deleted', { name: role.name }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('roles:error_deleting'));
    }
  };

  const items: ActionItem[] = [
    {
      label: t('common:view'),
      icon: <EyeIcon className="size-4" />,
      onSelect: () => {
        navigate(`/admin/roles/${role.id}`);
      },
    },
    {
      label: t('common:delete'),
      icon: <Trash2Icon className="size-4" />,
      variant: 'destructive',
      onSelect: async () => await onDelete(),
      confirm: {
        title: t('roles:delete_modal_title'),
        description: t('roles:delete_modal_description', { name: role.name }),
      },
    },
  ];

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
