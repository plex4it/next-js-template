'use client';

import { ActionItem, ActionsMenu } from '@/components/ui/actions-menu';
import delete{{ENTITY_PASCAL}} from '@/lib/api/{{API_PATH}}/delete-{{SINGULAR}}';
import { List{{ENTITY_PASCAL}}Response } from '@/lib/types/{{SINGULAR}}/response/list-{{SINGULAR}}-response';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TFunction } from 'i18next';

export function getActionMenuItems(
  item: List{{ENTITY_PASCAL}}Response,
  t: TFunction<[string, string, string], undefined>,
  navigate: (href: string) => void
) {
  const onDelete = async () => {
    try {
      await delete{{ENTITY_PASCAL}}(item.id);
      toast.success(t('{{I18N_NS}}:notify_deleted', { name: item.name }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('{{I18N_NS}}:error_deleting'));
    }
  };

  const items: ActionItem[] = [
    {
      label: t('common:view'),
      icon: <EyeIcon className="size-4" />,
      onSelect: () => {
        navigate(`{{URL_BASE}}/${item.id}`);
      },
    },
    {
      label: t('common:delete'),
      icon: <Trash2Icon className="size-4" />,
      variant: 'destructive',
      onSelect: async () => await onDelete(),
      confirm: {
        title: t('{{I18N_NS}}:delete_modal_title'),
        description: t('{{I18N_NS}}:delete_modal_description', { name: item.name }),
      },
    },
  ];

  return items;
}

interface {{ENTITY_PASCAL}}RowActionsProps {
  item: List{{ENTITY_PASCAL}}Response;
  t: TFunction<[string, string, string], undefined>;
}

export function {{ENTITY_PASCAL}}RowActions({ item, t }: Readonly<{{ENTITY_PASCAL}}RowActionsProps>) {
  const router = useRouter();
  return <ActionsMenu items={getActionMenuItems(item, t, (href) => router.push(href))} />;
}
