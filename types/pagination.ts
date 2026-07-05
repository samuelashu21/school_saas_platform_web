export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
 
export interface TableFilters {
  search?: string;

  page?: number;

  limit?: number;

  sortBy?: string;

  order?: "asc" | "desc";
} 