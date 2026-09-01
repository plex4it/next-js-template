interface Permissions {
  readDetails: string;
  read: string;
  create: string;
  update: string;
  delete: string;
}

interface Policies {
  roles: Permissions;
  users: Permissions;
}

export const permissions: Policies = {
  roles: {
    create: 'create:roles',
    delete: 'delete:roles',
    read: 'read:roles',
    readDetails: 'read-details:roles',
    update: 'update:roles',
  },
  users: {
    create: 'create:users',
    delete: 'delete:users',
    read: 'read:users',
    readDetails: 'read-details:users',
    update: 'update:users',
  },
};
