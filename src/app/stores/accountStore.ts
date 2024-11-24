import { makeAutoObservable } from 'mobx';
import { RegisterDto, UpdateProfileDto } from '../models/account.model';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { Profile } from '../models/user.model';
import { store } from './store';

export default class AccountStore {
  loadingRegister: boolean = false;
  loadingUpdate: boolean = false;
  loadingProfile: boolean = false;
  profileData: Profile | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  register = async (value: RegisterDto) => {
    this.loadingRegister = true;
    await agent.Account.register(value)
      .then(() => toast.success('Tạo tài khoản thành công'))
      .catch((error: any) => toast.error(error[0]))
      .finally(() => (this.loadingRegister = false));
  };

  profile = async () => {
    this.loadingProfile = true;
    await agent.Account.profile()
      .then((data) => (this.profileData = data))
      .catch((error: any) => toast.error(error[0]))
      .finally(() => (this.loadingProfile = false));
  };

  updateProfile = async (data: UpdateProfileDto) => {
    this.loadingUpdate = true;
    await agent.Account.updateProfile(data)
      .then(() => store.authStore.getUser())
      .finally(() => (this.loadingUpdate = false));
  };
}
