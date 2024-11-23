import { makeAutoObservable } from 'mobx';
import { ICourtCluster } from '@/app/models/courtcluster.model';
import agent from '@/app/api/agent';
import { catchErrorHandle } from '@/app/helper/utils';

export default class CourtClusterListStore {
  listCourt: ICourtCluster[] = [];
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadListCourt = async () => {
    this.setLoadingInitial(true);
    const [err, res] = await catchErrorHandle(agent.CourtClusters.list());
    if (res) {
      this.listCourt = res;
    }
    this.setLoadingInitial(false);
    return { err, res };
  };

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);
}
