import { useStore } from '@/app/stores/store';
import { runInAction } from 'mobx';
import {  useEffect } from 'react';
import BookingHistoryTableComponent from '../components/BookingHistoryTableComponent';
import { observer } from 'mobx-react-lite';

const BookingHistoryAllTabs= observer (() => {
  const { bookingHistoryStore } = useStore();

  useEffect(() => {
    bookingHistoryStore.setLoadingAllInitial(true);
    bookingHistoryStore.loadListBookingAll().then(() => {
      runInAction(() => {
        bookingHistoryStore.setLoadingAllInitial(false);
      });
    });
   
  }, [bookingHistoryStore]);
  return (
    <BookingHistoryTableComponent
      data={bookingHistoryStore.listBookingAll}
      loading={bookingHistoryStore.loadingAll}
      loadingInitial={bookingHistoryStore.loadingAllInitial}
      totalElement={bookingHistoryStore.bookingAllPageParams.totalElement}
      handleLoadMore={async () => {
        bookingHistoryStore.bookingAllPageParams.skip =
          bookingHistoryStore.bookingHistoryAllRegistry.size;
        await bookingHistoryStore.loadListBookingAll();
      }}
    />
  );
});

export default BookingHistoryAllTabs;
