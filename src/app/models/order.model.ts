import { PaymentStatus } from './payment.model';

export interface OrderDetailOfBooking {
  bookingId: number;
  id?: number;
  paymentStatus?: PaymentStatus;
  orderForProducts: ProductForOrderDetails[];
  orderForServices: ServiceForOrderDetails[];
}

export interface ProductForOrderDetails {
  productId: number;
  quantity: number;
  productName: string;
  price: number;
  currPrice: number;
  totalPrice: number;
  currTotalPrice: number;
}

export interface ServiceForOrderDetails {
  serviceId: number;
  serviceName: string;
  price: number;
  currPrice: number;
  totalPrice?: number;
  currTotalPrice?: number;
}
