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
  courtClusterDetailsStore:CourtClusterDetailsStore;
  paymentStore:PaymentStore;
  bookingDetailsStore:BookingDetailsStore;
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

};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
