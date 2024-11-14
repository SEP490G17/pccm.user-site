export class IBookingModel {
  totalPrice: number = 0;
  fullName: string = '';
  phoneNumber: string = '';
  courtId: number = 0;
  startTime: string = '';
  endTime: string = '';

  constructor(data?: Partial<IBookingModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }
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
