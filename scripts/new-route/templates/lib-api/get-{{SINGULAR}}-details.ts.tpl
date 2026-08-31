'use server';

import { Details{{ENTITY_PASCAL}}ByIdResponse } from '@/lib/types/{{SINGULAR}}/response/details-{{SINGULAR}}-by-id-response';
import { api } from '@/lib/api/utils';

export default async function get{{ENTITY_PASCAL}}Details(
  id: bigint
): Promise<Details{{ENTITY_PASCAL}}ByIdResponse> {
  const result = await api.get(`{{API_PATH}}/${id}`);

  if (!result.ok) {
    throw Error('An error occurred when retrieving details for the {{LABEL}}');
  }

  const data = await result.json();

  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
    createdBy: data.createdBy,
  };
}
