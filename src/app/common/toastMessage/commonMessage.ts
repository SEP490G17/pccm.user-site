import { UseToastOptions } from '@chakra-ui/react';
import { DefaultCourtClusterText } from './courtClusterMessage';

export const DefaultSettingToast = {
  duration: 5000,
  isClosable: true,
};

//#region common message
export const CommonMessage = {
  loadingMessage: (title: string): UseToastOptions => ({
    title,
    description: 'Đang xử lý vui lòng đợi trong giây lát',
    status: 'loading',
  }),
};

export const ReviewMessage = {
  ReviewLoginRequire: (
    title: string = "Đánh giá",
    description: string = 'Bạn cần đăng nhập để dùng chức năng này',
    duration: number = DefaultSettingToast.duration,
    isClosable: boolean = DefaultSettingToast.isClosable,
  ): UseToastOptions => ({
    title,
    description,
    status: 'error',
    duration,
    isClosable,
  }),
  CreateReviewFail: (
    title: string = "Đánh giá",
    description: string = 'Thêm đánh giá thất bại',
    duration: number = DefaultSettingToast.duration,
    isClosable: boolean = DefaultSettingToast.isClosable,
  ): UseToastOptions => ({
    title,
    description,
    status: 'error',
    duration,
    isClosable,
  }),
  CreateReviewSuccess: (
    title: string = "Đánh giá",
    description: string = 'Thêm đánh giá thành công',
    duration: number = DefaultSettingToast.duration,
    isClosable: boolean = DefaultSettingToast.isClosable,
  ): UseToastOptions => ({
    title,
    description,
    status: 'success',
    duration,
    isClosable,
  }),
};

export const PaymentMessage = {
  generating: (): UseToastOptions => ({
    title: 'Thanh toán',
    description: 'Đang khởi tạo thanh toán, vui lòng đợi ',
    status: 'loading',
  }),
  success: (): UseToastOptions => ({
    title: 'Thanh toán',
    description: 'Tạo thanh toán thành công',
    status: 'success',
    duration: 5000,
    isClosable: true,
  }),
  failure: (description: string = 'Tạo thanh toán thất bại'): UseToastOptions => ({
    title: 'Thanh toán',
    description,
    status: 'error',
    duration: 5000,
    isClosable: true,
  }),
};

//#endregion
