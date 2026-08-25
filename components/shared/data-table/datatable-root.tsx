'use client';

import * as React from 'react';
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnVisibilityState,
  SortingState,
} from '@tanstack/react-table';
import { useTable } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

import {
  DataTableContext,
  type DataTableContextValue,
  type DataTableRowData,
} from './datatable-context';
import { dataTableFeatures, type DataTableFeatures } from './datatable-features';

import { DataTableHeaderSlot } from './datatable-header-slot';
import { DataTableContent } from './datatable-content';
import { DataTableSearch } from './datatable-search';
import { DataTableColumnsToggle } from './datatable-columns-toggle';
import {
  DataTableTableBody,
  DataTableTableShell,
  DataTableTableHeader,
} from './datatable-table-shell';
import {
  DataTableTotalCount,
  DataTableFooterSlot,
  DataTablePageSize,
  DataTablePagination,
} from './datatable-footer';

export interface DataTableProps<TData extends DataTableRowData, TValue = unknown> {
  columns: ColumnDef<DataTableFeatures, TData, TValue>[];
  data: TData[];
  children?: React.ReactNode;
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  loadingRows?: number;
  onRowClick?: (row: TData) => void;
  getRowClassName?: (row: TData) => string | undefined;

  cursorPagination?: {
    pageIndex: number;
    pageSize: number;
    totalCount?: number;
    totalPages?: number;
    hasNext: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
    onPageSizeChange: (size: number) => void;
  };

  manualSorting?: boolean;
  sorting?: SortingState;
  onSortingChange?: (updater: React.SetStateAction<SortingState>) => void;
}

function DataTableInner<TData extends DataTableRowData, TValue = unknown>({
  columns,
  data,
  children,
  className,
  emptyMessage = 'No results.',
  isLoading = false,
  loadingRows = 5,
  onRowClick,
  getRowClassName,
  cursorPagination,
  manualSorting = false,
  sorting: controlledSorting,
  onSortingChange: onSortingChangeProp,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const sorting = controlledSorting ?? internalSorting;
  const setSorting = onSortingChangeProp ?? setInternalSorting;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: columns as ColumnDef<DataTableFeatures, TData, unknown>[],
    state: { sorting, columnFilters, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    manualSorting: !!manualSorting,
    enableMultiSort: false,
    manualPagination: true,
    pageCount: -1,
  });

  const contextValue = React.useMemo<DataTableContextValue<TData>>(
    () => ({
      table,
      columnVisibility,
      emptyMessage,
      isLoading,
      loadingRows,
      onRowClick,
      getRowClassName,
      cursorPagination,
    }),
    [
      table,
      columnVisibility,
      emptyMessage,
      isLoading,
      loadingRows,
      onRowClick,
      getRowClassName,
      cursorPagination,
    ]
  );

  return (
    <DataTableContext.Provider value={contextValue as DataTableContextValue<DataTableRowData>}>
      <div className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}>{children}</div>
    </DataTableContext.Provider>
  );
}

type DataTableStatics = {
  Header: typeof DataTableHeaderSlot;
  Search: typeof DataTableSearch;
  ColumnsToggle: typeof DataTableColumnsToggle;
  Content: typeof DataTableContent;
  TableShell: typeof DataTableTableShell;
  TableHeader: typeof DataTableTableHeader;
  TableBody: typeof DataTableTableBody;
  Footer: typeof DataTableFooterSlot;
  TotalCount: typeof DataTableTotalCount;
  PageSize: typeof DataTablePageSize;
  Pagination: typeof DataTablePagination;
};

export const DataTable = Object.assign(DataTableInner, {
  Header: DataTableHeaderSlot,
  Search: DataTableSearch,
  ColumnsToggle: DataTableColumnsToggle,
  Content: DataTableContent,
  TableShell: DataTableTableShell,
  TableHeader: DataTableTableHeader,
  TableBody: DataTableTableBody,
  Footer: DataTableFooterSlot,
  TotalCount: DataTableTotalCount,
  PageSize: DataTablePageSize,
  Pagination: DataTablePagination,
} satisfies DataTableStatics) as typeof DataTableInner & DataTableStatics;
