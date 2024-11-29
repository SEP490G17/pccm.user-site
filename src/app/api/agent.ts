import {
  BookingDetails,
  BookingHistoryModel,
  BookingModel,
  CourtPrice,
  IBookingByDay,
  IBookingModel,
  IBookingWithCombo,
  ISlots,
  PaymentType,
} from '../models/booking.model';
import { INews, INewsDto } from '../models/news.model';
import { IReview, ReviewsDto } from '../models/review.model';
import { ChangePasswordInput, LoginDto, RegisterDto, UpdateProfileDto } from '../models/account.model';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Service } from '../models/service.model';
import { Product } from '../models/product.model';
import { ICategory } from '../models/category.model';
import { Banner } from '../models/banner.model';
import { ICourtCluster } from '../models/courtcluster.model';
import { PaginationModel } from '../models/pagination.model';
import { Profile, User } from '../models/user.model';
import { router } from '../router/Routes';
import { sleep } from '../helper/utils';
import { store } from '../stores/store';
import { toast } from 'react-toastify';
import { ImageUpload } from '../models/upload.model';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    console.group('check axios');

    switch (status) {
      case 400:
        if (config.method === 'get' && data.errors.hasOwnProperty.call(data.errors, 'id')) {
          router.navigate('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          console.log(modalStateErrors);
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 403:
        toast.error('forbidden');
        break;
      case 404:
        console.log('error 404');
        router.navigate('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate('/server-error');
        break;
    }
    console.groupEnd();
    return Promise.reject(error);
  },
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Banners = {
  list: (): Promise<Banner[]> => requests.get(`/banner/usersite`),
};
const Categories = {
  list: (): Promise<ICategory[]> => requests.get(`/category`),
};
const Products = {
  list: (queryParams: string = ''): Promise<PaginationModel<Product>> =>
    requests.get(`/product/${queryParams}`),
};
const Services = {
  list: (queryParams: string = ''): Promise<PaginationModel<Service>> =>
    requests.get(`/service${queryParams}`),
};
const CourtClusters = {
   list: (queryParams: string = ''): Promise<PaginationModel<ICourtCluster>> => requests.get(`/CourtCluster/list-all-usersite/${queryParams}`),
  details: (id: string): Promise<ICourtCluster> => requests.get(`/CourtCluster/usersite/${id}`),
};

const News = {
  list: (): Promise<INews[]> => requests.get(`/News/usersite`),
  detail: (id: number): Promise<INewsDto> => requests.get(`/News/${id}`),
};

const Account = {
  current: () => requests.get<User>('/account'),
  register: (value: RegisterDto): Promise<void> => requests.post(`/account/register`, value),
  login: (value: LoginDto): Promise<User> => requests.post(`/account/login`, value),
  profile: (): Promise<Profile> => requests.get(`/account/profile`),
    updateProfile: (value: UpdateProfileDto): Promise<LoginDto> => requests.post(`/account/updateProfile`, value),
  changePassword: (value: ChangePasswordInput): Promise<void> => requests.post(`/Account/change-password`, value),
  forgotPassword: (email: string): Promise<void> =>
    requests.post(`/account/forgot-password`, { email }),
  confirmForgotPassword: (data: { token: string; newPassword: string }): Promise<void> =>
    requests.post('/account/confirm-forgot-password', data),
};

const Upload = {
  post: (file: FormData): Promise<ImageUpload> => requests.post(`/upload`, file),
};

const Booking = {
  slots: (data: ISlots): Promise<any> =>
    requests.get(
      `/Booking/available-slots?date=${data.date}&courtClusterId=${data.courtClusterId}`,
    ),
  create: (data: IBookingModel): Promise<any> => requests.post(`/booking`, data),
  priceCourt: (data: number): Promise<CourtPrice[]> =>
    requests.get(`/Booking/priceCourt?courtClusterId=${data}`),
  getListForSchedule: (body: object): Promise<BookingModel[]> => requests.post('/booking/v1', body),
  getHistoryBooking: (query: string = ''): Promise<PaginationModel<BookingHistoryModel>> =>
    requests.get('/booking/history' + query),
  getDetailsV1: (id: number): Promise<BookingDetails> => requests.get(`/booking/v1/${id}`),
  bookingWithCombo: (bookingWithCombo: IBookingWithCombo): Promise<any> =>
    requests.post(`/booking/combo`, bookingWithCombo),
  bookingByDay: (bookingByDay: IBookingByDay): Promise<any> =>
    requests.post(`/booking/byDay`, bookingByDay),

};

const PaymentAgent = {
  create: (type: PaymentType, id: number) =>
    requests.post<string>(`/payment/${type}/${id}/process-payment`, {}),
};

const Reviews = {
  listByCourtClusterId: (id: string): Promise<IReview[]> => requests.get(`/Review/${id}`),
  create: (data: ReviewsDto): Promise<IReview> => requests.post(`/Review`, data),
  delete: (id: number): Promise<any> => requests.del(`/Review/${id}`),
};

const agent = {
  requests,
  Banners,
  CourtClusters,
  News,
  Account,
  Upload,
  Booking,
  Reviews,
  PaymentAgent,
  Services,
  Products,
  Categories,
};

export default agent;
