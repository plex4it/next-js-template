export interface IUser {
  id: string;
  roles: string[];
  firstName: string;
  lastName: string;
  email: string;
  idp?: string;
  [key: string]: unknown;
}
