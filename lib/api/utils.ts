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
  get: (path: string, data?: object) =>
    apiRequest(`${path}${data ? `?${createQueryString(data)}` : ''}`, 'GET'),
  post: (path: string, data?: object) => apiRequest(path, 'POST', data),
  put: (path: string, data?: object) => apiRequest(path, 'PUT', data),
  patch: (path: string, data?: object) => apiRequest(path, 'PATCH', data),
  delete: (path: string) => apiRequest(path, 'DELETE'),
};
