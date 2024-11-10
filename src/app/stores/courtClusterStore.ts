import { makeAutoObservable, runInAction } from 'mobx';
import { ICourtCluster } from '../models/courtcluster.model';
import agent from '../api/agent';
import { catchErrorHandle } from '../helper/utils';
import { toast } from 'react-toastify';
import { IReview, ReviewsDto } from '../models/review.model';

export default class courtClusterStore {
  listCourt: ICourtCluster[] = [];
  loadingInitial: boolean = false;
  listReviews: IReview[] = [];
  selectedCourtId: string | undefined;
  selectedCourt: ICourtCluster | undefined = undefined;
  loadingInitialDetailsPage: boolean = false;
  loadingReview: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadListCourt = async () => {
    this.setLoadingInitial(true);
    this.listCourt = await agent.CourtClusters.list();
    console.log(this.listCourt);
    await runInAction(async () => {
      this.setLoadingInitial(false);
    });
  };

  getDetailsCourtCluster = async (id: string) => {
    this.selectedCourtId = id;
    this.loadingInitialDetailsPage = true;
    const [error, response] = await catchErrorHandle<ICourtCluster>(
      agent.CourtClusters.details(this.selectedCourtId),
    );
    runInAction(() => {
      if (error) {
        toast.error('Tải thông tin cụm sân thất bại');
      } else {
        this.selectedCourt = response;
      }
      this.loadingInitialDetailsPage = false;
    });
  };

  getListReviewByCourtClusterId = async (id: string) => {
    this.loadingInitialDetailsPage = true;
    runInAction(async () => {
      await agent.Reviews.listByCourtClusterId(id)
        .then((data) => (this.listReviews = data))
        .catch(() => toast.error('Tải review thất bại'));
      this.loadingReview = false;
    });
  };

  createReviews = async (data: ReviewsDto) => {
    this.loadingReview = true;

    runInAction(async () => {
      await agent.Reviews.create(data)
        .then(() => toast.success('Thêm đánh giá thành công'))
        .catch(() => toast.error('Tạo review thất bại'));
      this.loadingReview = false;
    });
  };

  deleteReviews = async (data: number) => {
    this.loadingReview = true;

    runInAction(async () => {
      await agent.Reviews.delete(data)
        .then(() => toast.success('Xóa đánh giá thành công'))
        .catch(() => toast.error('Tạo review thất bại'));
      this.loadingReview = false;
    });
  };

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);
}
