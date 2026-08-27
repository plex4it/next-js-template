import { Skeleton } from '@/components/ui/skeleton';

export function TableMobileCardLoading() {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
