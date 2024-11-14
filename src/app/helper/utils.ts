import { dateFormatOptions } from './settings';

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const customFormatDate = (date: Date): string => {
  return date.toLocaleString('vi-VN', dateFormatOptions).trim();
};

export const catchErrorHandle = async <T>(promise: Promise<T>) : Promise<[undefined, T] | [Error]> => {
  return promise
      .then(data => {
          return [undefined, data] as [undefined, T]
      })
      .catch(error => {
          return [error]
      });
}

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