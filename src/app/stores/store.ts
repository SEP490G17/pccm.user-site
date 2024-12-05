import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import BannerStore from './bannerStore';
import NewsStore from './newsStore';
import AccountStore from './accountStore';
import UploadStore from './uploadStore';
import BookingStore from './bookingStore';
import CourtClusterListStore from '@/feature/courtcluster/list/CourtClusterListStore';
import AuthStore from '@/feature/auth/AuthStore';
import CourtClusterDetailsStore from '@/feature/courtcluster/details/CourtClusterDetailsStore';
import PaymentStore from './paymentStore';
import BookingHistoryStore from '@/feature/booking/history/bookingHistoryStore';
import BookingDetailsStore from '@/feature/booking/details/BookingDetailsStore';
import SignalRStore from './signalrStore';
import NotificationStore from './notificationStore';
import ProductStore from './productStore';
import ServiceStore from './serviceStore';
import CategoryStore from './categoryStore';
import OrderStore from './orderStore';

interface Store {
  commonStore: CommonStore;
  courtClusterStore: CourtClusterListStore;
  bannerStore: BannerStore;
  newsStore: NewsStore;
  authStore: AuthStore;
  bookingHistoryStore: BookingHistoryStore;
  accountStore: AccountStore;
  uploadStore: UploadStore;
  bookingStore: BookingStore;
  courtClusterDetailsStore: CourtClusterDetailsStore;
  paymentStore: PaymentStore;
  bookingDetailsStore: BookingDetailsStore;
  productStore: ProductStore;
  serviceStore: ServiceStore;
  categoryStore: CategoryStore;
  signalRStore:SignalRStore;
  notificationStore:NotificationStore;
  orderStore: OrderStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  courtClusterStore: new CourtClusterListStore(),
  bannerStore: new BannerStore(),
  newsStore: new NewsStore(),
  authStore: new AuthStore(),
  bookingHistoryStore: new BookingHistoryStore(),
  accountStore: new AccountStore(),
  uploadStore: new UploadStore(),
  bookingStore: new BookingStore(),
  courtClusterDetailsStore: new CourtClusterDetailsStore(),
  paymentStore: new PaymentStore(),
  bookingDetailsStore: new BookingDetailsStore(),
  productStore: new ProductStore(),
  serviceStore: new ServiceStore(),
  categoryStore: new CategoryStore(),  signalRStore: new SignalRStore(),
  notificationStore:new NotificationStore(),
  orderStore: new OrderStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
