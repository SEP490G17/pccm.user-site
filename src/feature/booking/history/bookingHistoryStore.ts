import agent from '@/app/api/agent';
import { catchErrorHandle } from '@/app/helper/utils';
import { BookingHistoryModel, BookingStatus } from '@/app/models/booking.model';
import { PageParams } from '@/app/models/pageParams.model';
import { makeAutoObservable, runInAction } from 'mobx';

export default class BookingHistoryStore {
  bookingHistoryAllRegistry = new Map<number, BookingHistoryModel>();
  loadingAllInitial: boolean = false;
  loadingAll: boolean = false;
  bookingAllPageParams = new PageParams();

  bookingHistoryPendingRegistry = new Map<number, BookingHistoryModel>();
  loadingPendingInitial: boolean = false;
  loadingPending: boolean = false;
  bookingPendingPageParams = new PageParams();

  bookingHistoryAcceptedRegistry = new Map<number, BookingHistoryModel>();
  loadingAcceptedInitial: boolean = false;
  loadingAccepted: boolean = false;
  bookingAcceptedPageParams = new PageParams();

  bookingHistoryDenyRegistry = new Map<number, BookingHistoryModel>();
  loadingDenyInitial: boolean = false;
  loadingDeny: boolean = false;
  bookingDenyPageParams = new PageParams();

  bookingHistoryCancelRegistry = new Map<number, BookingHistoryModel>();
  loadingCancelInitial: boolean = false;
  loadingCancel: boolean = false;
  bookingCancelPageParams = new PageParams();

  constructor() {
    makeAutoObservable(this);
  }

