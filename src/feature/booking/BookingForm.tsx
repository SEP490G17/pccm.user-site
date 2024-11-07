import { Modal, Button, Form, Typography, Space, Input, Row, Col, Tag, TimePicker, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { observer } from "mobx-react-lite";
import { useStore } from '@/app/stores/store';
import { IBookingModel, ISlots } from '@/app/models/booking.model';
import CourtIcon from './components/CourtIcon';

const { Title } = Typography;

interface IProps {
  courtClusterId: number;
  loadingCourtId: number | null;
  setLoadingCourtId: (id: number | null) => void;
}

const CourtBookingForm = ({ courtClusterId, loadingCourtId, setLoadingCourtId }: IProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const { bookingStore } = useStore();
  const { availableSlot, loadingSlot } = bookingStore;

  const handleOpenModal = async () => {
    setLoadingCourtId(courtClusterId);
    setIsModalVisible(true);
    await bookingStore.loadSlots(new ISlots({ date: dayjs().format('YYYY-MM-DD'), courtClusterId }));
    setLoadingCourtId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCourtSelect = (courtId: number) => {
    setSelectedCourt(courtId);
    const selectedCourtDetails = availableSlot?.find((court: any) => court.id === courtId);
    setAvailableSlots(selectedCourtDetails?.availableSlots || []);
    form.setFieldsValue({ timeSlot: undefined });
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
      phoneNumber: values.phonenumber,
      courtId: selectedCourt ?? 0,
      startTime: startTime,
      endTime: endTime,
      courtClusterId: courtClusterId,
      recurrenceRule: "",
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
      setSelectedTimeRange(null);
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

  return (
    <>
      <Button loading={loadingCourtId === courtClusterId}
        onClick={handleOpenModal} className="book-button">
        Đặt sân ngay
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleBookCourt}>
          <h2>ĐẶT SÂN NHANH</h2>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={5} style={{ textAlign: 'left' }}>Số điện thoại:</Title>
            <Form.Item
              name="phonenumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input className="input" placeholder="Nhập số điện thoại" />
            </Form.Item>
            {
              loadingSlot ? (
                <Skeleton
                  paragraph={{ rows: 2 }}
                  active
                  style={{ height: "100%", width: '100%' }}
                />
              ) : (
                <>
                  <Row gutter={16}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <Title level={5} style={{ textAlign: 'left' }}>Chọn sân:</Title>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {availableSlot?.map((court: any) => (
                          <Col key={court.id}>
                            <div
                              style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginBottom: '1rem'
                              }}
                              onClick={() => handleCourtSelect(court.id)}
                            >
                              <CourtIcon name={court.name} isSelected={selectedCourt === court.id} />
                            </div>
                          </Col>
                        ))}
                      </div>
                    </div>
                  </Row>

                  {selectedCourt && (
                    <>
                      <Title level={5} style={{ textAlign: 'left' }}>Các giờ còn trống:</Title>
                      <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                          <Space direction="horizontal" style={{ justifyContent: 'flex-start' }}>
                            {availableSlots.length > 0 ? (
                              availableSlots.map((slot: string, index) => (
                                <Tag
                                  key={index}
                                  color="green"
                                  onClick={() => form.setFieldsValue({ timeSlot: slot })}
                                  style={{ cursor: 'pointer', margin: '4px' }}
                                >
                                  {slot}
                                </Tag>
                              ))
                            ) : (
                              <span>Không có giờ trống!</span>
                            )}
                          </Space>
                        </div>
                      </div>

                      <Title level={5} style={{ textAlign: 'left' }}>Chọn giờ thuê:</Title>
                      <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                          <TimePicker.RangePicker
                            allowClear
                            format={"HH:00"}
                            inputReadOnly
                            needConfirm={false}
                            style={{ width: '40%' }}
                            onChange={(value) => {
                              if (value) {
                                setSelectedTimeRange([value[0], value[1]]);
                              }
                            }}
                            disabledTime={disabledTime}
                            placeholder={["Giờ bắt đầu", "Giờ kết thúc"]}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        {selectedTimeRange && selectedTimeRange[0] && selectedTimeRange[1] && (
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%', marginTop: '30px', backgroundColor: '#115363', color: 'white' }}
                            disabled={!isTimeRangeValid()}
                          >
                            Đặt sân
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </>
              )
            }
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default observer(CourtBookingForm);
