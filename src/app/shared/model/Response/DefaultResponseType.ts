export class DefaultResponseType<T> {
  items: T[];
  pageNumber?: number;
  pageSize?: number;
  totalItemCount?: number;
  totalPages?: number;
  additionalItems?: number;
  code?: number;
  count?: number;
  message?: string;
  responseTime?: string;
}