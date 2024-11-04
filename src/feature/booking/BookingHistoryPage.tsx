import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Typography, Spin } from 'antd';
import { useStore } from '@/app/stores/store';
import styles from './BookingHistoryPage.module.scss';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';

const { Title } = Typography;

const BookingHistoryPage: React.FC = observer(() => {
    const { bookingHistoryStore } = useStore();

    useEffect(() => {
        bookingHistoryStore.loadListBooking();
    }, []);

    const columns = [
        {
            title: 'Sân Thể Thao',
            dataIndex: 'courtId',
            key: 'courtId',
            render: (text: number) => `Sân ${text}`,
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Thời gian đặt',
            dataIndex: 'duration',
            key: 'duration',
            render: (text: number) => `${text} phút`,
        },
        {
            title: 'Tổng giá',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: number) => `${text} VNĐ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
    ];

    return (
        <div className={styles.container} style={{ maxWidth: '85%', margin: 'auto', padding: '20px 0px' }}>
            <PageHeadingAtoms
                breadCrumb={[
                    { title: "Trang chủ", to: "/home" },
                    { title: "Sân thể thao", to: "/list-courtcluster" }
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
                />
            )}
        </div>
    );
});

export default BookingHistoryPage;
