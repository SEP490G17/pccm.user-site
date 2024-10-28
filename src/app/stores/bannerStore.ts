import { makeAutoObservable, runInAction } from "mobx";
import { listBannerMock } from "@/app/mocks/banner.mocks";
import { Banner } from "../models/banner.model";

export default class BannerStore {
  listBanner: Banner[] = [];
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadListBanner = async () => {
    this.setLoadingInitial(true);
    this.listBanner = [...listBannerMock];
    await runInAction(async () => {
      this.setLoadingInitial(false);
    });
  };

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };
}
