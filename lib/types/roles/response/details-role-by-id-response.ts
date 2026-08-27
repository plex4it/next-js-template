import { IUser } from '@/lib/types/user/user';

export interface DetailsRoleByIdResponse {
  id: bigint;
  name: string;
  description?: string;
  externalId: bigint;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  assignedUsers: IUser[];
}
