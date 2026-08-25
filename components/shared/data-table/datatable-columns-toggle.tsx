'use client';

import type { Column } from '@tanstack/react-table';
import { Columns3CogIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDataTable, type DataTableRowData } from './datatable-context';
import type { DataTableFeatures } from './datatable-features';

type DataTableColumn = Column<DataTableFeatures, DataTableRowData>;

export function DataTableColumnsToggle() {
  const { table } = useDataTable();
  const toggleableColumns = table
    .getAllLeafColumns()
    .filter((col: DataTableColumn) => col.getCanHide());

  if (!toggleableColumns.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-9 shrink-0"
            aria-label="Toggle columns"
          />
        }
      >
        <Columns3CogIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Columns</DropdownMenuLabel>
          {toggleableColumns.map((column: DataTableColumn) => {
            const columnLabel =
              typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id;
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnLabel}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
