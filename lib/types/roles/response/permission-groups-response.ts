export interface ListRolePermissionGroupsResponse {
  id: bigint;
  code: string;
  name: string;
  description?: string | null;
  isAssigned: boolean;
  isPartiallyAssigned: boolean;
  permissions: ListRolePermissionGroupPermissionResponse[];
}

export interface ListRolePermissionGroupPermissionResponse {
  id: bigint;
  code: string;
  name: string;
  description?: string | null;
  isAssigned: boolean;
}
