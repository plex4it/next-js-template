'use client';

import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { LucideIcon } from 'lucide-react';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import EmptyWrapper from '@/components/shared/empty-wrapper';
import { Spinner } from '@/components/ui/spinner';
import { TableMobileCardLoading } from '@/components/shared/table/table-mobile-card-loading';
import { ErrorState } from '@/components/shared/error-state';
import { useT } from 'next-i18next/client';

interface TableMobileDataCardProps<T> {
  template: (item: T) => JSX.Element;
  getItems: (
    search: string | null,
    pageSize: number,
    cursor: string | null
  ) => Promise<CursorPaginatedList<T>>;
  emptyTitle: string;
  emptyIcon: LucideIcon;
  emptyDescription: string;
}

const PAGE_SIZE = 10;

export function TableMobileDataCard<T>({
  template,
  getItems,
  emptyDescription,
  emptyIcon,
  emptyTitle,
}: Readonly<TableMobileDataCardProps<T>>) {
  const { t } = useT('errors');
  const [page, setPage] = useState<CursorPaginatedList<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchPage = useCallback(
    async (
      cursor: string | null,
      pageSize: number,
      search: string | null,
      append = false,
      showLoading = true
    ) => {
      if (showLoading) setIsLoading(true);
      if (append) setIsFetchingMore(true);
      setError(null);
      try {
        const result = await getItems(search, pageSize, cursor);
        setPage((prev) => {
          return {
            items: append ? [...(prev?.items ?? []), ...result.items] : result.items,
            hasNextPage: result.hasNextPage,
            nextCursor: result.nextCursor,
          };
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : t('errors:error_loading'));
        setPage(null);
      } finally {
        if (showLoading) setIsLoading(false);
        if (append) setIsFetchingMore(false);
      }
    },
    [getItems, t]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPage(null, PAGE_SIZE, null, false);
  }, [fetchPage]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || isFetchingMore || !page?.hasNextPage || !page?.nextCursor) {
          return;
        }

        fetchPage(page.nextCursor, PAGE_SIZE, null, true, false);
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [page?.nextCursor, page?.hasNextPage, isFetchingMore, fetchPage]);

  if (error) {
    return (
      <ErrorState
        description={error}
        onRetry={() => fetchPage(page?.nextCursor ?? null, PAGE_SIZE, null)}
      />
    );
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <TableMobileCardLoading key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {page && page?.items.length > 0 ? (
        page.items.map((item, index) => (
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          <div key={(item as any)?.id ?? index}>{template(item)}</div>
        ))
      ) : (
        <EmptyWrapper description={emptyDescription} icon={emptyIcon} title={emptyTitle} />
      )}

      <div ref={loadMoreRef} className="h-1" />

      {isFetchingMore && (
        <div className="flex items-center justify-center">
          <Spinner className="size-12 text-primary" />
        </div>
      )}
    </>
  );
}
