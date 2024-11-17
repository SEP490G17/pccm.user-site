import { makeAutoObservable, runInAction } from 'mobx';
import { ICourtCluster } from '@/app/models/courtcluster.model';
import agent from '@/app/api/agent';

export default class CourtClusterListStore {
  listCourt: ICourtCluster[] = [];
  loadingInitial: boolean = false;

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

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);
}
