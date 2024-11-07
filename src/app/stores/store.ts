import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import BannerStore from './bannerStore';
import NewsStore from './newsStore';
import AuthStore from './authStore';
import BookingHistoryStore from './bookinghistoryStore';
import courtClusterStore from './courtClusterStore';
import AccountStore from './accountStore';

interface Store {
  commonStore: CommonStore;
  courtClusterStore: courtClusterStore;
  bannerStore: BannerStore;
  newsStore: NewsStore;
  authStore: AuthStore;
  bookingHistoryStore: BookingHistoryStore;
  accountStore: AccountStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  courtClusterStore: new courtClusterStore(),
  bannerStore: new BannerStore(),
  newsStore: new NewsStore(),
  authStore: new AuthStore(),
  bookingHistoryStore: new BookingHistoryStore(),
  accountStore: new AccountStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
