import {
  BookingHistoryModel,
  BookingStatus,
  PaymentStatus,
  PaymentType,
} from '@/app/models/booking.model';
import { useStore } from '@/app/stores/store';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Button, Grid, Spin, Table, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { router } from '@/app/router/Routes';
const { useBreakpoint } = Grid;
interface BookingHistoryTableComponentProps {
  loading: boolean;
  loadingInitial: boolean;
  data: BookingHistoryModel[];
  handleLoadMore: () => Promise<void>;
  totalElement?: number;
}

const BookingHistoryTableComponent: FC<BookingHistoryTableComponentProps> = ({
  loading,
  loadingInitial,
  data,
  handleLoadMore,
  totalElement = 0,
}) => {
  const screens = useBreakpoint();
  const { paymentStore } = useStore();

  const { getPayment } = paymentStore;

  const handlerPayment = async (bookingId: number) => {
    await getPayment(PaymentType.Booking, bookingId).then((data) => {
      if (data.res) {
        window.location.href = data.res;
      }
    });
  };
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
      title: 'Ngày tạo đơn',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: number) => `${dayjs(text).format('HH:mm DD/MM/YYYY')}`,
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
      render: (text: number) => `${dayjs(text).add(7, 'hour').format('DD/MM/YYYY')}`,
    },
    {
      title: 'Kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: number) => `${dayjs(text).add(7, 'hour').format('DD/MM/YYYY')}`,
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {record.status === BookingStatus.Pending && (
            <Tag
              icon={<ClockCircleOutlined />}
              className="w-36 h-10 text-sm items-center justify-center flex"
              color="gold"
            >
              Chờ xác nhận
            </Tag>
          )}
          {record.status === BookingStatus.Confirmed &&
            record.paymentStatus === PaymentStatus.Success &&
            !record.isSuccess && (
              <Tag
                icon={<CheckCircleOutlined />}
                className="w-36 h-10 text-sm items-center justify-center flex"
                color="success"
              >
                Đã thanh toán
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
                style={{ backgroundColor: '#115363', color: 'white' }}
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
              color="#87d068"
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
              color="#f50"
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
      {loadingInitial ? (
        <div className="flex h-[40rem] w-full justify-center items-center">
          <Spin tip="Đang tải..." />
        </div>
      ) : (
        <>
          <Table
            dataSource={data}
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
            scroll={{ x: screens.lg ? 1000 : 'max-content' }}
          />
          {totalElement > data.length && (
            <div className="flex float-end flex-col">
              <Button
                className="bg-teal-700 h-8 w-30 text-white mt-4"
                loading={loading}
                onClick={async () => {
                  await handleLoadMore();
                }}
              >
                Xem thêm ...
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BookingHistoryTableComponent;
