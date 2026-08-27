export type ListUserResponse = {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  [key: string]: unknown;
};
