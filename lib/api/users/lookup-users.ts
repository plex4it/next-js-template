'use server';

import { permissions } from '@/lib/permissions/permissions';
import { api } from '@/lib/api/utils';
import { LookupResponse } from '@/lib/types/lookup-response';

export default async function lookupUsers() {
  return api.get<LookupResponse[]>('users/lookup', undefined, permissions.users.read);
}
