export interface ListQuery {
  cursor: string | null;
  page_size: number;
  search_term: string | null;
}
