'use client';

import type { DataTableFeatures } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { {{ENTITY_PASCAL}}RowActions } from './table-actions';
import { List{{ENTITY_PASCAL}}Response } from '@/lib/types/{{SINGULAR}}/response/list-{{SINGULAR}}-response';
import { TFunction } from 'i18next';

export function get{{PASCAL}}DatatableColumns(
  t: TFunction<[string, string, string], undefined>
): ColumnDef<DataTableFeatures, List{{ENTITY_PASCAL}}Response>[] {
  return [
    {
      accessorKey: 'name',
      enableSorting: false,
      enableHiding: false,
      header: t('fields:name'),
      cell: ({ row }) => (
        <Link
          href={`{{URL_BASE}}/${row.original.id}`}
          className="truncate hover:underline font-semibold text-foreground"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      id: 'actions',
      header: t('common:actions'),
      enableHiding: false,
      enableSorting: false,
      size: 40,
      maxSize: 40,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <{{ENTITY_PASCAL}}RowActions item={row.original} t={t} />
        </div>
      ),
    },
  ];
}
