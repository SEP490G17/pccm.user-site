import { useStore } from '@/app/stores/store';
import { runInAction } from 'mobx';
import {  useEffect } from 'react';
import BookingHistoryTableComponent from '../components/BookingHistoryTableComponent';
import { observer } from 'mobx-react-lite';

const BookingHistoryPendingTabs= observer (() => {
  const { bookingHistoryStore } = useStore();

  useEffect(() => {
    bookingHistoryStore.setLoadingPendingInitial(true);
    bookingHistoryStore.loadListBookingPending().then(() => {
      runInAction(() => {
        bookingHistoryStore.setLoadingPendingInitial(false);
      });
    });
  }, [bookingHistoryStore]);
  return (
    <BookingHistoryTableComponent
      data={bookingHistoryStore.listBookingPending}
      loading={bookingHistoryStore.loadingPending}
      loadingInitial={bookingHistoryStore.loadingPendingInitial}
      totalElement={bookingHistoryStore.bookingPendingPageParams.totalElement}
      handleLoadMore={async () => {
        bookingHistoryStore.bookingPendingPageParams.skip =
          bookingHistoryStore.bookingHistoryPendingRegistry.size;
        await bookingHistoryStore.loadListBookingPending();
      }}
    />
  );
});

export default BookingHistoryPendingTabs;
