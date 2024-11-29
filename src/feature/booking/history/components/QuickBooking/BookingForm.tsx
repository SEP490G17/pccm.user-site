import './style/BookingForm.scss';

import { CourtPrice, IBookingModel, ISlots } from '@/app/models/booking.model';
import { Button, Col, Form, Input, Modal, Row, Skeleton, Table, TableColumnsType, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useStore } from '@/app/stores/store';
import { observer } from "mobx-react-lite";
import BookingDetail from './BookingDetail';
import CourtSelection from './CourtSelection';

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
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [availablePrices, setAvailablePrices] = useState<CourtPrice[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const { bookingStore, authStore } = useStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { availableSlot, loadingSlot, courtPrice } = bookingStore;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const handleOpenModal = async () => {
    if(!authStore.isLoggedIn){
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

  const datav1: DataType[] = (availablePrices ?? [])
    .map((price, index) => ({
      key: index + 1,
      courtName: price.courtName,
      time: price.time,
      priceCourt: price.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }));

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

  const handleBook = async (values: any) => {
    const startTime = selectedTimeRange?.[0]?.toISOString();
    const endTime = selectedTimeRange?.[1]?.toISOString();

    const bookingDetails = new IBookingModel({
      totalPrice: values.totalPrice,
      fullName: values.fullname,
      phoneNumber: values.phonenumber,
      courtId: selectedCourt ?? 0,
      startTime: startTime,
      endTime: endTime,
    });

    bookingStore.createBooking(bookingDetails)
      .then(() => {
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Booking creation failed', error);
      });
  };

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
      setSelectedCourt(null);
      setAvailableSlots([]);
      setSelectedTimeRange(null)
      setTotalPrice(0);
    }
  }, [isModalVisible, form]);

  const isTimeRangeValid = () => {
    if (!selectedTimeRange || !selectedTimeRange[0] || !selectedTimeRange[1]) {
      return false;
    }

    const selectedStart = selectedTimeRange[0].format("HH:mm");
    const selectedEnd = selectedTimeRange[1].format("HH:mm");
    return availableSlots.some((slot) => {
      const [slotStart, slotEnd] = slot.split(" - ").map((time) => time.trim());
      return (
        selectedStart >= slotStart && selectedEnd <= slotEnd
      );
    });
  };

  const currentHour = dayjs().hour();
  const disabledTime = () => ({
    disabledHours: () => {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        if (i < currentHour + 1 || i > 22) {
          hours.push(i);
        }
      }
      return hours;
    },
  });

  const calculateTotalPrice = () => {
    if (!selectedTimeRange || !selectedTimeRange[0] || !selectedTimeRange[1] || !selectedCourt) return;
    const selectedCourtPrice = availablePrices.filter((price) => price.courtId === selectedCourt);
    const timeRates = selectedCourtPrice.map(item => {
      const [start, end] = item.time.split(" - ");
      return {
        start: dayjs().hour(parseInt(start.split(":")[0])).minute(parseInt(start.split(":")[1])).second(parseInt(start.split(":")[1])),
        end: dayjs().hour(parseInt(end.split(":")[0])).minute(parseInt(end.split(":")[1])).second(parseInt(start.split(":")[1])),
        rate: item.price
      };
    });

    const start = selectedTimeRange[0];
    const end = selectedTimeRange[1];
    let totalPrice = 0;

    timeRates.forEach(rate => {
      const rateStart = rate.start;
      const rateEnd = rate.end;
      const ratePrice = rate.rate;

      if (start.isBefore(rateEnd) && end.isAfter(rateStart)) {
        const actualStart = start.isBefore(rateStart) ? rateStart : start;
        const actualEnd = end.isAfter(rateEnd) ? rateEnd : end;
        const duration = Math.round(actualEnd.diff(actualStart, 'hour', true));

        totalPrice += duration * ratePrice;
      }
    });

    setTotalPrice(totalPrice);
    form.setFieldsValue({ totalPrice: totalPrice });
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedTimeRange, selectedCourt]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={windowWidth < 768 ? '100%' : 800}
        className="booking-form-modal"
        style={{ top: windowWidth < 768 ? 0 : 20 }}
      >
        <Form form={form} onFinish={handleBookCourt} className="booking-form">
          <div className="form-header">
            <h2>ĐẶT SÂN NHANH</h2>
          </div>

          <div className="section personal-info">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Title level={5}>Số điện thoại:</Title>
                <Form.Item
                  name="phonenumber"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Title level={5}>Tên:</Title>
                <Form.Item
                  name="fullname"
                  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                  <Input placeholder="Nhập tên" />
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
                            disabledTime={disabledTime}
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
                        dataSource={selectedCourt ? datav1 : data}
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
