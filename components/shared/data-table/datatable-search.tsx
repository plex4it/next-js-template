'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useDataTable } from './datatable-context';

interface DataTableSearchProps {
  placeholder?: string;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  className?: string;
}

export function DataTableSearch({
  placeholder = 'Search…',
  searchTerm,
  onSearchTermChange,
  className,
}: Readonly<DataTableSearchProps>) {
  const { table } = useDataTable();

  const isControlled = searchTerm !== undefined;
  const value = isControlled ? searchTerm : String(table.state.globalFilter ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      onSearchTermChange?.(e.target.value);
    } else {
      table.setGlobalFilter(e.target.value);
    }
  };

  return (
    <div className={cn('relative flex-1', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-9" placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
}
