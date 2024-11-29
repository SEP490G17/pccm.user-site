import { makeAutoObservable, runInAction } from 'mobx';

import { toast } from 'react-toastify';
import { catchErrorHandle } from '@/app/helper/utils';
import { CourtPriceBooking, ICourtCluster } from '@/app/models/courtcluster.model';
import { IReview, ReviewsDto } from '@/app/models/review.model';
import agent from '@/app/api/agent';
import { notification } from 'antd';
import { BookingModel, IBookingByDay, IBookingWithCombo } from '@/app/models/booking.model';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import _ from 'lodash';
import { store } from '@/app/stores/store';
import { CreateToastFnReturn } from '@chakra-ui/react';
import { CommonMessage } from '@/app/common/toastMessage/commonMessage';
import { BookingMessage, DefaultBookingText } from '@/app/common/toastMessage/bookingMessage';

export default class CourtClusterDetailsStore {
  reviewsRegistry = new Map<number, IReview>();
  listReviews: IReview[] = [];
  selectedCourtId: string | undefined;
  selectedCourt: ICourtCluster | undefined = undefined;
  loadingInitialDetailsPage: boolean = false;
  loadingReview: boolean = false;
  loadingBookingForSchedule: boolean = false;
  bookingForScheduleRegistry = new Map<number, BookingModel>();
  courtPrice: CourtPriceBooking[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  clearSelectedCourt = () => (this.selectedCourt = undefined);

  loadCourtPrice = async () => {
    if (this.selectedCourtId) {
      const [error, res] = await catchErrorHandle<CourtPriceBooking[]>(
        agent.Booking.priceCourt(Number(this.selectedCourtId)),
      );
      runInAction(() => {
        if (error) {
          return;
        }
        if (res) {
          this.courtPrice = res;
        }
      });
    }
  };

  getDetailsCourtCluster = async (id: string) => {
    this.selectedCourtId = id;
    const [error, response] = await catchErrorHandle<ICourtCluster>(
      agent.CourtClusters.details(this.selectedCourtId),
    );
    runInAction(() => {
      if (error) {
        notification.error({
          message: 'Tải thông tin cụm sân thất bại',
          type: 'error',
          duration: 3,
          placement: 'bottom',
        });
      } else {
        this.selectedCourt = response;
      }
    });
  };

  getListReviewByCourtClusterId = async (id: string) => {
    this.loadingReview = true;
    const [err, res] = await catchErrorHandle(agent.Reviews.listByCourtClusterId(id));
    runInAction(async () => {
      if (err) {
        notification.error({
          message: 'Tải danh sách review thất bại',
          type: 'error',
          duration: 3,
          placement: 'bottom',
        });
      }
      if (res) {
        res.forEach(this.setReviews);
      }
      this.loadingReview = false;
    });
  };

  createReviews = async (data: ReviewsDto) => {
    this.loadingReview = true;
    if (!store.commonStore.getPhoneNumber()) {
      toast.error('Bạn cần đăng nhập để dùng chức năng này');
      this.loadingReview = false;
      return;
    }
    try {
      const response = await agent.Reviews.create(data);
      this.setReviews(response);
      toast.success('Thêm đánh giá thành công');
    } catch {
      toast.error('Thêm đánh giá thất bại');
    } finally {
      this.loadingReview = false;
    }
  };

  deleteReviews = async (data: number) => {
    const reviewToDelete = this.reviewsRegistry.get(data);
    if (!reviewToDelete) {
      toast.error('Không tìm thấy đánh giá');
      return;
    }
    this.reviewsRegistry.delete(data);
    runInAction(async () => {
      await agent.Reviews.delete(data)
        .then(() => {})
        .catch(() => {
          this.reviewsRegistry.set(data, reviewToDelete);
          toast.error('Tạo review thất bại');
        });
    });
  };

  setLoadingInitialDetailsPage = (isLoad: boolean) => {
    console.log('Loading state:', isLoad); // Debugging log
    runInAction(() => {
      this.loadingInitialDetailsPage = isLoad;
    });
  };

  loadScheduleBookingList = async (selectedDate?: string) => {
    this.loadingBookingForSchedule = true;

    const [error, res] = await catchErrorHandle<BookingModel[]>(
      agent.Booking.getListForSchedule({
        courtClusterId: this.selectedCourtId,
        selectedDate: selectedDate,
      }),
    );
    runInAction(() => {
      if (error) {
        return;
      }
      if (res) {
        res.forEach((booking) => {
          this.setBooking(booking);
        });
      }
      this.loadingBookingForSchedule = false;
    });
  };
  private setBooking(booking: BookingModel) {
    booking.startTime = dayjs(booking.startTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
    booking.endTime = dayjs(booking.endTime).format('YYYY-MM-DDTHH:mm:ss[Z]');
    if (booking.recurrenceRule) {
      booking.RecurrenceRule = booking.recurrenceRule;
    }
    this.bookingForScheduleRegistry.set(booking.id, booking);
  }

  get reviewArray() {
    return _.orderBy(Array.from(this.reviewsRegistry.values()), ['id'], ['desc']);
  }

  get bookingScheduleArray() {
    return Array.from(this.bookingForScheduleRegistry.values());
  }

  setReviews = (review: IReview) => {
    this.reviewsRegistry.set(review.id, review);
  };

  setLoadingBookingForSchedule = (load: boolean) => (this.loadingBookingForSchedule = load);

  bookingWithCombo = async (booking: IBookingWithCombo, toast: CreateToastFnReturn) => {
    const pending = toast(CommonMessage.loadingMessage(DefaultBookingText.booking.title));
    const [err, res] = await catchErrorHandle(agent.Booking.bookingWithCombo(booking));
    runInAction(() => {
      toast.close(pending);
      if (err) {
        toast(BookingMessage.bookingFailure(err?.response?.data));
        return;
      }
      if (res) {
        toast(BookingMessage.bookingSuccess());
      }
    });
  };

  bookingByDay = async (booking: IBookingByDay, toast: CreateToastFnReturn) => {
    const pending = toast(CommonMessage.loadingMessage(DefaultBookingText.booking.title));
    const [err, res] = await catchErrorHandle(agent.Booking.bookingByDay(booking));
    runInAction(() => {
      toast.close(pending);
      if (err) {
        toast(BookingMessage.bookingFailure(err?.response?.data));
        return;
      }
      if (res) {
        toast(BookingMessage.bookingSuccess());
      }
    });
  };

  //#region signalR
  updateBookingSignalr = (booking: any) => {
    this.setBooking(this.mapBookingResponseToBookingModel(booking));
  };
  mapBookingResponseToBookingModel = (booking: any): BookingModel => {
    console.log('check booking', booking);
    const recu = booking.RecurrenceRule ? booking.RecurrenceRule : booking.recurrenceRule;
    return {
      courtId: booking.courtId ?? 0,
      courtName: booking.courtName,
      endTime: booking.endDay,
      startTime: booking.startDay,
      paymentStatus: booking.paymentStatus,
      paymentUrl: booking.paymentUrl,
      status: booking.status,
      isSuccess: booking.isSuccess,
      fullName: booking.fullName,
      phoneNumber: booking.phoneNumber,
      totalPrice: booking.totalPrice,
      RecurrenceRule: recu ?? '',
      recurrenceRule: recu,
      id: booking.id,
      untilTime: '',
    };
  };

  createBookingSignalr = (booking: BookingModel) => {
    this.setBooking(booking);
  };
}
