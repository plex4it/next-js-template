import { redirect } from 'next/navigation';

export default async function {{ENTITY_PASCAL}}DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`{{URL_BASE}}/${id}/overview`);
}
