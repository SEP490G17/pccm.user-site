import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import { Button, Col, Row, Tag, Typography } from 'antd';

import dayjs from 'dayjs';
import OrdersOfBookingComponent from './BookingOrderListComponent';
import { BookingStatus, PaymentStatus, PaymentType } from '@/app/models/booking.model';
import { useToast } from '@chakra-ui/react';
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
  const { bookingDetailsStore, paymentStore } = useStore();
  const { selectedBooking } = bookingDetailsStore;
  const { getPayment } = paymentStore;

  if (!selectedBooking) {
    return;
  }
  const handlerPayment = async () => {
    await getPayment(PaymentType.Booking, selectedBooking.bookingDetails.id).then((data) => {
      if (data.res) {
        window.location.href = data.res;
      }
    });
  };
  const toast = useToast();
  const { bookingDetails, ordersOfBooking } = selectedBooking;
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
                  {bookingDetails.status !== BookingStatus.Cancelled && (
                    <Tag
                      className="px-2 py-4"
                      color={getPaymentStatusColor(bookingDetails.paymentStatus)}
                    >
                      {getPaymentStatusText(bookingDetails.paymentStatus)}
                    </Tag>
                  )}
                  {bookingDetails.status === BookingStatus.Cancelled && (
                    <Tag
                      className="px-2 py-4 w-28 text-center"
                      color={'red'}
                    >
                      Đã hủy
                    </Tag>
                  )}
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
            {!bookingDetails.isSuccess && bookingDetails.status !== BookingStatus.Cancelled && (
              <Button
                className="text-base p-4 py-5 w-32"
                variant="solid"
                color="danger"
                onClick={async () =>
                  await bookingDetailsStore.cancelBooking(bookingDetails.id, toast)
                }
              >
                Huỷ lịch
              </Button>
            )}
            {!(bookingDetails.paymentStatus === PaymentStatus.Success) &&
              bookingDetails.status === BookingStatus.Confirmed && (
                <Button
                  className="text-base p-4 py-5 w-32"
                  variant="solid"
                  color="primary"
                  onClick={handlerPayment}
                >
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
