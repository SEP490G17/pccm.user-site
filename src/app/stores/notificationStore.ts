import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { NotificationUser } from '../models/noti.model';
import _ from 'lodash';
import { catchErrorHandle } from '../helper/utils';
import { PageParams } from '../models/pageParams.model';
export default class NotificationStore {
  notificationRegistry = new Map<number, NotificationUser>();
  loadingInitial: boolean = false;
  notificationPageParam = new PageParams();
  numOfUnRead = 0;
  constructor() {
    makeAutoObservable(this);
    this.notificationPageParam.pageSize = 10;
  }

  loadNotification = async () => {
    this.setLoadingInitial(true);
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.notificationPageParam.skip ?? 0}`);
    queryParams.append('pageSize', `${this.notificationPageParam.pageSize}`);
    const [, res] = await catchErrorHandle(
      agent.Notification.getList(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (res) {
        const { count, data, pageSize, numOfUnread } = res;
        data.forEach(this.setNotification);
        this.numOfUnRead = numOfUnread;
        this.notificationPageParam.totalElement = count;
        this.notificationPageParam.skip = this.notificationRegistry.size;
        this.notificationPageParam.pageSize = pageSize;
      }
    });
  };

  updateReadNotification = async (id: number) => {
    const noti = { ...this.notificationRegistry.get(id) };
    const [, res] = await catchErrorHandle(agent.Notification.updateState(id));
    runInAction(() => {
      if (res && noti) {
          noti.isRead = true;
          this.notificationRegistry.set(id, noti);
          this.numOfUnRead -= 1;
      }
    });
  };

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };

  get notificationArray() {
    return _.orderBy(Array.from(this.notificationRegistry.values()), ['id'], ['desc']);
  }

  setNotification = (noti: NotificationUser) => {
    console.log('check noti ', noti);
    this.notificationRegistry.set(noti.id, noti);
  };

  setNotificationRealTime = (noti: NotificationUser) => {
    this.setNotification(noti);
    this.numOfUnRead += 1;
  };
}
