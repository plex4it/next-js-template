'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/components/shared/data-table';
import Link from 'next/link';
import { RoleRowActions } from './table-actions';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { TFunction } from 'i18next';

export function getRolesDatatableColumns(
  t: TFunction<[string, string], undefined>
): ColumnDef<DataTableFeatures, ListRolesResponse>[] {
  return [
    {
      accessorKey: 'code',
      enableSorting: false,
      enableHiding: false,
      header: t('fields:role'),
      cell: ({ row }) => (
        <div className="flex-1 align-top flex flex-col text-left gap-1 min-w-0 max-w-full">
          <Link
            href={`/admin/roles/${row.original.id}`}
            className="truncate hover:underline font-semibold text-foreground"
          >
            {row.original.name}
          </Link>
          <div className="wrap-break-word whitespace-break-spaces text-xs text-muted-foreground">
            {row.original.description}
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
            <RoleRowActions role={row.original} t={t} />
          </div>
        );
      },
    },
  ];
}
