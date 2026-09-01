import Edit{{ENTITY_PASCAL}}Modal from './_components/edit-{{LEAF}}-modal';
import { Details, DetailsContentEntry } from '@/components/shared/details';
import { Delete{{ENTITY_PASCAL}}Modal } from './_components/delete-{{LEAF}}-modal';
import get{{ENTITY_PASCAL}}Details from '@/lib/api/{{API_PATH}}/get-{{SINGULAR}}-details';
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

export default async function {{ENTITY_PASCAL}}OverviewPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { t } = await getT(['{{I18N_NS}}', 'common', 'fields']);
  const { id } = await params;

  let entityId: bigint;
  try {
    entityId = BigInt(id);
  } catch {
    notFound();
  }

  let entityDetails;
  try {
    entityDetails = await get{{ENTITY_PASCAL}}Details(entityId);
  } catch {
    notFound();
  }

  if (!entityDetails) {
    notFound();
  }

  return (
    <>
      <Details.Content>
        <Details.ContentHeader>
          <Details.ContentTitle title={t('{{I18N_NS}}:details_title')} />
          <Edit{{ENTITY_PASCAL}}Modal id={entityDetails.id} name={entityDetails.name} />
        </Details.ContentHeader>
        <Details.ContentBody className="space-y-7">
          <DetailsContentEntry label={t('fields:name')} value={entityDetails.name} />
          <DetailsContentEntry label={t('{{I18N_NS}}:created_at')} value={entityDetails.createdAt} />
          <DetailsContentEntry label={t('{{I18N_NS}}:created_by')} value={entityDetails.createdBy} />
        </Details.ContentBody>
      </Details.Content>

      <Details.Content>
        <Details.ContentHeader>
          <Details.ContentTitle title={t('common:danger_zone')} className="text-red-500" />
        </Details.ContentHeader>
        <Details.ContentBody className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{t('{{I18N_NS}}:details_delete_title')}</p>
            <p className="text-muted-foreground">{t('{{I18N_NS}}:details_delete_description')}</p>
          </div>
          <Delete{{ENTITY_PASCAL}}Modal name={entityDetails.name} id={entityDetails.id} />
        </Details.ContentBody>
      </Details.Content>
    </>
  );
}
