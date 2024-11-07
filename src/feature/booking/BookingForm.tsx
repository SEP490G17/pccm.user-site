import { Modal, Button, Form, Typography, Space, Input, Row, Col, Tag, Flex, TimePicker } from 'antd';
import { useState, useEffect } from 'react';

const { Title } = Typography;

const CourtIcon = ({ number, isSelected }) => {
  return (
    <div style={{
      width: '70px',
      height: '40px',
      backgroundColor: isSelected ? '#45a049' : '#4CAF50', // Highlight when selected
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: isSelected ? '3px solid #fff' : '2px solid #fff', // Add border to selected
      borderRadius: '4px',
      color: '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
      boxShadow: isSelected ? '0 6px 12px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.2)', // Bigger shadow on selection
      transition: 'transform 0.2s',
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(white, white) 0% 0% / 2px 100%, linear-gradient(white, white) 0% 100% / 100% 2px',
        backgroundPosition: '0 0, 0 0',
        backgroundSize: '100% 100%',
        borderRadius: '4px',
        opacity: 0.5,
      }} />
      {number}
    </div>
  );
};

const CourtBookingForm = ({ courts, onBook }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);  // Selected court ID
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBook = (values: any) => {
    onBook(values);
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
      setSelectedCourt(null);
      setAvailableSlots([]);
    }
  }, [isModalVisible, form]);

  const handleCourtSelect = (courtId: number) => {
    setSelectedCourt(courtId);
    const selectedCourtDetails = courts.find((court: any) => court.id === courtId);
    setAvailableSlots(selectedCourtDetails?.availableSlots || []);
    form.setFieldsValue({ timeSlot: undefined });
  };

  return (
    <>
      <Button onClick={handleOpenModal} className="book-button">
        Đặt sân ngay
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleBook}>
          <h2>ĐẶT SÂN NHANH</h2>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={5} style={{ textAlign: 'left' }}>Số điện thoại:</Title>
            <Form.Item
              name="phonenumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
              <Input className="input" placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Title level={5} style={{ textAlign: 'left' }}>Chọn sân:</Title>
            <Row gutter={16}>
              {courts.map((court: any) => (
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
                    <CourtIcon number={court.number} isSelected={selectedCourt === court.id} />
                  </div>
                </Col>
              ))}
            </Row>

            {selectedCourt && (
              <>
                <Title level={5} style={{ textAlign: 'left' }}>Các giờ còn trống:</Title>
                <Flex>
                  <Space direction="horizontal" style={{ justifyContent: 'flex-start' }}>
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot: string) => (
                        <Tag
                          key={slot}
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
                </Flex>
              </>
            )}
            <Title level={5} style={{ textAlign: 'left' }}>Chọn giờ thuê:</Title>
            <Flex>
              <TimePicker.RangePicker
                format="HH:00"
                style={{ width: '50%' }}
                onChange={(value) => {
                  console.log('Selected time range:', value);
                }}
              />
            </Flex>
            <Button type="primary" htmlType="submit">
              Đặt sân
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default CourtBookingForm;
