import { makeAutoObservable, runInAction } from "mobx";
import { listBookingMock } from "@/app/mocks/bookinghistory.mocks"; 
import { BookingHistory } from "../models/bookinghistory.models"; 

export default class BookingHistoryStore {
  listBooking: BookingHistory[] = []; 
  loadingInitial: boolean = false; 

  constructor() {
    makeAutoObservable(this);
  }

  loadListBooking = async () => { 
    this.setLoadingInitial(true); 
    this.listBooking = [...listBookingMock]; 
    await runInAction(async () => {
      this.setLoadingInitial(false); 
    });
  };

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad; 
  };
}
