import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '../models/user.model';
import { LoginDto } from '../models/account.model';
import agent from '../api/agent';
import { store } from './store';
import { router } from '../router/Routes';
export default class AuthStore {
  userApp: User | null = null;
  rememberMe: boolean = false;
  loadingLogin: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.userApp;
  }

  setRememberMe = () => {
    this.rememberMe = !this.rememberMe;
  };

  login = async (creds: LoginDto) => {
    try {
      const user = await agent.Account.login(creds);
      if (this.rememberMe) {
        store.commonStore.setToken(user.token);
      } else {
        store.commonStore.setTokenSession(user.token);
      }
      runInAction(() => {
        this.userApp = user;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  loadUserFromLocalStorage = () => {
    const savedSession = localStorage.getItem('userApp');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      if (sessionData.expiration > Date.now()) {
        this.userApp = sessionData.user;
      } else {
        this.clearUserFromLocalStorage();
      }
    }
  };

  clearUserFromLocalStorage = () => {
    localStorage.removeItem('userApp');
    this.userApp = null;
  };

  logout = () => {
    store.commonStore.setToken(null);
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
    this.userApp = null;
    router.navigate('/');
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.userApp = user));
    } catch (error) {
      console.log(error);
    }
  };
}
