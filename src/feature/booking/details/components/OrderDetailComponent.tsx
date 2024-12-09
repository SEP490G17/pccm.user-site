import { useEffect } from 'react';
import { Col, Divider, Modal, Row, Spin, Table } from 'antd';
import { useStore } from '@/app/stores/store';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { BookingDetails } from '@/app/models/booking.model';
import { calculateTimeDifferenceInHours } from '@/app/helper/utils';
import Title from 'antd/es/typography/Title';
import './orderdetails.module.scss'

interface IProps {
    booking: BookingDetails;
    orderId: number;
    visible: boolean;
    onClose: () => void;
}

const OrderDetailComponent = observer(({ orderId, visible, onClose, booking }: IProps) => {
    const { orderStore } = useStore();
    const { selectedOrder, getDetailsOrder, loadingInitial } = orderStore;
    const [startTime, endTime] = booking.bookingDetails.playTime.split('-');
    const playHours = calculateTimeDifferenceInHours(startTime, endTime);

    useEffect(() => {
        getDetailsOrder(orderId);
    }, [orderId, getDetailsOrder]);

    const columnsProduct = [
        {
            title: 'STT',
            key: 'id',
            render: (_: any, __: any, index: number) => index + 1,
            width: 1,
        },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'productName',
            key: 'productName',
            width: 200,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 70,
        },
        {
            title: 'Giá',
            dataIndex: 'currPrice',
            key: 'currPrice',
            render: (text: number) => `${text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            width: 100,
        },
        {
            title: 'Tổng giá',
            dataIndex: 'currTotalPrice',
            key: 'currTotalPrice',
            render: (text: number) => `${text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            width: 100,
        },
    ];

    

    const columnsService = [
        {
            title: 'STT',
            key: 'id',
            render: (_: any, __: any, index: number) => index + 1,
            width: 1,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
            width: 200,
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            render: () => playHours,
            width: 70,
        },
        {
            title: 'Giá',
            dataIndex: 'currPrice',
            key: 'currPrice',
            render: (text: number) => `${text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            width: 100,
        },
        {
            title: 'Tổng giá',
            dataIndex: 'currTotalPrice',
            key: 'currTotalPrice',
            render: (text: number) => `${text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            width: 100,
        },
    ];

    const totalProduct = selectedOrder?.orderForProducts.reduce((sum, product) => sum + product.totalPrice, 0) || 0
    const totalService = selectedOrder?.orderForServices.reduce((sum, service) => sum + (service.totalPrice ?? 0), 0) || 0

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            centered
        >
            {loadingInitial && !selectedOrder ? (
                <>
                    <Title level={4} style={{ marginBottom: '16px' }}>
                        Thông tin đơn hàng
                    </Title>
                    <Divider />
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </>

            ) : (
                selectedOrder && (
                    <>
                        <Title level={4} style={{ marginBottom: '16px' }}>
                            Thông tin đơn hàng
                        </Title>
                        <Divider />
                        {
                            selectedOrder.orderForProducts.length > 0
                            &&
                            <Table
                                dataSource={selectedOrder.orderForProducts}
                                columns={columnsProduct}
                                rowKey="productId"
                                pagination={false}
                                bordered
                                style={{ marginBottom: '20px' }}
                                rowClassName="hover-row"
                            />
                        }
                        {
                            selectedOrder.orderForServices.length > 0
                            &&
                            <Table
                                dataSource={selectedOrder.orderForServices}
                                columns={columnsService}
                                rowKey="serviceId"
                                pagination={false}
                                bordered
                                className="table-service"
                            />
                        }
                        <Row style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <strong>Tổng đơn hàng: </strong>
                                <span>{(totalProduct + totalService).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </Col>
                        </Row>
                    </>
                )
            )}
        </Modal>
    );
});

export default OrderDetailComponent;
