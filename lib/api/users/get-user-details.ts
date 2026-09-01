'use server';

import { DetailsUserByIdResponse } from '@/lib/types/user/response/details-user-by-id-response';
import { api } from '@/lib/api/utils';
import { permissions } from '@/lib/permissions/permissions';

export default async function getUserDetails(id: bigint) {
  return api.get<DetailsUserByIdResponse>(`users/${id}`, undefined, permissions.users.readDetails);
}
