import { Card, DatePicker, Divider, Flex, Form, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function BookWithRequirement() {
  return (
    <Card className="formBook">
      <Flex style={{ marginBottom: '1rem'}}>
        <Typography.Text style={{ fontSize: '1.3rem', fontWeight:'bolder' }}><Divider type="vertical" className="divider" style={{border: '2px solid green', height: '20px'}}/>Xem chi tiết</Typography.Text>
      </Flex>
      <Form>
        <Form.Item>
          <Input style={{height:'40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item>
          <Input style={{height:'40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Input style={{height:'40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item>
          <DatePicker showTime={{ format: 'HH:mm' }} style={{width:'100%', height:'40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} />
        </Form.Item>
        <Form.Item>
          <Input
            type="number"
            min={1}
            style={{height:'40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            placeholder="Số giờ thuê"
          />
        </Form.Item>
        <Form.Item>
          <TextArea rows={4} placeholder="Ghi chú" />
        </Form.Item>
      </Form>
    </Card>
  );
}
