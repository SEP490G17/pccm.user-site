import { Modal, Button, Form, Typography, Space, Input, Row, Col, Skeleton, Table, TableColumnsType, Flex } from 'antd';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { observer } from "mobx-react-lite";
import { useStore } from '@/app/stores/store';
import { CourtPrice, IBookingModel, ISlots } from '@/app/models/booking.model';
import CourtSelection from './CourtSelection';
import BookingDetail from './BookingDetail';

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

const CourtBookingForm = ({ courtClusterId, loadingCourtId, setLoadingCourtId }: IProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [availablePrices, setAvailablePrices] = useState<CourtPrice[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const { bookingStore } = useStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { availableSlot, loadingSlot, courtPrice } = bookingStore;

  const handleOpenModal = async () => {
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
      >
        <Form form={form} onFinish={handleBookCourt}>
          <h2>ĐẶT SÂN NHANH</h2>
          <Space direction="vertical" style={{ width: '100%', paddingBottom: '1rem' }}>
            <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
              <Col span={12}>
                <Title level={5} style={{ textAlign: 'left' }}>Số điện thoại:</Title>
                <Form.Item
                  name="phonenumber"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input className="input" placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Title level={5} style={{ textAlign: 'left' }}>Tên:</Title>
                <Form.Item
                  name="fullname"
                  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                  <Input className="input" placeholder="Nhập tên" />
                </Form.Item>
              </Col>
            </Row>

            {loadingSlot ? (
              <Skeleton
                paragraph={{ rows: 4 }}
                active
                style={{ height: "100%", width: '100%' }}
              />
            ) : (
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <CourtSelection
                    availableSlot={availableSlot}
                    selectedCourt={selectedCourt}
                    handleCourtSelect={handleCourtSelect}
                  />
                  {selectedCourt && (
                    <BookingDetail
                      availableSlots={availableSlots}
                      setSelectedTimeRange={setSelectedTimeRange}
                      disabledTime={disabledTime}
                    />
                  )}
                </Col>
                <Col span={12}>
                  <Flex vertical>
                    <h3>BẢNG GIÁ</h3>
                    <Table<DataType>
                      columns={columns}
                      dataSource={selectedCourt ? datav1 : data}
                      pagination={false}
                      scroll={{ y: 250 }}
                      size='small'
                    />
                  </Flex>
                </Col>
              </Row>
            )}
            {selectedTimeRange && selectedTimeRange[0] && selectedTimeRange[1] && (
              <>

                <Form.Item
                  name="totalPrice"
                >
                  <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginTop: '1rem' }}>
                    <h3 style={{ margin: 0 }}>
                      Tổng tiền:
                    </h3>
                    <h4 style={{ margin: '0 0 0 10px', color: '#ff4d4f' }}>
                      {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </h4>
                  </div>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#115363',
                    color: 'white',
                  }}
                  loading={bookingStore.loadingCreate}
                  disabled={!isTimeRangeValid()}
                >
                  Đặt sân
                </Button>
              </>

            )}
          </Space>
        </Form>
      </Modal >
    </>
  );
};

export default observer(CourtBookingForm);
