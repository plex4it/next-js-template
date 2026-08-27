import { Breadcrumbs } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    catchAll: string[];
  }>;
};

export default async function BreadcrumbsSlot({ params }: Props) {
  const { catchAll } = await params;

  return <Breadcrumbs routes={catchAll} />;
}
