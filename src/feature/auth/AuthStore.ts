import agent from '@/app/api/agent';
import { LoginDto } from '@/app/models/account.model';
import { User } from '@/app/models/user.model';
import { router } from '@/app/router/Routes';
import { store } from '@/app/stores/store';
import { makeAutoObservable, runInAction } from 'mobx';
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
      // if (this.rememberMe) {
        store.commonStore.setToken(user.token);
      // } else {
      //   store.commonStore.setTokenSession(user.token);
      // }
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