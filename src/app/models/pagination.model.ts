export interface PaginationModel<T> {
  pageSize: number;
  count: number;
  data: T[];
}

export interface PaginationNoti<T> {
  pageSize: number;
  count: number;
  data: T[];
  numOfUnread: number;
}
