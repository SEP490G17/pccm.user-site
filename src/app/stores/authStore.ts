import { makeAutoObservable } from 'mobx';
import { User } from '../models/user.model';
import { LoginDto } from '../models/account.model';
import agent from '../api/agent';

const SESSION_EXPIRATION_TIME = 3600 * 1000;

export default class AuthStore {
  userApp: User | null = null;
  rememberMe: boolean = false;
  loadingLogin: boolean = false;

  constructor() {
    makeAutoObservable(this);

    const savedUser = localStorage.getItem('userApp');
    if (savedUser) {
      const data = JSON.parse(savedUser);
      this.userApp = data.user;
    }
  }

  get isLoggedIn() {
    return !!this.userApp;
  }

  setRememberMe = () => {
    this.rememberMe = !this.rememberMe;
  };

  // Mock login function
  login = async (data: LoginDto) => {
    this.loadingLogin = true;
    this.userApp = await agent.Account.login(data).finally(() => (this.loadingLogin = false));

    if (this.userApp) {
      const sessionData = {
        user: this.userApp,
        expiration: Date.now() + SESSION_EXPIRATION_TIME,
      };
      localStorage.setItem('userApp', JSON.stringify(sessionData));
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
    this.clearUserFromLocalStorage();
  };
}
