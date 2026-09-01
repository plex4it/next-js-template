export interface DetailsUserByIdResponse {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  externalId: string;
  roles: string[];
  status: boolean;
  updatedAt: string;
  updatedBy: string;
}
