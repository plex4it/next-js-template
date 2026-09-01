export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  roles: bigint[];
}
