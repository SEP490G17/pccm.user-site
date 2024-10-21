import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import CourtStore from "./courtStore";

interface Store {
  commonStore: CommonStore;
  courtStore: CourtStore;
}

export const store: Store = {
  commonStore : new CommonStore(),
  courtStore: new CourtStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
