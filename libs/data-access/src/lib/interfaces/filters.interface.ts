export interface IFilter {
  pageNumber: number;
  pageSize: number;
  sortField: string;
  sortDirection: 'ASC' | 'DESC';
}
