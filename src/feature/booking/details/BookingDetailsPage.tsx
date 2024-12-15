import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import BookingInfoComponent from './components/BookingInfoComponent';
import { Badge, Card, Spin, Col, Row, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { getBookingStatusColor, getBookingStatusText } from '@/app/helper/utils';
import { LoadingOutlined } from '@ant-design/icons';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import dayjs from 'dayjs';

const BookingDetailsPage = observer(() => {
  const { id } = useParams();
  const { bookingDetailsStore } = useStore();
  const { getDetailsBooking, selectedBooking, loadingInitial } = bookingDetailsStore;
  const [open, setOpen] = useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search); // Tạo đối tượng URLSearchParams
  const payment = query.get('payment');

  useEffect(() => {
    window.scroll(0, 0);
    if (id && !isNaN(Number(id))) {
      getDetailsBooking(Number(id));
    }
    if (payment === 'success') {
      setOpen(true);
    }
  }, [id, getDetailsBooking, payment]);

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
          { title: 'Trang chủ', to: '/trang-chu' },
          { title: 'Lịch sử đặt sân', to: '/lich-su' },
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
                title={
                  <>
                    <Title level={2}>Chi tiết booking {selectedBooking?.bookingDetails.id}</Title>
                    <p className="font-thin mb-4">
                      Ngày đặt:{' '}
                      {selectedBooking?.bookingDetails.createdAt &&
                        dayjs(selectedBooking?.bookingDetails.createdAt)
                          .format('HH:mm DD/MM/YYYY')}
                    </p>
                  </>
                }
                bordered={false}
                style={{ borderRadius: '8px' }}
              >
                <BookingInfoComponent />
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </div>

      <Modal
        centered
        open={open}
        width={600}
        footer={
          <div className=" text-center w-full pb-6 ">
            <button
              onClick={() => setOpen(false)}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Đóng
            </button>
          </div>
        }
      >
        <div className="bg-gray-100 ">
          <div className="bg-white md:mx-auto">
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Thanh toán thành công!
              </h3>
              <p className="text-gray-600 my-2 py-2">
                Đơn đặt lịch của bạn đã được thanh toán thành công
              </p>
              <p> Cảm ơn đã sử dụng dịch vụ của chúng tôi! </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default BookingDetailsPage;
