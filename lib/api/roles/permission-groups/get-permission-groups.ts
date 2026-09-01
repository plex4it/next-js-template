'use server';

import { api } from '@/lib/api/utils';
import { permissions } from '@/lib/permissions/permissions';
import { ListRolePermissionGroupsResponse } from '@/lib/types/roles/response/permission-groups-response';

export default async function getPermissionGroups(id: bigint) {
  return api.get<ListRolePermissionGroupsResponse[]>(
    `roles/${id}/permission-groups`,
    undefined,
    permissions.roles.readDetails
  );
}
