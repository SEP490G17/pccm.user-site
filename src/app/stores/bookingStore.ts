import { makeAutoObservable, runInAction } from 'mobx';
import { CourtPrice, IAvailableSlotModel, IBookingByDay, ISlots } from '../models/booking.model';
import agent from '../api/agent';
import { BookingMessage } from '../common/toastMessage/bookingMessage';
import { CreateToastFnReturn } from '@chakra-ui/react';
import { catchErrorHandle } from '../helper/utils';

export default class BookingStore {
  availableSlot: IAvailableSlotModel[] | null = [];
  courtPrice: CourtPrice[] | null = [];
  loadingInitial: boolean = false;
  loadingSlot: boolean = false;
  loadingCreate: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadSlots = async (values: ISlots) => {
    this.loadingSlot = true;
    await runInAction(async () => {
      const response = await agent.Booking.slots(values);
      this.availableSlot = response.availableSlots;
      this.loadingSlot = false;
    });
  };

  loadCourtPrice = async (value: number) => {
    this.loadingSlot = true;
    await runInAction(async () => {
      this.courtPrice = await agent.Booking.priceCourt(value);
      this.loadingSlot = false;
    });
  };

  createBooking = async (value: IBookingByDay, toast: CreateToastFnReturn) => {
    this.loadingCreate = true;
    const [err, res] = await catchErrorHandle(agent.Booking.create(value));
    runInAction(() => {
      if (err) {
        toast(BookingMessage.bookingFailure(err?.response?.data));
      }
      if (res) {
        toast(BookingMessage.bookingSuccess());
      }
      this.loadingCreate = false;
    });
    return { err, res };
  };

  loadListBooking = async () => {
    this.setLoadingInitial(true);

    await runInAction(async () => {
      this.setLoadingInitial(false);
    });
  };

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };
}
