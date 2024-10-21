export interface IBookingModel {
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  recurrenceRule: string;
  subject: string;
  description: string;
}
