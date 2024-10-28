import { BookingHistory } from '@/app/models/bookinghistory.models';


export const listBookingMock: BookingHistory[] = [
  {
    courtId: 1,
    startTime: '2024-10-15T14:00:00Z', 
    endTime: '2024-10-15T15:00:00Z', 
    duration: 60, 
    totalPrice: 100, 
    status: 'Đã xác nhận',
    paymentStatus: 'Đã thanh toán',
  },
  {
    courtId: 2,
    startTime: '2024-10-20T16:00:00Z',
    endTime: '2024-10-20T17:00:00Z',
    duration: 60,
    totalPrice: 120,
    status: 'Đang chờ', 
    paymentStatus: 'Chưa thanh toán',
  },
  {
    courtId: 3,
    startTime: '2024-11-05T10:00:00Z',
    endTime: '2024-11-05T11:00:00Z',
    duration: 60,
    totalPrice: 150,
    status: 'Đã hủy', 
    paymentStatus: 'Đã thanh toán',
  },
  {
    courtId: 1,
    startTime: '2024-11-10T18:00:00Z',
    endTime: '2024-11-10T19:00:00Z',
    duration: 60,
    totalPrice: 110,
    status: 'Đã xác nhận',
    paymentStatus: 'Chưa thanh toán',
  },
];
