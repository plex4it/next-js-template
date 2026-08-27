'use server';

import { DetailsRoleByIdResponse } from '@/lib/types/roles/response/details-role-by-id-response';
import { api } from '@/lib/api/utils';

export default async function getRoleDetails(id: bigint): Promise<DetailsRoleByIdResponse> {
  const result = await api.get(`roles/${id}`);

  if (!result.ok) {
    throw Error('An error occurred when retrieving details for the role');
  }

  const data = await result.json();

  return {
    description: data.description,
    id: data.id,
    externalId: data.externalId,
    lastUpdatedAt: data.lastUpdatedAt,
    lastUpdatedBy: data.lastUpdatedBy,
    name: data.name,
    assignedUsers: data.assignedUsers ?? [],
  };
}
