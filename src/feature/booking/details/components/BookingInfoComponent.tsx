import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import { Button, Col, Row, Tag, Typography, Grid } from 'antd';
import dayjs from 'dayjs';
import OrdersOfBookingComponent from './BookingOrderListComponent';
import { BookingStatus, PaymentStatus, PaymentType } from '@/app/models/booking.model';
import { useToast } from '@chakra-ui/react';

const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint();

  if (!selectedBooking) {
    return null;
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
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Row gutter={[16, 16]}>
          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Họ và tên:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">{bookingDetails.fullName}</Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Số điện thoại:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">{bookingDetails.phoneNumber}</Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Cụm sân:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">{bookingDetails.courtClusterName}</Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Sân:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">{bookingDetails.courtName}</Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Giờ thuê:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">{bookingDetails.playTime}</Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Ngày bắt đầu:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">
              {dayjs(bookingDetails.startDay).add(7, 'hour').format('DD/MM/YYYY')}
            </Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Ngày kết thúc:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">
              {dayjs(bookingDetails.endDay).add(7, 'hour').format('DD/MM/YYYY')}
            </Typography.Text>
          </Col>

          <Col xs={10} sm={11}>
            <Typography.Text className="font-bold text-lg">Giá tiền sân:</Typography.Text>
          </Col>
          <Col xs={14} sm={13}>
            <Typography.Text className="text-lg">{bookingDetails.totalPrice.toLocaleString('vn') ?? 0}</Typography.Text>
          </Col>

          {bookingDetails.paymentStatus && (
            <>
              <Col xs={10} sm={11}>
                <Typography.Text className="font-bold text-lg">Trạng thái:</Typography.Text>
              </Col>
              <Col xs={14} sm={13}>
                <Tag
                  className="px-2 py-2"
                  color={getPaymentStatusColor(bookingDetails.paymentStatus)}
                >
                  {getPaymentStatusText(bookingDetails.paymentStatus)}
                </Tag>
              </Col>
            </>
          )}
        </Row>
      </Col>

      <Col xs={24} lg={12}>
        <OrdersOfBookingComponent orders={ordersOfBooking} />
      </Col>

      <Col xs={24}>
        <div className={`flex gap-2 ${screens.lg ? 'justify-end' : 'justify-center'}`}>
          {!bookingDetails.isSuccess && bookingDetails.status !== BookingStatus.Cancelled && (
            <Button
              className="text-base p-3 py-4 w-32"
              style={{ borderRadius: '8px', backgroundColor: 'red', color: 'white' }}
              type="primary"
              danger
              onClick={async () => await bookingDetailsStore.cancelBooking(bookingDetails.id, toast)}
            >
              Huỷ lịch
            </Button>
          )}
          {!(bookingDetails.paymentStatus === PaymentStatus.Success) &&
            bookingDetails.status === BookingStatus.Confirmed && (
              <Button
                className="text-base p-4 py-5 w-32"
                style={{ borderRadius: '6px', backgroundColor: '#115363', color: 'white' }}
                type="primary"
                onClick={handlerPayment}
              >
                Thanh toán
              </Button>
            )}
        </div>
      </Col>
    </Row>
  );
});

export default BookingInfoComponent;
