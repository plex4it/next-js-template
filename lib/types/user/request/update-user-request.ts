export interface UpdateUserRequest {
  userId: bigint;
  firstName: string;
  lastName: string;
  status: boolean;
  roles: bigint[];
}
