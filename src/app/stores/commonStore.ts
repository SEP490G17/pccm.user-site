import { makeAutoObservable, reaction } from 'mobx';
import { ServeError } from '../models/serverError.model';
import { User } from '../models/user.model';

export default class CommonStore {
  error: ServeError | null = null;
  token: string | null = localStorage.getItem('jwt');
  appLoaded = false;
  isCollapsed = false;
  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem('jwt', token);
        } else {
          localStorage.removeItem('jwt');
        }
      },
    );
  }
  setServerError(err: ServeError) {
    this.error = err;
  }

  setToken = (token: string | null) => {
    if (token) localStorage.setItem('jwt', token);
    this.token = token;
  };
  setTokenSession = (token: string | null) => {
    if (token) sessionStorage.setItem('jwt', token);
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };

  setUserApp = (user: User) => {
    localStorage.setItem('fullName', user.displayName);
    localStorage.setItem('phoneNumber', user.phoneNumber);
  };

  getUserFullName = () => {
    return localStorage.getItem('fullName') || '';
  };

  getPhoneNumber = () => {
    return localStorage.getItem('phoneNumber') || '';
  };

  toggleSidebar = () => {
    this.isCollapsed = !this.isCollapsed;
  };
}
