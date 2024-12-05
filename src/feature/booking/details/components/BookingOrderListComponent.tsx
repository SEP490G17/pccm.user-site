import { BookingDetails, OrderOfBooking } from '@/app/models/booking.model';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import OrderDetailComponent from './OrderDetailComponent';
import { PaymentStatus } from '@/app/models/payment.model';
interface IProps {
  orders: OrderOfBooking[];
  booking: BookingDetails;
}

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

const OrdersOfBookingComponent = observer(({ orders, booking }: IProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleRowClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'STT',
      key: 'id',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => `${dayjs(text).format('DD/MM/YYYY')}`,
    },

    {
      title: 'Tổng giá',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text: number) =>
        `${text?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentStatus', // Assuming each order has a `paymentStatus` field
      key: 'paymentStatus',
      render: (paymentStatus: number) => (
        <Tag
          className="px-2 py-2"
          color={getPaymentStatusColor(paymentStatus)}
        >
          {getPaymentStatusText(paymentStatus)}
        </Tag>
      ),
    }
  ];

  return (
    <>
      {orders.length > 0 && (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="startTime"
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
          })}
        />
      )}
      {selectedOrderId && (
        <OrderDetailComponent
          booking={booking}
          orderId={selectedOrderId}
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
});

export default OrdersOfBookingComponent;
