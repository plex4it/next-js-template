'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/shared/data-table';
import { UserAvatar } from '@/components/sidebar/user/user-avatar';
import { UnassignModal } from './unassign-modal';
import { IUser } from '@/lib/types/user/user';
import { TFunction } from 'i18next';

export function getRolesUsersDatatableColumns(
  roleId: string,
  t: TFunction<[string, string], undefined>
): ColumnDef<DataTableFeatures, IUser>[] {
  return [
    {
      id: 'user',
      enableSorting: false,
      enableHiding: false,
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      cell: ({ row }) => (
        <div className="flex-1 align-top flex text-left gap-2 min-w-0 max-w-full">
          <UserAvatar
            className="size-8"
            firstName={row.original.firstName}
            lastName={row.original.lastName}
            imageSrc=""
          />
          <div className="flex-1 flex flex-col text-left text-sm leading-tight gap-1">
            <span className="truncate font-semibold text-foreground">
              {`${row.original.firstName} ${row.original.lastName}`}
            </span>
            <span className="wrap-break-word whitespace-break-spaces text-xs text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'actions',
      header: t('common:actions'),
      enableHiding: false,
      enableSorting: false,
      size: 40,
      maxSize: 40,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <UnassignModal
              roleId={roleId}
              userId={row.original.id}
              firstName={row.original.firstName}
              lastName={row.original.lastName}
            />
          </div>
        );
      },
    },
  ];
}
