import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import BannerStore from './bannerStore';
import NewsStore from './newsStore';
import AuthStore from './authStore';
import BookingHistoryStore from './bookinghistoryStore';
import courtClusterStore from './courtClusterStore';

interface Store {
  commonStore: CommonStore;
  courtClusterStore: courtClusterStore;
  bannerStore: BannerStore;
  newsStore: NewsStore;
  authStore: AuthStore;
  bookingHistoryStore: BookingHistoryStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  courtClusterStore: new courtClusterStore(),
  bannerStore: new BannerStore(),
  newsStore: new NewsStore(),
  authStore: new AuthStore(),
  bookingHistoryStore: new BookingHistoryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
