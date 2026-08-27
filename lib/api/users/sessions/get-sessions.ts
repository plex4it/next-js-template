'use server';

import { sessions } from '@/lib/test-data/sessions';

export default async function getSessions(userId: string) {
  void userId;
  return sessions;
}
