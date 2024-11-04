import { makeAutoObservable, runInAction } from 'mobx';
import { ICourtCluster } from '../models/courtcluster.model';
import agent from '../api/agent';
import { catchErrorHandle } from '../helper/utils';
import { toast } from 'react-toastify';

export default class courtClusterStore {
  listCourt: ICourtCluster[] = [];
  loadingInitial: boolean = false;
  selectedCourtId: string | undefined;
  selectedCourt: ICourtCluster | undefined = undefined;
  loadingInitialDetailsPage: boolean = false;

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

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);
}
