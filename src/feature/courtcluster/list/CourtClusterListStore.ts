import { makeAutoObservable, runInAction } from 'mobx';
import { ICourtCluster } from '@/app/models/courtcluster.model';
import _ from 'lodash';
import agent from '@/app/api/agent';
import { catchErrorHandle, customFormatTime } from '@/app/helper/utils';
import { PageListParams } from '@/app/models/pageParams.model';
import { PaginationModel } from '@/app/models/pagination.model';
import { toast } from 'react-toastify';

export default class CourtClusterListStore {
  courtClusterRegistry = new Map<number, ICourtCluster>();
  courtClusterTopRegistry = new Map<number, ICourtCluster>();
  listCourt: ICourtCluster[] = [];
  listTopCourt: ICourtCluster[] = [];
  loadingInitial: boolean = false;
  loadingMore: boolean = false;
  loadingTopCourt: boolean = false;

  // page param
  courtPageParams = new PageListParams(); // page param cho trang cụm sân

  constructor() {
    makeAutoObservable(this);
  }

  loadListCourt = async () => {
    this.loadingMore = true;

    const queryParams = new URLSearchParams();

    queryParams.append('skip', `${this.courtPageParams.skip}`);
    queryParams.append('pageSize', `${this.courtPageParams.pageSize}`);

    const [error, response] = await catchErrorHandle<PaginationModel<ICourtCluster>>(
      agent.CourtClusters.list(`?${queryParams.toString()}`),
    );

    runInAction(() => {
      if (error) {
        toast.error('Tải danh sách cụm sân thất bại');
      }
      if (response) {
        const { count, data } = response;
        data.forEach(this.setCourtCluster);
        this.courtPageParams.totalElement = count;
      }
      this.loadingMore = false;
    });
  };

  filterListCourtCluster = async (filters: any = {}) => {
    this.loadingInitial = true;

    const queryParams = new URLSearchParams();
    this.courtClusterRegistry.clear();
    this.courtPageParams.clearLazyPage();
    // Các tham số phân trang mặc định
    queryParams.append('skip', `${this.courtPageParams.skip}`);
    queryParams.append('pageSize', `${this.courtPageParams.pageSize}`);

    if (filters.searchText) {
      queryParams.append('search', filters.searchText);
    }
    if (filters.province) {
      queryParams.append('province', filters.province);
    }
    if (filters.district) {
      queryParams.append('district', filters.district);
    }
    if (filters.ward) {
      queryParams.append('ward', filters.ward);
    }
    if (filters.rating) {
      queryParams.append('rating', filters.rating);
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      queryParams.append('minPrice', `${filters.minPrice}`);
      queryParams.append('maxPrice', `${filters.maxPrice}`);
    }

    // Gọi API với các tham số đã được tạo ra
    const [error, response] = await catchErrorHandle<PaginationModel<ICourtCluster>>(
      agent.CourtClusters.list(`?${queryParams.toString()}`),
    );

    runInAction(() => {
      if (error) {
        toast.error('Tải danh sách cụm sân thất bại');
      }
      if (response) {
        const { count, data } = response;
        data.forEach(this.setCourtCluster);
        this.courtPageParams.totalElement = count;
      }
      this.loadingInitial = false;
    });
  };

  loadListTopCourt = async () => {
    this.loadingTopCourt = true;

    const queryParams = new URLSearchParams();

    // Gọi API với các tham số đã được tạo ra
    const [error, response] = await catchErrorHandle<PaginationModel<ICourtCluster>>(
      agent.CourtClusters.listTop(`?${queryParams.toString()}`),
    );

    runInAction(() => {
      if (error) {
        toast.error('Tải danh sách cụm sân thất bại');
      }
      if (response) {
        const { count, data } = response;
        data.forEach(this.setCourtClusterTop);
        this.courtPageParams.totalElement = count;
      }
      this.loadingTopCourt = false;
    });
  };

  setCourtCluster = (court: ICourtCluster) => {
    court.openTime = customFormatTime(court.openTime);
    court.closeTime = customFormatTime(court.closeTime);
    this.courtClusterRegistry.set(court.id, court);
  };
  setCourtClusterTop = (court: ICourtCluster) => {
    court.openTime = customFormatTime(court.openTime);
    court.closeTime = customFormatTime(court.closeTime);
    this.courtClusterTopRegistry.set(court.id, court);
  };

  get courtClusterArray() {
    return _.orderBy(Array.from(this.courtClusterRegistry.values()), ['id'], ['asc']);
  }

  // Hàm trả về danh sách top courts
  get topCourtClusterArray() {
    return _.orderBy(Array.from(this.courtClusterTopRegistry.values()), ['id'], ['asc']);
  }

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);
}
