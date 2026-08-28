import { RoleDetailBreadcrumb } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    id: string;
    tab: string;
  }>;
};

export default async function RoleBreadcrumbsSlot({ params }: Props) {
  const { id, tab } = await params;

  return <RoleDetailBreadcrumb id={id} tab={tab} />;
}
