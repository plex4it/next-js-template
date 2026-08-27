'use server';

import { DetailsUserByIdResponse } from '@/lib/types/user/response/details-user-by-id-response';
import { api } from '@/lib/api/utils';

export default async function getUserDetails(id: bigint): Promise<DetailsUserByIdResponse> {
  const result = await api.get(`users/${id}`);

  if (!result.ok) {
    throw Error('An error occurred when retrieving details for the user');
  }

  const data = await result.json();

  return {
    id: data.id,
    status: data.status,
    updatedAt: data.updatedAt,
    updatedBy: data.updatedBy,
    email: data.email,
    externalId: data.externalId,
    firstName: data.firstName,
    lastName: data.lastName,
  };
}
