import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import BookingInfoComponent from './components/BookingInfoComponent';
import { Badge, Card, Spin, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { getBookingStatusColor, getBookingStatusText } from '@/app/helper/utils';
import { LoadingOutlined } from '@ant-design/icons';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';

const BookingDetailsPage = observer(() => {
  const { id } = useParams();
  const { bookingDetailsStore } = useStore();
  const { getDetailsBooking, selectedBooking, loadingInitial } = bookingDetailsStore;

  useEffect(() => {
    window.scroll(0, 0);
    if (id && !isNaN(Number(id))) {
      getDetailsBooking(Number(id));
    }
  }, [id, getDetailsBooking]);

  if (!selectedBooking || loadingInitial) {
    return (
      <div className="flex min-h-[100vh] justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <>
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/home' },
          { title: 'Lịch sử đặt sân', to: '/booking-history' },
        ]}
      />
      <div className="w-full flex justify-center py-4">
        <Row gutter={[16, 24]} justify="center" style={{ width: '100%' }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Badge.Ribbon
              text={getBookingStatusText(selectedBooking?.bookingDetails.status)}
              color={getBookingStatusColor(selectedBooking.bookingDetails.status)}
              className="h-8 w-40 text-base items-center flex"
            >
              <Card
                className="pt-8"
                title={<Title level={2}>Chi tiết booking {selectedBooking?.bookingDetails.id}</Title>}
                bordered={false}
                style={{ borderRadius: '8px' }}
              >
                <BookingInfoComponent />
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default BookingDetailsPage;
