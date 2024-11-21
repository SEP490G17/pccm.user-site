import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Typography, Spin, Button, Tag } from 'antd';
import { useStore } from '@/app/stores/store';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import dayjs from 'dayjs';
import { BookingStatus, PaymentStatus, PaymentType } from '@/app/models/booking.model';
const { Title } = Typography;
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { router } from '@/app/router/Routes';

const BookingHistoryPage: React.FC = observer(() => {
  const { bookingHistoryStore, paymentStore } = useStore();
  const { getPayment } = paymentStore;

  const handlerPayment = async (bookingId: number) => {
    await getPayment(PaymentType.Booking, bookingId).then((data) => {
      if (data.res) {
        window.open(data.res, '_blank');
      }
    });
  };
  useEffect(() => {
    bookingHistoryStore.loadListBooking();
  }, []);

  const columns = [
    {
      title: 'STT',
      key: 'id',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Cụm sân',
      dataIndex: 'courtClusterName',
      key: 'courtClusterName',
      render: (text: number) => `Sân ${text}`,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => text,
    },
    {
      title: 'Giờ chơi',
      dataIndex: 'timePlay',
      key: 'timePlay',
      render: (text: number) => `${text}`,
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: number) => `${dayjs(text).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: number) => `${dayjs(text).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Tổng giá',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: number) =>
        `${text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (
        _: any,
        record: {
          status: BookingStatus;
          paymentStatus?: PaymentStatus;
          id: number;
          isSuccess: boolean;
        },
      ) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {record.status === BookingStatus.Pending && (
            <Tag
              icon={<ClockCircleOutlined />}
              className="w-36 h-10 text-sm items-center justify-center flex"
              color="processing"
            >
              Chờ xác nhận
            </Tag>
          )}
          {record.status === BookingStatus.Confirmed && record.paymentStatus === undefined && (
            <Tag
              icon={<CheckCircleOutlined />}
              className="w-36 h-10 text-sm items-center justify-center flex"
              color="processing"
            >
              Đã xác nhận
            </Tag>
          )}
          {record.status === BookingStatus.Confirmed &&
            record.paymentStatus === PaymentStatus.Pending && (
              <Button
                type="primary"
                className="w-36 h-10 bg-teal-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handlerPayment(record.id);
                }}
              >
                Thanh toán
              </Button>
            )}
          {record.isSuccess && (
            <Tag
              icon={<CheckCircleOutlined />}
              className="w-36 h-10 text-sm items-center justify-center flex"
              color="success"
            >
              Đã hoàn thành
            </Tag>
          )}

          {record.status === BookingStatus.Declined && (
            <Tag
              icon={<CloseCircleOutlined />}
              className="w-36 h-10 text-sm items-center flex justify-center"
              color="error"
            >
              Đã từ chối
            </Tag>
          )}
          {record.status === BookingStatus.Cancelled && (
            <Tag
              icon={<MinusCircleOutlined />}
              className="w-36 h-10 text-sm items-center flex justify-center"
              color="default"
            >
              Đã bị huỷ
            </Tag>
          )}
          <br />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/home' },
          { title: 'Sân thể thao', to: '/list-courtcluster' },
        ]}
      />
      <Title level={2}>Lịch Sử Đặt Chỗ</Title>
      {bookingHistoryStore.loadingInitial ? (
        <Spin tip="Đang tải..." />
      ) : (
        <Table
          dataSource={bookingHistoryStore.listBooking}
          columns={columns}
          rowKey="startTime"
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => {
                router.navigate(`chi-tiet/${record.id}`);
              },
            };
          }}
        />
      )}
    </>
  );
});

export default BookingHistoryPage;