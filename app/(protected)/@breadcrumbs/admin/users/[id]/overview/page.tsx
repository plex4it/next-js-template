import { UserDetailBreadcrumb } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserOverviewBreadcrumbsSlot({ params }: Props) {
  const { id } = await params;

  return <UserDetailBreadcrumb id={id} tab="overview" />;
}
