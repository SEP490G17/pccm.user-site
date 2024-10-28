import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import CourtStore from "./courtStore";
import BannerStore from "./bannerStore";
import NewsStore from "./newsStore";
import AuthStore from "./authStore";
import BookingHistoryStore from "./bookinghistoryStore"

interface Store {
  commonStore: CommonStore;
  courtStore: CourtStore;
  bannerStore: BannerStore;
  newsStore: NewsStore;
  authStore: AuthStore;
  bookingHistoryStore: BookingHistoryStore;
}

export const store: Store = {
  commonStore : new CommonStore(),
  courtStore: new CourtStore(),
  bannerStore: new BannerStore(),
  newsStore: new NewsStore(),
  authStore: new AuthStore(),
  bookingHistoryStore : new BookingHistoryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
