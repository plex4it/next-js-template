import { PermissionHandler } from '../permission-handler';
import { permissions } from '../permissions';

export class UsersPermissionHandler extends PermissionHandler {
  private static instance: UsersPermissionHandler;

  private constructor() {
    super();
  }

  public static getInstance() {
    return (this.instance ??= new UsersPermissionHandler());
  }

  canCreate() {
    return super.hasPermission(permissions.users.create);
  }

  canDelete() {
    return super.hasPermission(permissions.users.delete);
  }

  canRead() {
    return super.hasPermission(permissions.users.read);
  }

  canReadDetails() {
    return super.hasPermission(permissions.users.readDetails);
  }

  canUpdate() {
    return super.hasPermission(permissions.users.update);
  }
}
