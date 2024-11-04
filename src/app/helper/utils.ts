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