export class IBookingModel {
  totalPrice: number = 0;
  fullName: string = '';
  phoneNumber: string = '';
  courtId: number = 0;
  startTime: string = '';
  endTime: string = '';
  recurrenceRule: string = '';

  constructor(data?: Partial<IBookingModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class BookingHistoryModel {
  id: number = 0;
  courtName: string = '';
  courtClusterName: string = '';
  totalPrice: number = 0;
  startTime: string = '';
  status: BookingStatus = BookingStatus.Pending;
  endTime: string = '';
  paymentStatus: PaymentStatus = PaymentStatus.Pending;
  isSuccess: boolean = false;
  constructor(data?: Partial<BookingHistoryModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export interface BookingInfor {
  id: number;
  phoneNumber: string;
  fullName: string;
  courtName: string;
  courtClusterName?: string;
  playTime: string; // Thời gian bắt đầu đặt sân
  startDay: string;
  endDay: string;
  paymentStatus: number;
  paymentUrl?: string;
  status: number;
  isSuccess: boolean;
  totalPrice: number;
  RecurrenceRule?: string;
  recurrenceRule?: string;
  courtId: number;
  courtClusterId: number;
  address: string;
}

export interface BookingDetails {
  bookingDetails: BookingInfor;
  ordersOfBooking: OrderOfBooking[];
}

export interface BookingCreate {
  PhoneNumber: string;
  FullName: string;
  CourtId: number;
  StartTime: string; // Thời gian bắt đầu đặt sân
  EndTime: string; // Thời gian kết thúc đặt sân
  RecurrenceRule: string; // Thời lượng đặt sân
  UntilTime?: string;
}

export interface OrderOfBooking {
  id: number;
  createdAt: number;
  paymentStatus: PaymentStatus;
  isOpen: boolean;
  totalAmount: number;
}

export interface ProductsOfOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface ServicesOfOrder {
  serviceName: string;
  price: number;
  quantity: number;
}

export enum PaymentStatus {
  Cancel,
  Pending,
  Success,
  Failed,
}

export enum BookingStatus {
  Pending,
  Confirmed,
  Declined,
  Cancelled,
}

export enum PaymentType {
  Booking,
  Order,
}
export interface IAvailableSlotModel {
  id: number;
  name: string;
  availableSlots: string[];
}

export class ISlots {
  date: string = '';
  courtClusterId: number = 0;

  constructor(data?: Partial<ISlots>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export interface CourtPrice {
  courtId: number;
  courtName: string;
  time: string;
  price: number;
}

export interface BookingModel {
  id: number;
  phoneNumber: string;
  fullName: string;
  courtId: number;
  courtName: string;
  startTime: string; // Thời gian bắt đầu đặt sân
  endTime: string; // Thời gian kết thúc đặt sân
  RecurrenceRule: string; // Thời lượng đặt sân
  recurrenceRule?: string | undefined; // Th
  untilTime?: string;
  paymentStatus: number;
  paymentUrl?: string;
  status: number;
  isSuccess: boolean;
  totalPrice: number;
}

export interface IBookingWithCombo {
  comboId?: number;
  courtId?: number;
  fromDate: string;
  fromTime: string;
  toTime: string;
  fullName: string;
  phoneNumber: string;
}

export interface IBookingByDay {
  courtId?: number;
  fromDate: string;
  fromTime: string;
  toTime: string;
  fullName: string;
  phoneNumber: string;
}

export class BookingWithCombo implements IBookingWithCombo {
  comboId?: number;
  courtId?: number;
  fromDate: string = '';
  fromTime: string = '';
  toTime: string = '';
  fullName: string = '';
  phoneNumber: string = '';
}

export class BookingByDay implements IBookingByDay {
  courtId?: number ;
  fromDate: string = '';
  fromTime: string = '';
  toTime: string = '';
  fullName: string = '';
  phoneNumber: string = '';
}
