import * as Yup from 'yup';
import dayjs from 'dayjs';
import { FastField, Field, Form, Formik } from 'formik';
import { useStore } from '@/app/stores/store';
import { BookingByDay } from '@/app/models/booking.model';
import { observer } from 'mobx-react-lite';
import { ICourtCluster } from '@/app/models/courtcluster.model';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { TimePicker } from 'antd';

interface IBookingByDayComponent {
  selectedCourt: ICourtCluster;
}

const BookingByDayComponent = observer(({ selectedCourt }: IBookingByDayComponent) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Họ và tên là bắt buộc'),
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
    courtId: Yup.number().min(1, 'Chưa chọn sân'),
    fromDate: Yup.date()
      .min(dayjs().startOf('day').toDate(), 'Ngày bắt đầu phải là hôm nay hoặc sau hôm nay') // Kiểm tra ngày phải từ hôm nay trở đi
      .required('Ngày bắt đầu là bắt buộc'),
    fromTime: Yup.string()
      .required('Giờ bắt đầu là bắt buộc')
      .test(
        'is-before-toTime',
        'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 1 giờ',
        function (value) {
          const { toTime } = this.parent;
          if (!value || !toTime) return true;
          const fromTimeDate = new Date(`1970-01-01T${value}`);
          const toTimeDate = new Date(`1970-01-01T${toTime}`);
          return toTimeDate.getTime() - fromTimeDate.getTime() >= 60 * 60 * 1000; // 1 giờ = 60 * 60 * 1000 milliseconds
        },
      ),
    toTime: Yup.string()
      .required('Giờ kết thúc là bắt buộc')
      .test(
        'is-after-fromTime',
        'Giờ kết thúc phải lớn hơn giờ bắt đầu ít nhất 1 giờ',
        function (value) {
          const { fromTime } = this.parent;
          if (!value || !fromTime) return true;
          const fromTimeDate = new Date(`1970-01-01T${fromTime}`);
          const toTimeDate = new Date(`1970-01-01T${value}`);
          return toTimeDate.getTime() - fromTimeDate.getTime() >= 60 * 60 * 1000; // 1 giờ = 60 * 60 * 1000 milliseconds
        },
      ),
  });
  const calculatePrice = (
    fromTime: string,
    toTime: string,
    courtPrices?: Array<{ fromTime: string; toTime: string; price: number }>,
  ): number => {
    const start = dayjs(`1970-01-01T${fromTime}`);
    const end = dayjs(`1970-01-01T${toTime}`);
    let totalPrice = 0;
    if (!courtPrices) return 0;
    courtPrices.forEach(({ fromTime, toTime, price }) => {
      const priceStart = dayjs(`1970-01-01T${fromTime}`);
      const priceEnd = dayjs(`1970-01-01T${toTime}`);

      // Tìm thời điểm giao nhau
      const overlapStart = start.isAfter(priceStart) ? start : priceStart;
      const overlapEnd = end.isBefore(priceEnd) ? end : priceEnd;

      if (overlapStart.isBefore(overlapEnd)) {
        const overlapDuration = overlapEnd.diff(overlapStart, 'minute') / 60; // Số giờ giao nhau
        totalPrice += overlapDuration * price;
      }
    });

    return totalPrice;
  };
  const toast = useToast();
  const { courtClusterDetailsStore, authStore } = useStore();
  const initial = new BookingByDay();
  if(authStore.userApp){
    initial.fullName = authStore.userApp.displayName;
    initial.phoneNumber = authStore.userApp.phoneNumber;
  }
  return (
    <Flex direction={'column'} height={'100%'}>
      <Heading size={'lg'} className="mb-5">
        Đặt theo ngày
      </Heading>
      <Formik
        onSubmit={async (value) => {
          if (!authStore.isLoggedIn) {
            authStore.setVisible(true);
            return;
          }
          const newCombo: BookingByDay = {
            courtId: Number(value.courtId),
            fromDate: value.fromDate,
            fromTime: value.fromTime,
            toTime: value.toTime,
            fullName: value.fullName,
            phoneNumber: value.phoneNumber,
          };
          await courtClusterDetailsStore.bookingByDay(newCombo, toast);
        }}
        initialValues={initial}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Flex direction={'column'} className="h-full" gap={5}>
              <FastField name="fullName">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.fullName && form.touched.fullName}>
                    <Input placeholder="Họ và tên" type="text" {...field} />
                    <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                  </FormControl>
                )}
              </FastField>
              <FastField name="phoneNumber">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}>
                    <Input
                      placeholder="Số điện thoại"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        // Lấy giá trị từ input, đảm bảo là chuỗi
                        const parsedValue = e.target.value.toString();
                        // Cập nhật giá trị vào form
                        form.setFieldValue(field.name, parsedValue);
                      }}
                    />
                    <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </FastField>
              <Field name="courtId">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.courtId && form.touched.courtId}>
                    <Select
                      id="courtId"
                      placeholder="Chọn sân"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e); // Cập nhật Formik state
                      }}
                    >
                      {selectedCourt.courts.map((court) => (
                        <option key={court.courtId} value={court.courtId}>
                          {court.courtName}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.courtId}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FastField name="fromDate">
                {({ field, form }: any) => {
                  const formattedDate = field.value
                    ? new Date(field.value).toISOString().split('T')[0]
                    : '';

                  return (
                    <FormControl isInvalid={form.errors.fromDate && form.touched.fromDate}>
                      <FormLabel>Thời gian bắt đầu:</FormLabel>
                      <Input
                        type="date"
                        value={formattedDate}
                        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
                      />
                      <FormErrorMessage>{form.errors.fromDate}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </FastField>
              <Flex className="row justify-between">
                <Field name="fromTime">
                  {({ field, form }: any) => (
                    <FormControl
                      className="flex-col flex items-start"
                      isInvalid={form.errors.fromTime && form.touched.fromTime}
                    >
                      <Flex className="flex-row justify-center items-center">
                        <TimePicker
                          className="h-10 xl:w-48"
                          format="HH:mm"
                          size="middle"
                          placeholder="Chọn giờ"
                          onChange={(time) => {
                            setFieldValue(field.name, time.format('HH:mm:ss'));
                          }}
                          minuteStep={15}
                          hourStep={1}
                          onBlur={() => {
                            form.setFieldTouched(field.name, true, true);
                            form.validateField(field.name);
                          }}
                        />
                      </Flex>
                      <FormErrorMessage className="pr-8">{form.errors.fromTime}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="toTime">
                  {({ field, form }: any) => (
                    <FormControl
                      className="flex-col flex items-end"
                      isInvalid={form.errors.toTime && form.touched.toTime}
                    >
                      <Flex className="flex-row justify-center items-center">
                        <TimePicker
                          className="h-10 xl:w-48"
                          placeholder="Chọn giờ"
                          size="middle"
                          format={'HH:mm'}
                          minuteStep={15}
                          hourStep={1}
                          onChange={(time) => {
                            setFieldValue(field.name, time.format('HH:mm:ss'));
                          }}
                          onBlur={() => {
                            form.setFieldTouched(field.name, true, true);
                            form.validateField(field.name);
                          }}
                        />
                      </Flex>
                      <FormErrorMessage className="pl-8">{form.errors.toTime}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Flex>
              <Spacer></Spacer>
              <Flex direction={'column'} gap={10}>
                {Number(values.courtId) !== 0 && values.courtId && (
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Khung giờ</Th>
                          <Th>Giá</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {(() => {
                          const prices = selectedCourt.courts.find(
                            (c) => c.courtId === Number(values.courtId),
                          )?.courtPrices;
                          return prices?.map((data) => (
                            <Tr key={data.fromTime}>
                              <Td borderBottom="1px solid #e2e8f0">
                                {data.fromTime.substring(0, 5)} - {data.toTime.substring(0, 5)}
                              </Td>
                              <Td borderBottom="1px solid #e2e8f0">
                                {data.price.toLocaleString('vn')} VND
                              </Td>
                            </Tr>
                          ));
                        })()}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
                <Text fontWeight="bold" color="teal.500" className='p-0' fontSize="lg">
                  Giá tạm tính:{' '}
                  {calculatePrice(
                    values.fromTime,
                    values.toTime,
                    selectedCourt.courts.find((c) => c.courtId === Number(values.courtId))
                      ?.courtPrices,
                  ).toLocaleString()}{' '}
                  VND
                </Text>
                <Button type="submit" variant="solid" colorScheme="teal">
                  Đặt lịch
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
});

export default BookingByDayComponent;
