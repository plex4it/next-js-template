'use client';

import * as React from 'react';
import type { ColumnVisibilityState, ReactTable } from '@tanstack/react-table';

import type { DataTableFeatures } from './datatable-features';

export interface CursorPaginationState {
  pageIndex: number;
  pageSize: number;
  cursorHistory: (unknown | null)[];
}

export interface CursorPaginationCallbacks {
  onNext: () => void;
  onPrev: () => void;
  onPageSizeChange: (size: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  totalCount?: number;
  totalPages?: number;
}

export type DataTableRowData = Record<string, unknown>;

export interface DataTableContextValue<TData extends DataTableRowData> {
  table: ReactTable<DataTableFeatures, TData>;
  columnVisibility: ColumnVisibilityState;
  emptyMessage: string;
  isLoading: boolean;
  loadingRows: number;
  onRowClick?: (row: TData) => void;
  getRowClassName?: (row: TData) => string | undefined;
  cursorPagination?: CursorPaginationCallbacks & {
    pageIndex: number;
    pageSize: number;
    totalCount?: number;
    totalPages?: number;
  };
}

export const DataTableContext = React.createContext<DataTableContextValue<DataTableRowData> | null>(
  null
);

export function useDataTable<TData extends DataTableRowData = DataTableRowData>() {
  const ctx = React.useContext(DataTableContext) as DataTableContextValue<TData> | null;
  if (!ctx) throw new Error('useDataTable must be used within a <DataTable>');
  return ctx;
}
