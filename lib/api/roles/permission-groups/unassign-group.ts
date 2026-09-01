'use server';

import { api } from '@/lib/api/utils';

export default async function unassignGroup(roleId: bigint, groupId: bigint) {
  return api.delete(`roles/${roleId}/permission-groups/${groupId}`);
}
