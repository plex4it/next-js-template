'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/shared/data-table';
import { UserAvatar } from '@/components/sidebar/user/user-avatar';
import { ActionsMenu } from '@/components/ui/actions-menu';
import { getActionMenuItems } from './table-actions';
import Link from 'next/link';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';
import { TFunction } from 'i18next';
import { UsersPermissionHandler } from '@/lib/permissions/handlers/users-permission-handler';

export function getUserDatatableColumns(
  t: TFunction<[string, string], undefined>
): ColumnDef<DataTableFeatures, ListUserResponse>[] {
  const handler = UsersPermissionHandler.getInstance();

  const columns: ColumnDef<DataTableFeatures, ListUserResponse>[] = [
    {
      id: 'user',
      header: t('fields:user'),
      enableHiding: false,
      enableSorting: false,
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      cell: ({ row }) => {
        const user = row.original as ListUserResponse;

        return (
          <div className="flex-1 align-top flex text-left gap-2 min-w-0 max-w-full">
            <UserAvatar
              className="size-8"
              firstName={user.firstName}
              lastName={user.lastName}
              imageSrc=""
            />
            <div className="flex-1 align-top flex flex-col text-left gap-1 min-w-0 max-w-full">
              {handler.canReadDetails() ? (
                <Link
                  href={`/admin/users/${row.original.id}`}
                  className="truncate hover:underline font-semibold text-foreground"
                >{`${user.firstName} ${user.lastName}`}</Link>
              ) : (
                <p className="truncate font-semibold text-foreground">{`${user.firstName} ${user.lastName}`}</p>
              )}
              <span className="wrap-break-word whitespace-break-spaces text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  if (handler.canReadDetails() || handler.canDelete()) {
    columns.push({
      id: 'action',
      header: t('common:actions'),
      enableHiding: false,
      enableSorting: false,
      size: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <ActionsMenu
              items={getActionMenuItems(row.original, t, (href) => {
                window.location.assign(href);
              })}
            />
          </div>
        );
      },
    });
  }

  return columns;
}
