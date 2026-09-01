export interface ListRoleUsersResponse {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  identityProvider: string;
  numberOfRoles: number;
  [key: string]: unknown;
}
