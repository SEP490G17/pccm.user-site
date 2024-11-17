import agent from '@/app/api/agent';
import { catchErrorHandle } from '@/app/helper/utils';
import { BookingDetails } from '@/app/models/booking.model';
import { makeAutoObservable, runInAction } from 'mobx';

export default class BookingDetailsStore {
  loadingInitial: boolean = false;
  selectedBooking?: BookingDetails;
  //   selectedBooking:
  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };
  getDetailsBooking = async (id: number) => {
    this.loadingInitial = true;
    const [, res] = await catchErrorHandle(agent.Booking.getDetailsV1(id));
    runInAction(() => {
      if (res) {
        this.selectedBooking = res;
      }
      this.loadingInitial = false;
    });
  };
}
