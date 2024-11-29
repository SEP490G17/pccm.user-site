import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import BookingInfoComponent from './components/BookingInfoComponent';
import { Badge, Card, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { getBookingStatusColor, getBookingStatusText } from '@/app/helper/utils';
import { LoadingOutlined } from '@ant-design/icons';

const BookingDetailsPage = observer(() => {
  const { id } = useParams();
  const { bookingDetailsStore } = useStore();
  const { getDetailsBooking, selectedBooking, loadingInitial } = bookingDetailsStore;
  useEffect(() => {
    window.scroll(0,0);
    if (id && !isNaN(Number(id))) {
      getDetailsBooking(Number(id));
    }
  }, [id,getDetailsBooking]);
  if (!selectedBooking || loadingInitial) {
    return (
      <div className=" flex min-h-[100vh] justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }
  return (
    <div className='w-full flex justify-center'>
      <div className="w-4/5">
        <Badge.Ribbon
          text={getBookingStatusText(selectedBooking?.bookingDetails.status)}
          color={getBookingStatusColor(selectedBooking.bookingDetails.status)}
          className="h-8 w-40 text-base items-center flex"
        >
          <Card
            className="pt-8"
            title={<Title>Chi tiết booking {selectedBooking?.bookingDetails.id}</Title>}
          >
            <BookingInfoComponent />
          </Card>
        </Badge.Ribbon>
      </div>
    </div>
  );
});

export default BookingDetailsPage;
