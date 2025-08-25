export interface PaginationResponse<T> {
  data: {
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
    data: T[];
  };
}
