import { useStore } from '@/app/stores/store';
import { runInAction } from 'mobx';
import {  useEffect } from 'react';
import BookingHistoryTableComponent from '../components/BookingHistoryTableComponent';
import { observer } from 'mobx-react-lite';

const BookingHistoryCancelTabs= observer (() => {
  const { bookingHistoryStore } = useStore();

  useEffect(() => {
    bookingHistoryStore.setLoadingCancelInitial(true);
    bookingHistoryStore.loadListBookingCancel().then(() => {
      runInAction(() => {
        bookingHistoryStore.setLoadingCancelInitial(false);
      });
    });
  }, [bookingHistoryStore]);
  return (
    <BookingHistoryTableComponent
      data={bookingHistoryStore.listBookingCancel}
      loading={bookingHistoryStore.loadingCancel}
      loadingInitial={bookingHistoryStore.loadingCancelInitial}
      totalElement={bookingHistoryStore.bookingCancelPageParams.totalElement}
      handleLoadMore={async () => {
        bookingHistoryStore.bookingCancelPageParams.skip =
          bookingHistoryStore.bookingHistoryCancelRegistry.size;
        await bookingHistoryStore.loadListBookingCancel();
      }}
    />
  );
});

export default BookingHistoryCancelTabs;
