'use server';

import { LookupResponse } from '@/lib/types/lookup-response';
import { api } from '@/lib/api/utils';
import { permissions } from '@/lib/permissions/permissions';

export async function lookupRoles() {
  return api.get<LookupResponse[]>('roles/lookup', undefined, permissions.roles.read);
}
