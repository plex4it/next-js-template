export interface Session {
  id: number;
  device: string;
  location: string;
  lastAccess: string;
  deviceType: 'desktop' | 'mobile';
}
