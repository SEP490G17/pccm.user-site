import { OrderOfBooking } from '@/app/models/booking.model';
import { Table } from 'antd';
import { observer } from 'mobx-react';
interface IProps {
  orders: OrderOfBooking[];
}
const OrdersOfBookingComponent = observer(({ orders }: IProps) => {
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
      render: (text: number) => `${text}`,
    },

    {
      title: 'Tổng giá',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: number) =>
        `${text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
    },
  ];

  return (
    <>
      {orders.length > 0 && (
        <Table dataSource={orders} columns={columns} rowKey="startTime" pagination={false} />
      )}
    </>
  );
});

export default OrdersOfBookingComponent;
