import { Product} from './../models/product.model';
import { makeAutoObservable, runInAction } from 'mobx';
import { ProductPageParams } from '../models/pageParams.model';
import { catchErrorHandle } from '../helper/utils';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { PaginationModel } from '@/app/models/pagination.model.ts';

export default class ProductStore {
  productRegistry = new Map<number, Product>();
  selectedIdProduct: number | undefined = undefined;
  loading: boolean = false;
  loadingLog: boolean = false;
  loadingCreate: boolean = false;
  productPageParams = new ProductPageParams();
  cleanupInterval: number | undefined = undefined;
  loadingInitial: boolean = false;
  loadingEdit: boolean = false;
  selectedCategory: number | undefined = undefined;
  constructor() {
    this.productPageParams.pageIndex = 1;
    makeAutoObservable(this);
    // this.cleanupInterval = window.setInterval(this.cleanProductCache, 30000);
  }

  //#region CRUD
  loadProducts = async () => {
    this.loading = true;
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.productPageParams.skip}`);
    queryParams.append('pageSize', `${this.productPageParams.pageSize}`);
    if (this.productPageParams.searchTerm) {
      queryParams.append('search', this.productPageParams.searchTerm);
    }
    if (this.productPageParams.courtCluster) {
      queryParams.append('courtCluster', `${this.productPageParams.courtCluster}`);
    }
    if (this.productPageParams.category) {
      queryParams.append('category', `${this.productPageParams.category}`);
    }

    const [error, res] = await catchErrorHandle<PaginationModel<Product>>(
      agent.Products.list(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (error) {
        console.error('Error loading products:', error);
        toast.error('Lấy danh sách sản phẩm thất bại');
      }
      if (res) {
        const { data, count } = res;
        data.forEach(this.setProduct);
        this.productPageParams.totalElement = count;
      }
      this.loading = false;
    });
  };

  filterByCategory = async (category: number) => {
    this.loading = true;
    this.productPageParams.clearLazyPage();
    this.productPageParams.category = category;
    this.cleanProductCache();
    await this.loadProducts();
    runInAction(() => (this.loading = false));
  };
  filterByCourtCluster = async (courtCluster: number) => {
    this.loading = true;
    this.productPageParams.clearLazyPage();
    this.productPageParams.courtCluster = courtCluster;
    this.cleanProductCache();
    await this.loadProducts();
    runInAction(() => (this.loading = false));
  };
  resetProductFilter() {
    this.selectedCategory = undefined;
    this.productPageParams.category = undefined; // Xóa bộ lọc category
    this.cleanProductCache(); // Xóa bộ nhớ cache
  }

  setProduct = (product: Product) => {
    this.productRegistry.set(product.id, product);
  };

  cleanProductCache = () => {
    this.productRegistry.clear();
  };

  dispose() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  //#endregion
}
