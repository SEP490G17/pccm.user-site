import { makeAutoObservable, runInAction } from 'mobx';
import { CourtPrice, IAvailableSlotModel, IBookingByDay, ISlots } from '../models/booking.model';
import agent from '../api/agent';
import { toast } from 'react-toastify';

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

  createBooking = async (value: IBookingByDay) => {
    this.loadingCreate = true;
    await runInAction(async () => {
      await agent.Booking.create(value)
        .then(() => toast.success('Tạo booking thành công'))
        .catch(() => toast.error('Tạo booking thất bại'))
        .finally(() => (this.loadingCreate = false));
    });
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
