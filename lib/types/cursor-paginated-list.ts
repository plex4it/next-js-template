export interface CursorPaginatedList<T> {
  items: T[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
