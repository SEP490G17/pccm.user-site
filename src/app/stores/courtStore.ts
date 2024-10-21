import { makeAutoObservable, runInAction } from "mobx";;
import { listCourtMock } from "@/app/public/mocks/courtcluster.mocks";
import { ICourtCluster } from "../models/courtcluster.model";

export default class CourtStore {
  listCourt: ICourtCluster[] = [];
  loadingInitial: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  loadListCourt = async () => {
    this.setLoadingInitial(true);
    console.log("court");
    this.listCourt = [...listCourtMock];
    console.log(this.listCourt);
    await runInAction(async () => {
      this.setLoadingInitial(false);
    });
  };

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);
}
