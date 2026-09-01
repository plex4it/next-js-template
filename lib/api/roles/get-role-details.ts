'use server';

import { DetailsRoleByIdResponse } from '@/lib/types/roles/response/details-role-by-id-response';
import { api } from '@/lib/api/utils';
import { permissions } from '@/lib/permissions/permissions';

export default async function getRoleDetails(id: bigint) {
  return api.get<DetailsRoleByIdResponse>(`roles/${id}`, undefined, permissions.roles.readDetails);
}
