import agent from '@/app/api/agent';
import { catchErrorHandle } from '@/app/helper/utils';
import { BookingHistoryModel } from '@/app/models/booking.model';
import { makeAutoObservable, runInAction } from 'mobx';

export default class BookingHistoryStore {
  bookingHistoryRegistry = new Map<number, BookingHistoryModel>();
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadListBooking = async () => {
    this.loadingInitial = true;
    const [err, res] = await catchErrorHandle(agent.Booking.getHistoryBooking());
    runInAction(() => {
      if (err) {
        console.error(err);
        return;
      }
      if (res) {
        res.data.forEach(this.setBooking);
      }
      this.loadingInitial = false;
    });
  };

  get listBooking() {
    return Array.from(this.bookingHistoryRegistry.values());
  }

  setBooking = (booking: BookingHistoryModel) => {
    this.bookingHistoryRegistry.set(booking.id, booking);
  };
  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };
}
