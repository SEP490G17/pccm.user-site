export interface IPageParams {
  pageIndex?: number;
  skip?: number;
  pageSize: number;
  totalPages?: number;
  totalElement: number;
  searchTerm?: string;
  sort?: string;
  filter?: string;
}

export class PageParams implements IPageParams {
  pageIndex?: number;
  skip?: number = 0;
  pageSize: number = 10;
  totalPages?: number;
  totalElement: number = 0;
  searchTerm?: string;
  sort?: string;
  filter?: string;
  fromDate?: string | null;
  toDate?: string | null;

  clearLazyPage = () => {
    this.totalElement = 0;
    this.skip = 0;
  };
}

export class PageListParams implements IPageParams {
  pageIndex?: number;
  skip?: number = 0;
  pageSize: number = 12;
  totalPages?: number;
  totalElement: number = 0;
  searchTerm?: string;
  sort?: string;
  filter?: string;
  fromDate?: string | null;
  toDate?: string | null;

  clearLazyPage = () => {
    this.totalElement = 0;
    this.skip = 0;
  };
}

export class ProductPageParams extends PageParams {
  courtCluster?: number;
  category?: number;
}
export class NewsPageParams extends PageParams {
  tagsList:string[] =[];
}
