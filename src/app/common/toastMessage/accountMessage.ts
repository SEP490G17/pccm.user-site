import { UseToastOptions } from '@chakra-ui/react';
import { DefaultSettingToast } from './commonMessage';

// #region Account message
export const DefaultAccountText = {
  success: {
    title: 'Đổi mật khẩu',
    description: { success: 'Đổi mật khẩu thành công' },
  },

  fail: {
    title: 'Đổi mật khẩu',
  },
};

export const AccountMessage = {
  changePasswordSuccess: (
    title: string = DefaultAccountText.success.title,
    description: string = DefaultAccountText.success.description.success,
    duration: number = DefaultSettingToast.duration,
    isClosable: boolean = DefaultSettingToast.isClosable,
  ): UseToastOptions => ({
    title,
    description,
    status: 'success',
    duration,
    isClosable,
  }),
  changePasswordFail: (
    title: string = DefaultAccountText.fail.title,
    description: string,
    duration: number = DefaultSettingToast.duration,
    isClosable: boolean = DefaultSettingToast.isClosable,
  ): UseToastOptions => ({
    title,
    description,
    status: 'error',
    duration,
    isClosable,
  }),
};

//#endregion
