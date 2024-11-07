export class IBookingModel {
  phoneNumber: string = '';
  courtId: number = 0;
  courtClusterId: number = 0;
  startTime: string  = '';
  endTime: string = '';
  recurrenceRule: string = '';

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
