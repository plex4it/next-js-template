import { apiRequest } from './client';

function createQueryString(params: object): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    searchParams.set(key, String(value));
  }
  return searchParams.toString();
}

export const api = {
  get: <T>(path: string, data?: object, permission?: string) =>
    apiRequest<T>(
      `${path}${data ? `?${createQueryString(data)}` : ''}`,
      'GET',
      undefined,
      permission
    ),
  post: <T>(path: string, data?: object, permission?: string) =>
    apiRequest<T>(path, 'POST', data, permission),
  put: <T>(path: string, data?: object, permission?: string) =>
    apiRequest<T>(path, 'PUT', data, permission),
  patch: <T>(path: string, data?: object, permission?: string) =>
    apiRequest<T>(path, 'PATCH', data, permission),
  delete: <T>(path: string, permission?: string) =>
    apiRequest<T>(path, 'DELETE', undefined, permission),
};

export type { Result } from './client';
