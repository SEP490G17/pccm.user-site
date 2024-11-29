import { makeAutoObservable, runInAction } from 'mobx';
import {
  ChangePasswordInput,
  ConfirmForgotPasswordDto,
  RegisterDto,
  UpdateProfileDto,
} from '../models/account.model';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { Profile } from '../models/user.model';
import { store } from './store';
import { catchErrorHandle } from '../helper/utils';

export default class AccountStore {
  loadingRegister: boolean = false;
  loadingUpdate: boolean = false;
  loadingProfile: boolean = false;
  loadingForgotPassword: boolean = false;
  loadingConfirmPassword: boolean = false;
  profileData: Profile | undefined = undefined;
  loadingChangePassword: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  register = async (value: RegisterDto) => {
    const [err, res] = await catchErrorHandle(agent.Account.register(value));
    return { err, res };
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

  forgotPassword = async (email: string) => {
    this.loadingForgotPassword = true;
    await agent.Account.forgotPassword(email)
      .then(() => toast.success('Email đặt lại mật khẩu đã được gửi'))
      .catch((error: any) => toast.error(error[0]))
      .finally(() => (this.loadingForgotPassword = false));
  };
  confirmForgotPassword = async (token: string, newPassword: string) => {
    this.loadingConfirmPassword = true;
    const data = new ConfirmForgotPasswordDto({ token, newPassword });
    await agent.Account.confirmForgotPassword(data)
      .then(() => toast.success('Mật khẩu đã được thay đổi thành công'))
      .catch((error: any) => toast.error(error[0]))
      .finally(() => (this.loadingConfirmPassword = false));
  };

  changePassword = async (value: ChangePasswordInput) => {
    this.loadingChangePassword = true;
    await agent.Account.changePassword(value)
      .then(() => toast.success('Thay đổi mật khẩu thành công'))
      .catch((error: any) => toast.error(error[0]))
      .finally(() => (this.loadingRegister = false));
  };
}