  loadListBookingAll = async () => {
    this.loadingAll = true;
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.bookingAllPageParams.skip}`);
    queryParams.append('pageSize', `${this.bookingAllPageParams.pageSize}`);

    const [err, res] = await catchErrorHandle(
      agent.Booking.getHistoryBooking(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (err) {
        console.error(err);
        return;
      }
      if (res) {
        this.bookingAllPageParams.totalElement = res.count;
        res.data.forEach(this.setBookingAll);
      }
      this.loadingAll = false;
    });
  };

  get listBookingAll() {
    return Array.from(this.bookingHistoryAllRegistry.values());
  }

  setBookingAll = (booking: BookingHistoryModel) => {
    this.bookingHistoryAllRegistry.set(booking.id, booking);
  };
  setLoadingAllInitial = (isLoad: boolean) => {
    this.loadingAllInitial = isLoad;
  };

  reloadAll= async () =>{
    this.setLoadingAllInitial(true);
    this.bookingAllPageParams.clearLazyPage();
    await this.loadListBookingAll();
    runInAction(()=>[
      this.setLoadingAllInitial(false)
    ])
  }
  //#region pending booking
  loadListBookingPending = async () => {
    this.loadingPending = true;
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.bookingPendingPageParams.skip}`);
    queryParams.append('pageSize', `${this.bookingPendingPageParams.pageSize}`);
    queryParams.append('bookingStatus', `${BookingStatus.Pending}`);
    const [err, res] = await catchErrorHandle(
      agent.Booking.getHistoryBooking(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (err) {
        console.error(err);
        return;
      }
      if (res) {
        this.bookingPendingPageParams.totalElement = res.count;
        res.data.forEach(this.setBookingPending);
      }
      this.loadingPending = false;
    });
  };

  get listBookingPending() {
    return Array.from(this.bookingHistoryPendingRegistry.values());
  }

  setBookingPending = (booking: BookingHistoryModel) => {
    this.bookingHistoryPendingRegistry.set(booking.id, booking);
  };
  setLoadingPendingInitial = (isLoad: boolean) => {
    this.loadingPendingInitial = isLoad;
  };
  reloadPending= async () =>{
    this.setLoadingPendingInitial(true);
    this.bookingPendingPageParams.clearLazyPage();
    await this.loadListBookingPending();
    runInAction(()=>[
      this.setLoadingPendingInitial(false)
    ])
  }
  //#endregion

  //#region accepted booking
  loadListBookingAccepted = async () => {
    this.loadingAccepted = true;
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.bookingAcceptedPageParams.skip}`);
    queryParams.append('pageSize', `${this.bookingAcceptedPageParams.pageSize}`);
    queryParams.append('bookingStatus', `${BookingStatus.Confirmed}`);
    const [err, res] = await catchErrorHandle(
      agent.Booking.getHistoryBooking(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (err) {
        console.error(err);
        return;
      }
      if (res) {
        this.bookingAcceptedPageParams.totalElement = res.count;
        res.data.forEach(this.setBookingAccepted);
      }
      this.loadingAccepted = false;
    });
  };

  get listBookingAccepted() {
    return Array.from(this.bookingHistoryAcceptedRegistry.values());
  }

  setBookingAccepted = (booking: BookingHistoryModel) => {
    this.bookingHistoryAcceptedRegistry.set(booking.id, booking);
  };
  setLoadingAcceptedInitial = (isLoad: boolean) => {
    this.loadingAcceptedInitial = isLoad;
  };

  reloadAccepted = async () =>{
    this.setLoadingAcceptedInitial(true);
    this.bookingAcceptedPageParams.clearLazyPage();
    await this.loadListBookingAccepted();
    runInAction(()=>[
      this.setLoadingAcceptedInitial(false)
    ])
  }

  //#endregion

  //#region deny booking
  loadListBookingDeny = async () => {
    this.loadingDeny = true;
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.bookingDenyPageParams.skip}`);
    queryParams.append('pageSize', `${this.bookingDenyPageParams.pageSize}`);
    queryParams.append('bookingStatus', `${BookingStatus.Declined}`);
    const [err, res] = await catchErrorHandle(
      agent.Booking.getHistoryBooking(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (err) {
        console.error(err);
        return;
      }
      if (res) {
        this.bookingDenyPageParams.totalElement = res.count;
        res.data.forEach(this.setBookingDeny);
      }
      this.loadingDeny = false;
    });
  };

  get listBookingDeny() {
    return Array.from(this.bookingHistoryDenyRegistry.values());
  }

  setBookingDeny = (booking: BookingHistoryModel) => {
    this.bookingHistoryDenyRegistry.set(booking.id, booking);
  };
  setLoadingDenyInitial = (isLoad: boolean) => {
    this.loadingDenyInitial = isLoad;
  };

  reloadDeny = async () =>{
    this.setLoadingDenyInitial(true);
    this.bookingDenyPageParams.clearLazyPage();
    await this.loadListBookingDeny();
    runInAction(()=>[
      this.setLoadingDenyInitial(false)
    ])
  }
  //#endregion

  //#region cancel booking
  loadListBookingCancel = async () => {
    this.loadingCancel = true;
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.bookingCancelPageParams.skip}`);
    queryParams.append('pageSize', `${this.bookingCancelPageParams.pageSize}`);
    queryParams.append('bookingStatus', `${BookingStatus.Cancelled}`);
    const [err, res] = await catchErrorHandle(
      agent.Booking.getHistoryBooking(`?${queryParams.toString()}`),
    );
    runInAction(() => {
      if (err) {
        console.error(err);
        return;
      }
      if (res) {
        this.bookingCancelPageParams.totalElement = res.count;
        res.data.forEach(this.setBookingCancel);
      }
      this.loadingCancel = false;
    });
  };

  get listBookingCancel() {
    return Array.from(this.bookingHistoryCancelRegistry.values());
  }

  setBookingCancel = (booking: BookingHistoryModel) => {
    this.bookingHistoryCancelRegistry.set(booking.id, booking);
  };
  setLoadingCancelInitial = (isLoad: boolean) => {
    this.loadingCancelInitial = isLoad;
  };

  reloadCancel = async () =>{
    this.setLoadingCancelInitial(true);
    this.bookingCancelPageParams.clearLazyPage();
    await this.loadListBookingCancel();
    runInAction(()=>[
      this.setLoadingCancelInitial(false)
    ])
  }
  //#endregion
}
