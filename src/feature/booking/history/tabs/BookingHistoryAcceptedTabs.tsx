import { useStore } from '@/app/stores/store';
import { runInAction } from 'mobx';
import {  useEffect } from 'react';
import BookingHistoryTableComponent from '../components/BookingHistoryTableComponent';
import { observer } from 'mobx-react-lite';

const BookingHistoryAcceptedTabs= observer (() => {
  const { bookingHistoryStore } = useStore();

  useEffect(() => {
    bookingHistoryStore.setLoadingAcceptedInitial(true);
    bookingHistoryStore.loadListBookingAccepted().then(() => {
      runInAction(() => {
        bookingHistoryStore.setLoadingAcceptedInitial(false);
      });
    });
  }, [bookingHistoryStore]);
  return (
    <BookingHistoryTableComponent
      data={bookingHistoryStore.listBookingAccepted}
      loading={bookingHistoryStore.loadingAccepted}
      loadingInitial={bookingHistoryStore.loadingAcceptedInitial}
      totalElement={bookingHistoryStore.bookingAcceptedPageParams.totalElement}
      handleLoadMore={async () => {
        bookingHistoryStore.bookingAcceptedPageParams.skip =
          bookingHistoryStore.bookingHistoryAcceptedRegistry.size;
        await bookingHistoryStore.loadListBookingAccepted();
      }}
    />
  );
});

export default BookingHistoryAcceptedTabs;
