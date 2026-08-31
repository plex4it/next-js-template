import { {{ENTITY_PASCAL}}DetailBreadcrumb } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function {{PASCAL}}TabBreadcrumbsSlot({ params }: Props) {
  const { id } = await params;

  return <{{ENTITY_PASCAL}}DetailBreadcrumb id={id} tab="{{TAB}}" />;
}
