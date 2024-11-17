import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { catchErrorHandle } from '@/app/helper/utils.ts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PaymentType } from '../models/booking.model';

dayjs.extend(utc);
dayjs.extend(timezone);

export default class PaymentStore {
  loadingPayment: boolean = false;
  paymentUrl: string = '';
  constructor() {
    makeAutoObservable(this);
  }
  getPayment = async (type: PaymentType, id: number) => {
    this.loadingPayment = true;
    const [err, res] = await catchErrorHandle(agent.PaymentAgent.create(type, id));
    
    runInAction(()=>{
      
    })
    return {err,res};
  };
}
