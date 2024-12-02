import { Service } from './../models/service.model';
import { makeAutoObservable, runInAction } from 'mobx';
import { PageParams } from '../models/pageParams.model';
import { catchErrorHandle } from '../helper/utils';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import _ from 'lodash';

export default class ServiceStore {
  serviceRegistry = new Map<number, Service>();
  selectedService: Service | undefined = undefined;
  loading: boolean = false;
  loadingInitial: boolean = false;
  isOrigin: boolean = true;
  servicePageParams = new PageParams();
  cleanupInterval: number | undefined = undefined;
  loadingEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
    // Uncomment this line if periodic cache cleaning is needed
    // this.cleanupInterval = window.setInterval(this.cleanServiceCache, 30000);
  }

  //#region CRUD
  loadServices = async () => {
    this.loading = true;
    const queryParams = new URLSearchParams();

    // Append common query parameters
    queryParams.append('skip', `${this.servicePageParams.skip ?? 0}`);
    queryParams.append('pageSize', `${this.servicePageParams.pageSize}`);
    if (this.servicePageParams.searchTerm) {
      queryParams.append('search', this.servicePageParams.searchTerm);
    }
    if (this.servicePageParams.filter) {
      // Ensure filter is properly formatted for API
      const courtClusterId =
        this.servicePageParams.filter.split('=')[1] || this.servicePageParams.filter;
      queryParams.append('Filter', courtClusterId);
    }

    console.log('Gọi API với URL:', `/Service?${queryParams.toString()}`);

    const [error, res] = await catchErrorHandle(agent.Services.list(`?${queryParams.toString()}`));
    runInAction(() => {
      if (error) {
        // console.error('Lỗi khi lấy dịch vụ:', error.response?.data || error.message);
        // toast.error(
        //   `Lấy danh sách dịch vụ thất bại: ${error.response?.data?.message || error.message}`,
        // );
        this.loading = false;
        return;
      }
      if (res) {
        const { count, data } = res;

        if (!Array.isArray(data)) {
          console.error('API trả về dữ liệu sai định dạng:', data);
          toast.error('Dữ liệu từ server không hợp lệ');
          this.loading = false;
          return;
        }

        data.forEach(this.setService);
        this.servicePageParams.totalElement = count;
      }
      this.loading = false;
    });
  };

  //#region Common operations
  setLoadingInitial = (load: boolean) => {
    this.loadingInitial = load;
  };

  setSearchTerm = async (term: string) => {
    this.loadingInitial = true;
    this.cleanServiceCache();
    this.servicePageParams.clearLazyPage();
    this.servicePageParams.searchTerm = term;

    await this.loadServices();
    runInAction(() => {
      this.loadingInitial = false;
    });
  };

  setFilterTerm = async (term: string) => {
    this.loadingInitial = true;
    this.cleanServiceCache();
    this.servicePageParams.clearLazyPage();
    this.servicePageParams.filter = term;

    await this.loadServices();
    runInAction(() => {
      this.loadingInitial = false;
    });
  };

  get serviceArray() {
    return _.orderBy(Array.from(this.serviceRegistry.values()), ['id'], ['desc']);
  }

  //#region Private methods
  setService = (service: Service) => {
    this.serviceRegistry.set(service.id, service);
  };

  cleanServiceCache = () => {
    runInAction(() => {
      this.serviceRegistry.clear();
    });
  };

  dispose() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
  //#endregion
}
