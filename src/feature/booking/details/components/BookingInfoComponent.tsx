import { observer } from 'mobx-react';
import { useStore } from '@/app/stores/store';
import { Button, Col, Row, Tag, Typography } from 'antd';

import dayjs from 'dayjs';
import OrdersOfBookingComponent from './BookingOrderListComponent';
import { BookingStatus, PaymentStatus } from '@/app/models/booking.model';
export const getPaymentStatusText = (status: number) => {
  switch (status) {
    case PaymentStatus.Pending:
      return 'Chờ thanh toán';
    case PaymentStatus.Failed:
      return 'Thanh toán thất bại';
    case PaymentStatus.Success:
      return 'Đã thanh toán';
    case PaymentStatus.Cancel:
      return 'Đã huỷ';
    default:
      return 'Không xác nhận';
  }
};

export const getPaymentStatusColor = (status: number) => {
  switch (status) {
    case PaymentStatus.Pending:
      return 'blue';
    case PaymentStatus.Failed:
      return 'red';
    case PaymentStatus.Success:
      return 'teal';
    case PaymentStatus.Cancel:
      return 'red';
  }
};

const BookingInfoComponent = observer(() => {
  const { bookingDetailsStore } = useStore();
  const { selectedBooking: booking } = bookingDetailsStore;
  if (!booking) {
    return;
  }
  const { bookingDetails, ordersOfBooking } = booking;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Typography.Text className="font-bold text-lg">Họ và tên:</Typography.Text>
            </Col>
            <Col span={16}>
              <Typography.Text className="text-lg">{bookingDetails.fullName}</Typography.Text>
            </Col>
            <Col span={8}>
              <Typography.Text className="font-bold text-lg">Số điện thoại:</Typography.Text>
            </Col>
            <Col span={16}>
              <Typography.Text className="text-lg">{bookingDetails.phoneNumber}</Typography.Text>
            </Col>
            <Col span={8}>
              <Typography.Text className="font-bold text-lg">Giờ thuê:</Typography.Text>
            </Col>
            <Col span={16}>
              <Typography.Text className="text-lg">{bookingDetails.playTime}</Typography.Text>
            </Col>
            <Col span={8}>
              <Typography.Text className="font-bold text-lg">Ngày bắt đầu:</Typography.Text>
            </Col>
            <Col span={16}>
              <Typography.Text className="text-lg">
                Ngày {dayjs(bookingDetails.startDay).add(7, 'hour').format('DD/MM/YYYY')}
              </Typography.Text>
            </Col>
            <Col span={8}>
              <Typography.Text className="font-bold text-lg">Ngày kết thúc:</Typography.Text>
            </Col>
            <Col span={16}>
              <Typography.Text className="text-lg">
                Ngày {dayjs(bookingDetails.endDay).add(7, 'hour').format('DD/MM/YYYY')}
              </Typography.Text>
            </Col>
            {bookingDetails.paymentStatus && (
              <>
                <Col span={8}>
                  <Typography.Text className="font-bold text-lg">
                    Trạng thái thanh toán:
                  </Typography.Text>
                </Col>
                <Col span={16}>
                  <Tag className='px-2 py-4' color={getPaymentStatusColor(bookingDetails.paymentStatus)}>
                    {getPaymentStatusText(bookingDetails.paymentStatus)}
                  </Tag>
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col span={12}>
          <OrdersOfBookingComponent orders={ordersOfBooking} />
        </Col>
        <Col span={24}>
          <div className="float-end flex gap-2">
            {!bookingDetails.isSuccess && (
              <Button className="text-base p-4 py-5 w-32" variant="solid" color="danger">
                Huỷ lịch
              </Button>
            )}
            {!(bookingDetails.paymentStatus === PaymentStatus.Success) &&
              bookingDetails.status === BookingStatus.Confirmed && (
                <Button className="text-base p-4 py-5 w-32" variant="solid" color="primary">
                  Thanh toán
                </Button>
              )}
          </div>
        </Col>
      </Row>
    </>
  );
});

export default BookingInfoComponent;
