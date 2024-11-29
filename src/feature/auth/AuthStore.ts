import agent from '@/app/api/agent';
import { catchErrorHandle } from '@/app/helper/utils';
import { LoginDto } from '@/app/models/account.model';
import { User } from '@/app/models/user.model';
import { router } from '@/app/router/Routes';
import { store } from '@/app/stores/store';
import { makeAutoObservable, runInAction } from 'mobx';
export default class AuthStore {
  userApp: User | null = null;
  rememberMe: boolean = false;
  loadingLogin: boolean = false;
  visible: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn(): boolean {
    return (
      localStorage.getItem('jwt') !== null &&
      localStorage.getItem('jwt') !== undefined &&
      localStorage.getItem('jwt') !== ''
    );
  }

  setVisible = (value: boolean) => {
    this.visible = value;
  };

  setRememberMe = () => {
    this.rememberMe = !this.rememberMe;
  };

  login = async (creds: LoginDto) => {
    const [err, res] = await catchErrorHandle(agent.Account.login(creds));
    runInAction(() => {
      if (res) {
        store.commonStore.setToken(res.token);
        store.commonStore.setUserApp(res);
        this.userApp = res;
      }
    });
    return {err,res}
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
    localStorage.clear();
    sessionStorage.clear();
    this.userApp = null;
    store.signalRStore.stopHubConnection();
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
