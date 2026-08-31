import { RoleDetailBreadcrumb } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RoleUsersBreadcrumbsSlot({ params }: Props) {
  const { id } = await params;

  return <RoleDetailBreadcrumb id={id} tab="users" />;
}
