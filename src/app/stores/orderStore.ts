import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { catchErrorHandle } from '../helper/utils';
import {
  OrderDetailOfBooking,
  ProductForOrderDetails,
  ServiceForOrderDetails,
} from '../models/order.model';

export default class OrderStore {
  loadingInitial: boolean = false;
  selectedOrder?: OrderDetailOfBooking;
  updateProductItems = new Map<number, ProductForOrderDetails>();
  updateServiceItems = new Map<number, ServiceForOrderDetails>();

  constructor() {
    makeAutoObservable(this);
  }

  getDetailsOrder = async (id: number) => {
    this.loadingInitial = true;
    const [err, res] = await catchErrorHandle(agent.Booking.orderDetailofBooking(id));
    runInAction(() => {
      if (err) {
        toast('Lấy chi tiết order thất bại');
      }
      if (res) {
        this.selectedOrder = res;
        res.orderForProducts.forEach((product) =>
          this.updateProductItems.set(product.productId, product),
        );
        res.orderForServices.forEach((service) =>
          this.updateServiceItems.set(service.serviceId, service),
        );
      }
      this.loadingInitial = false;
    });
  };

  loadOrder = async () => {
    this.setLoadingInitial(true);

    await runInAction(async () => {
      this.setLoadingInitial(false);
    });
  };

  setLoadingInitial = (isLoad: boolean) => {
    this.loadingInitial = isLoad;
  };
}
