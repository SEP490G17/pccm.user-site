import { makeAutoObservable, runInAction } from 'mobx';
import { Banner } from '../models/banner.model';
import agent from '../api/agent';

export default class BannerStore {
  bannerRegistry = new Map<number, Banner>();
  bannerArray: Banner[] = [];
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadListBanner = async () => {
    this.setLoadingInitial(true);
    await runInAction(async () => {
      this.bannerArray = await agent.Banners.list();
      this.setLoadingInitial(false);
    });
  };

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };
}
