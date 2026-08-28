import { UserDetailBreadcrumb } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    id: string;
    tab: string;
  }>;
};

export default async function UserBreadcrumbsSlot({ params }: Props) {
  const { id, tab } = await params;

  return <UserDetailBreadcrumb id={id} tab={tab} />;
}
