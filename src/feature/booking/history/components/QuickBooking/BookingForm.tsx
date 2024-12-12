import './style/BookingForm.scss';

import { BookingByDay, CourtPrice, ISlots } from '@/app/models/booking.model';
import { Button, Col, Form, Input, Modal, Row, Skeleton, Table, TableColumnsType, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { useStore } from '@/app/stores/store';
import { observer } from "mobx-react-lite";
import BookingDetail from './BookingDetail';
import CourtSelection from './CourtSelection';
import { useToast } from '@chakra-ui/react';

const { Title } = Typography;

interface IProps {
  courtClusterId: number;
  loadingCourtId: number | null;
  setLoadingCourtId: (id: number | null) => void;
}

export interface DataType {
  key: number;
  courtName: string;
  time: string;
  priceCourt: string;
}

const CourtBookingForm = observer(({ courtClusterId, loadingCourtId, setLoadingCourtId }: IProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const toast = useToast();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [availablePrices, setAvailablePrices] = useState<CourtPrice[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const { bookingStore, authStore } = useStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { availableSlot, loadingSlot, courtPrice } = bookingStore;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleOpenModal = async () => {
    if (!authStore.isLoggedIn) {
      authStore.setVisible(true);
      return;
    }
    setLoadingCourtId(courtClusterId);
    setIsModalVisible(true);
    Promise.all([bookingStore.loadSlots(new ISlots({ date: dayjs().format('YYYY-MM-DD'), courtClusterId })),
    bookingStore.loadCourtPrice(courtClusterId)])
    setLoadingCourtId(null);
  };

  const data: DataType[] = (courtPrice ?? [])
    .map((price, index) => ({
      key: index + 1,
      courtName: price.courtName,
      time: price.time,
      priceCourt: price.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }));

  const dataSelected: DataType[] = (availablePrices ?? [])
    .map((price, index) => ({
      key: index + 1,
      courtName: price.courtName,
      time: price.time,
      priceCourt: price.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }));

  const courtPrices = (availablePrices ?? [])
    .map((price) => ({
      fromTime: price.time.split(' - ')[0] + ':00',
      toTime: price.time.split(' - ')[1] + ':00',
      price: price.price
    }))


  const columns: TableColumnsType<DataType> = [
    { title: 'Tên sân', dataIndex: 'courtName', key: 'courtName', width: '30%' },
    { title: 'Khoảng giờ', dataIndex: 'time', key: 'time', width: '35%' },
    { title: 'Giá', dataIndex: 'priceCourt', key: 'priceCourt', width: '35%' },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCourtSelect = (courtId: number) => {
    setSelectedCourt(courtId);
    const selectedCourtDetails = availableSlot?.find((court: any) => court.id === courtId);
    const selectedCourtPrice = courtPrice?.filter((court: CourtPrice) => court.courtId === courtId);
    setAvailableSlots(selectedCourtDetails?.availableSlots || []);
    setAvailablePrices(selectedCourtPrice || []);
  };

  const handleBookCourt = async () => {
    setLoadingCourtId(selectedCourt);
    await handleBook(form.getFieldsValue());
    setLoadingCourtId(null);
  };

  const formatTime = (date: Dayjs | null | undefined) => {
    if (!date) return '';
    const hours = date.hour().toString().padStart(2, '0');
    const minutes = date.minute().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleBook = async (values: any) => {
    const startTime = formatTime(selectedTimeRange?.[0]);
    const endTime = formatTime(selectedTimeRange?.[1]);

    const newBooking: BookingByDay = {
      courtId: selectedCourt ?? 0,
      fromDate: new Date().toISOString(),
      fromTime: startTime ? startTime + ':00' : '',
      toTime: endTime ? endTime + ':00' : '',
      fullName: values.fullname,
      phoneNumber: values.phonenumber,
    };

    await bookingStore.createBooking(newBooking, toast)
      .then((value) => {
        if (value.res) {
          setIsModalVisible(false);
          form.resetFields();
        }
      })
  };

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
      setSelectedCourt(null);
      setAvailableSlots([]);
      setSelectedTimeRange(null)
      setTotalPrice(0);
    }
  }, [isModalVisible, form, authStore]);

  const isTimeRangeValid = () => {
    if (!selectedTimeRange || !selectedTimeRange[0] || !selectedTimeRange[1]) {
      return false;
    }

    const selectedStart = selectedTimeRange[0];
    const selectedEnd = selectedTimeRange[1];

    const duration = selectedEnd.diff(selectedStart, 'hour');

    if (duration < 1) {
      form.setFields([
        {
          name: 'totalPrice',
          errors: ['Thời gian đặt sân phải dài hơn 1 tiếng!'],
        },
      ]);
      return false;
    }

    form.setFields([
      {
        name: 'totalPrice',
        errors: [],
      },
    ]);

    const selectedStartFormatted = selectedStart.format("HH:mm");
    const selectedEndFormatted = selectedEnd.format("HH:mm");
    return availableSlots.some((slot) => {
      const [slotStart, slotEnd] = slot.split(" - ").map((time) => time.trim());
      if (selectedStartFormatted >= slotStart && selectedEndFormatted <= slotEnd) {
        form.setFields([
          {
            name: 'totalPrice',
            errors: [],
          },
        ]);
        return true
      }
      else {
        form.setFields([
          {
            name: 'totalPrice',
            errors: ['Thời gian đặt sân không hợp lệ!'],
          },
        ]);
        return false;
      }
    });
  };

  // const currentHour = dayjs().hour();
  // const disabledTime = () => ({
  //   disabledHours: () => {
  //     const hours = [];
  //     for (let i = 0; i < 24; i++) {
  //       if (i < currentHour + 1 || i > 22) {
  //         hours.push(i);
  //       }
  //     }
  //     return hours;
  //   },
  // });

  const calculatePrice = useCallback(
    (
      fromTime: string,
      toTime: string,
      courtPrices?: Array<{ fromTime: string; toTime: string; price: number }>
    ) => {
      const start = dayjs(`1970-01-01T${fromTime}`);
      const end = dayjs(`1970-01-01T${toTime}`);
      let totalPrice = 0;
      if (!courtPrices) return 0;
      courtPrices.forEach(({ fromTime, toTime, price }) => {
        const priceStart = dayjs(`1970-01-01T${fromTime}`);
        const priceEnd = dayjs(`1970-01-01T${toTime}`);

        const overlapStart = start.isAfter(priceStart) ? start : priceStart;
        const overlapEnd = end.isBefore(priceEnd) ? end : priceEnd;

        if (overlapStart.isBefore(overlapEnd)) {
          const overlapDuration = overlapEnd.diff(overlapStart, 'minute') / 60;
          totalPrice += overlapDuration * price;
        }
      });

      setTotalPrice(totalPrice);
      form.setFieldsValue({ totalPrice: totalPrice });
    },
    [form]
  );

  useEffect(() => {
    if (selectedTimeRange && selectedTimeRange[0] && selectedTimeRange[1])
      calculatePrice(dayjs(selectedTimeRange[0]).format('HH:mm'), dayjs(selectedTimeRange[1]).format('HH:mm'), courtPrices)
  }, [selectedTimeRange, selectedCourt, courtPrices, calculatePrice]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const phoneRules = [
    { required: true, message: 'Vui lòng nhập số điện thoại' },
    { pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' }
  ];
  return (
    <>
      <Button
        loading={loadingCourtId === courtClusterId}
        onClick={handleOpenModal}
        className="book-button"
      >
        Đặt sân ngay
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={windowWidth < 768 ? '100%' : 800}
        className="booking-form-modal"
        style={{ top: windowWidth < 768 ? 0 : 20 }}
      >
        <Form
          initialValues={{
            phonenumber: authStore.userApp?.phoneNumber,
            fullname: authStore.userApp?.displayName,
          }}
          form={form}
          onFinish={handleBookCourt}
          className="booking-form">
          <div className="form-header"
          >
            <h2>ĐẶT SÂN NHANH</h2>
          </div>

          <div className="section personal-info">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Title level={5}>Số điện thoại:</Title>
                <Form.Item
                  name="phonenumber"
                  rules={phoneRules}
                  required
                >
                  <Input placeholder="Nhập số điện thoại *"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
                      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }} />

                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Title level={5}>Tên:</Title>
                <Form.Item
                  name="fullname"
                  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                  required
                >
                  <Input type='tel' placeholder="Nhập số điện thoại" />

                </Form.Item>
              </Col>
            </Row>
          </div>

          {loadingSlot ? (
            <div className="section">
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          ) : (
            <>
              <div className="section court-selection">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <h3>CHỌN SÂN</h3>
                      <CourtSelection
                        availableSlot={availableSlot}
                        selectedCourt={selectedCourt}
                        handleCourtSelect={handleCourtSelect}
                      />
                      {selectedCourt && (
                        <div style={{ marginTop: '20px' }}>
                          <h3>CHỌN GIỜ</h3>
                          <BookingDetail
                            availableSlots={availableSlots}
                            setSelectedTimeRange={setSelectedTimeRange}
                          // disabledTime={disabledTime}
                          />
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col span={24}>
                    <div>
                      <h3>BẢNG GIÁ</h3>
                      <Table<DataType>
                        columns={columns}
                        dataSource={selectedCourt ? dataSelected : data}
                        pagination={false}
                        scroll={{ y: 250 }}
                        size='small'
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}

          {selectedTimeRange && selectedTimeRange[0] && selectedTimeRange[1] && (
            <div className="section">
              <Form.Item name="totalPrice">
                <div className="price-summary">
                  <div className="price-row total">
                    <h3 style={{ margin: 0 }}>Tổng tiền:</h3>
                    <span className="amount">
                      {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                  </div>
                </div>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
                loading={bookingStore.loadingCreate}
                disabled={!isTimeRangeValid()}
              >
                Đặt sân
              </Button>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
});

export default CourtBookingForm;
