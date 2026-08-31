'use client';

import ModalInfo from '@/components/shared/modal-info';
import delete{{ENTITY_PASCAL}} from '@/lib/api/{{API_PATH}}/delete-{{SINGULAR}}';
import { useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { toast } from 'sonner';

interface Delete{{ENTITY_PASCAL}}ModalProps {
  name: string;
  id: bigint;
}

export function Delete{{ENTITY_PASCAL}}Modal({ name, id }: Readonly<Delete{{ENTITY_PASCAL}}ModalProps>) {
  const { t } = useT(['{{I18N_NS}}', 'common']);
  const router = useRouter();

  const confirm = async () => {
    try {
      await delete{{ENTITY_PASCAL}}(id);
      toast.success(t('{{I18N_NS}}:notify_deleted', { name }));
      router.replace('{{URL_BASE}}');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('{{I18N_NS}}:error_deleting'));
    }
  };

  return (
    <ModalInfo
      title={t('{{I18N_NS}}:delete_modal_title')}
      description={t('{{I18N_NS}}:delete_modal_description', { name })}
      confirmClick={confirm}
      confirmLabel={t('common:delete')}
      triggerLabel={t('common:delete')}
    />
  );
}
