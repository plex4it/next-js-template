'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/shared/data-table';
import Link from 'next/link';
import { ActionsMenu } from '@/components/ui/actions-menu';
import { getActionMenuItems } from './table-actions';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { TFunction } from 'i18next';
import { RolesPermissionHandler } from '@/lib/permissions/handlers/roles-permission-handler';

export function getRolesDatatableColumns(
  t: TFunction<[string, string], undefined>
): ColumnDef<DataTableFeatures, ListRolesResponse>[] {
  const handler = RolesPermissionHandler.getInstance();

  const columns: ColumnDef<DataTableFeatures, ListRolesResponse>[] = [
    {
      accessorKey: 'code',
      enableSorting: false,
      enableHiding: false,
      header: t('fields:role'),
      cell: ({ row }) => (
        <div className="flex-1 align-top flex flex-col text-left gap-1 min-w-0 max-w-full">
          {handler.canReadDetails() ? (
            <Link
              href={`/admin/roles/${row.original.id}`}
              className="truncate hover:underline font-semibold text-foreground"
            >
              {row.original.name}
            </Link>
          ) : (
            <p className="truncate font-semibold text-foreground">{row.original.name}</p>
          )}
          <div className="wrap-break-word whitespace-break-spaces text-xs text-muted-foreground">
            {row.original.description}
          </div>
        </div>
      ),
    },
  ];

  if (handler.canReadDetails() || handler.canDelete()) {
    columns.push({
      id: 'actions',
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
