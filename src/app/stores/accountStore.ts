import { makeAutoObservable } from 'mobx';
import { RegisterDto } from '../models/account.model';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export default class AccountStore {
  loadingRegister: boolean = false;
  profileData: any;

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
    this.profileData = await agent.Account.profile();
  };
}
