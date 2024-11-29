import agent from '@/app/api/agent';
import { BookingMessage } from '@/app/common/toastMessage/bookingMessage';
import { CommonMessage } from '@/app/common/toastMessage/commonMessage';
import { catchErrorHandle } from '@/app/helper/utils';
import { BookingDetails, BookingStatus } from '@/app/models/booking.model';
import { CreateToastFnReturn } from '@chakra-ui/react';
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

  cancelBooking = async (id: number, toast: CreateToastFnReturn) => {
    const pending = toast(CommonMessage.loadingMessage('Hủy lịch'));
    const [err, res] = await catchErrorHandle(agent.Booking.cancelBooking(id));
    runInAction(() => {
      toast.close(pending);
      if (err) {
        toast(BookingMessage.cancelFailure());
      }
      if (res) {
        toast(BookingMessage.cancelSuccess());
        if (this.selectedBooking) {
          this.selectedBooking.bookingDetails = {
            ...this.selectedBooking.bookingDetails,
            status: BookingStatus.Cancelled,
          };
        }
      }
    });
  };
}
