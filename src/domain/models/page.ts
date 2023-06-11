export class Page<T> {
  constructor(page: number, size: number, total: number, data: T[]) {
    this.page = page;
    this.size = size;
    this.total = total;
    this.data = data;
  }

  page: number;
  size: number;
  total: number;
  data: T[];
}
