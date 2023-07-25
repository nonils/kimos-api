export class Page<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;

  constructor(
    content: T[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
  ) {
    this.content = content;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalElements = totalElements;
    this.totalPages = Math.ceil(totalElements / pageSize);
  }
}
