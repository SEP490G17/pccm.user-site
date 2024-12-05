import { BookingStatus } from '../models/booking.model';
import { dateFormatOptions } from './settings';

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const customFormatDate = (date: Date): string => {
  return date.toLocaleString('vi-VN', dateFormatOptions).trim();
};

export const customFormatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};

export const catchErrorHandle = async <T>(
  promise: Promise<T>,
): Promise<[undefined, T] | [Error | any]> => {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      return [error];
    });
};
export const getBookingStatusColor = (status: number) => {
  switch (status) {
    case BookingStatus.Pending:
      return 'blue';
    case BookingStatus.Confirmed:
      return 'green';
    case BookingStatus.Declined:
      return 'red';
    case BookingStatus.Cancelled:
      return 'orange';
    default:
      return 'blackAlpha';
  }
};

export const getBookingStatusText = (status: number) => {
  switch (status) {
    case BookingStatus.Pending:
      return 'Chờ xác nhận';
    case BookingStatus.Confirmed:
      return 'Đã xác nhận';
    case BookingStatus.Declined:
      return 'Đang từ chối';
    case BookingStatus.Cancelled:
      return 'Đã huỷ';
    default:
      return 'Không xác nhận';
  }
};

export const toIsoString = (date: Date): string => {
  const tzo = -date.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  const pad = (num: number) => (num < 10 ? '0' : '') + num;

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  );
};

export function calculateTimeDifferenceInHours(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  const differenceInMinutes = endTotalMinutes - startTotalMinutes;

  const differenceInHours = differenceInMinutes / 60;

  return differenceInHours;
}
