'use client';

export abstract class PermissionHandler {
  abstract canCreate(): boolean;
  abstract canRead(): boolean;
  abstract canReadDetails(): boolean;
  abstract canDelete(): boolean;
  abstract canUpdate(): boolean;

  private static userPermissions: Set<string> = new Set();

  hasPermission(permission: string) {
    return PermissionHandler.userPermissions.has(permission);
  }

  static setPermissions(permissions: string[]) {
    PermissionHandler.userPermissions = new Set(permissions);
  }
}
