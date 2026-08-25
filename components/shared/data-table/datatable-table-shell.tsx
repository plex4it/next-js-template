'use client';

import * as React from 'react';
import { flexRender } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useDataTable } from './datatable-context';
import { Button } from '@/components/ui/button';

interface DataTableTableShellProps {
  children?: React.ReactNode;
}

export function DataTableTableShell({ children }: Readonly<DataTableTableShellProps>) {
  const { table } = useDataTable();
  return (
    <Table style={{ width: table.getCenterTotalSize(), minWidth: '100%' }} className="table-fixed">
      {children}
    </Table>
  );
}

function SortIcon({ sorted }: Readonly<{ sorted: false | 'asc' | 'desc' }>) {
  if (sorted === 'asc') return <ArrowUpIcon className="ml-1.5 h-3.5 w-3.5 shrink-0" />;
  if (sorted === 'desc') return <ArrowDownIcon className="ml-1.5 h-3.5 w-3.5 shrink-0" />;
  return <ChevronsUpDownIcon className="ml-1.5 h-3.5 w-3.5 shrink-0 opacity-40" />;
}

export function DataTableTableHeader() {
  const { table } = useDataTable();

  return (
    <TableHeader>
      {table.getHeaderGroups().map((group) => (
        <TableRow key={group.id}>
          {group.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const canResize = header.column.getCanResize();

            const renderHeaderContent = () => {
              if (header.isPlaceholder) return null;
              const content = flexRender(header.column.columnDef.header, header.getContext());

              return (
                <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
                  <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-wider">
                    {content}
                  </span>
                  {canSort && (
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="shrink-0 transition-colors hover:text-foreground"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <SortIcon sorted={header.column.getIsSorted()} />
                    </Button>
                  )}
                </div>
              );
            };

            return (
              <TableHead key={header.id} style={{ width: header.getSize() }} className="relative">
                <div className="flex min-w-0 items-center">
                  {renderHeaderContent()}

                  {canResize && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-2 -translate-x-1/2 cursor-col-resize touch-none select-none hover:bg-primary/20 active:bg-primary/30"
                      aria-hidden
                    />
                  )}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export function DataTableTableBody() {
  const { table, isLoading, loadingRows, emptyMessage, onRowClick, getRowClassName } =
    useDataTable();

  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: loadingRows }).map((_, i) => (
          <TableRow key={i}>
            {table.getVisibleLeafColumns().map((col) => (
              <TableCell key={col.id}>
                <Skeleton className="h-10 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => (
          <TableRow
            key={row.id}
            className={cn(
              onRowClick && 'cursor-pointer transition-colors hover:bg-muted/50',
              getRowClassName?.(row.original)
            )}
            onClick={onRowClick ? () => onRowClick(row.original) : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{ width: cell.column.getSize() }}
                className="min-w-0 overflow-hidden"
              >
                <div className="flex justify-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getVisibleLeafColumns().length}
            className="h-24 text-center text-muted-foreground"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
