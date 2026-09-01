import { PermissionHandler } from '../permission-handler';
import { permissions } from '../permissions';

export class RolesPermissionHandler extends PermissionHandler {
  private static instance: RolesPermissionHandler;

  private constructor() {
    super();
  }

  public static getInstance() {
    return (this.instance ??= new RolesPermissionHandler());
  }

  canCreate() {
    return super.hasPermission(permissions.roles.create);
  }

  canDelete() {
    return super.hasPermission(permissions.roles.delete);
  }

  canRead() {
    return super.hasPermission(permissions.roles.read);
  }

  canReadDetails() {
    return super.hasPermission(permissions.roles.readDetails);
  }

  canUpdate() {
    return super.hasPermission(permissions.roles.update);
  }
}
