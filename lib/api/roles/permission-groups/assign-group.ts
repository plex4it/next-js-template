'use server';

import { api } from '@/lib/api/utils';

export default async function assignGroup(roleId: bigint, groupId: bigint) {
  return api.post(`roles/${roleId}/permission-groups/${groupId}`, {});
}
