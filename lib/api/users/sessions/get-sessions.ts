'use server';
import { Session } from '@/lib/types/session';
const sessions: Session[] = [
  {
    device: 'Firefox - Windows',
    location: 'Porto',
    lastAccess: 'July 3, 2026 at 10:51 AM',
    id: 1,
    deviceType: 'desktop',
  },
  {
    device: 'Firefox - Android',
    location: 'Porto',
    lastAccess: 'June 30, 2026 at 2:25 PM',
    id: 2,
    deviceType: 'mobile',
  },
  {
    device: 'Firefox - Windows',
    location: 'Porto',
    lastAccess: 'June 17, 2026 at 11:18 AM',
    id: 3,
    deviceType: 'desktop',
  },
  {
    device: 'Safari - IOS',
    location: 'Porto',
    lastAccess: 'June 26, 2026 at 12:22 PM',
    id: 4,
    deviceType: 'mobile',
  },
  {
    device: 'Firefox - Windows',
    location: 'Porto',
    lastAccess: 'June 23, 2026 at 5:43 PM',
    id: 5,
    deviceType: 'desktop',
  },
  {
    device: 'Firefox - Windows',
    location: 'Porto',
    lastAccess: 'June 26, 2026 at 11:33 AM',
    id: 6,
    deviceType: 'desktop',
  },
];

export default async function getSessions(userId: string) {
  void userId;
  return sessions;
}
