'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDataTable } from './datatable-context';

interface DataTableFooterSlotProps {
  children?: React.ReactNode;
  className?: string;
}

export function DataTableFooterSlot({ children, className }: Readonly<DataTableFooterSlotProps>) {
  if (!children) return null;
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 px-1 py-3 sm:flex-row sm:justify-between',
        className
      )}
    >
      {children}
    </div>
  );
}

export function DataTableTotalCount() {
  const { table, cursorPagination } = useDataTable();
  const count = cursorPagination?.totalCount ?? table.getFilteredRowModel().rows.length;
  return (
    <p className="whitespace-nowrap text-sm text-muted-foreground">
      {count.toLocaleString()} Result
      {count === 1 ? '' : 's'}
    </p>
  );
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];

interface DataTablePageSizeProps {
  options?: number[];
  value?: number;
  onChange?: (size: number) => void;
}

export function DataTablePageSize({
  options = DEFAULT_PAGE_SIZE_OPTIONS,
  value: valueProp,
  onChange: onChangeProp,
}: Readonly<DataTablePageSizeProps>) {
  const { cursorPagination } = useDataTable();

  const value = valueProp ?? cursorPagination?.pageSize ?? DEFAULT_PAGE_SIZE_OPTIONS[1];
  const handleChange = onChangeProp ?? cursorPagination?.onPageSizeChange;

  if (!handleChange) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap text-sm font-medium">Page size</span>
      <Select value={String(value)} onValueChange={(v: string) => handleChange(Number(v))}>
        <SelectTrigger className="h-8 w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          {options.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function DataTablePagination() {
  const { cursorPagination } = useDataTable();

  if (!cursorPagination) return null;

  const { pageIndex, hasNext, hasPrev, onNext, onPrev } = cursorPagination;
  const currentPage = pageIndex + 1;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous"
        className="h-8 px-2 lg:px-3 hover:bg-muted"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <span className="min-w-8 text-center text-sm font-medium tabular-nums">{currentPage}</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next"
        className="h-8 px-2 lg:px-3 hover:bg-muted"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
