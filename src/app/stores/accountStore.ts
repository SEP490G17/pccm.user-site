import { makeAutoObservable } from 'mobx';
import { ChangePasswordInput, RegisterDto, UpdateProfileDto } from '../models/account.model';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { Profile } from '../models/user.model';
import { store } from './store';

export default class AccountStore {
  loadingRegister: boolean = false;
  loadingUpdate: boolean = false;
  loadingProfile: boolean = false;
  profileData: Profile | undefined = undefined;
  loadingChangePassword: boolean = false;

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

  changePassword = async (value: ChangePasswordInput) => {
    this.loadingChangePassword = true;
    await agent.Account.changePassword(value)
      .then(() => toast.success('Thay đổi mật khẩu thành công'))
      .catch((error: any) => toast.error(error[0]))
      .finally(() => (this.loadingRegister = false));
  };
}
