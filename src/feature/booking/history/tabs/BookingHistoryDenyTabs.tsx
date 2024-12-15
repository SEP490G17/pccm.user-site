import { useStore } from '@/app/stores/store';
import { runInAction } from 'mobx';
import {  useEffect } from 'react';
import BookingHistoryTableComponent from '../components/BookingHistoryTableComponent';
import { observer } from 'mobx-react-lite';

const BookingHistoryDenyTabs= observer (() => {
  const { bookingHistoryStore } = useStore();

  useEffect(() => {
    bookingHistoryStore.setLoadingDenyInitial(true);
    bookingHistoryStore.loadListBookingDeny().then(() => {
      runInAction(() => {
        bookingHistoryStore.setLoadingDenyInitial(false);
      });
    });
  }, [bookingHistoryStore]);
  return (
    <BookingHistoryTableComponent
      data={bookingHistoryStore.listBookingDeny}
      loading={bookingHistoryStore.loadingDeny}
      loadingInitial={bookingHistoryStore.loadingDenyInitial}
      totalElement={bookingHistoryStore.bookingDenyPageParams.totalElement}
      handleLoadMore={async () => {
        bookingHistoryStore.bookingDenyPageParams.skip =
          bookingHistoryStore.bookingHistoryDenyRegistry.size;
        await bookingHistoryStore.loadListBookingDeny();
      }}
    />
  );
});

export default BookingHistoryDenyTabs;
