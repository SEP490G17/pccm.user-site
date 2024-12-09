import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store'; // Đảm bảo rằng store có thể truy cập

const { Text } = Typography;

interface ForgotPasswordPopUpProps {
    visible: boolean;
    onClose: () => void;
}

const ForgotPasswordPopUp: React.FC<ForgotPasswordPopUpProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const { accountStore } = useStore(); // Dùng store để truy cập accountStore
    const { loadingForgotPassword } = accountStore; // Lấy trạng thái loading từ store
    const [error, setError] = useState<any>(null);
    // Xử lý sự kiện submit form
    const onFinish = (values: { email: string }) => {
        // Gọi store để gửi email yêu cầu
        accountStore.forgotPassword(values.email)
            .then((value) => {
                if (value.err) {
                    setError(value.err.response.data);
                }
                if (value.res) {
                    setError(null);
                    form.resetFields();
                }
            })
            .catch();
    };

    return (
        <Modal
            title="Quên mật khẩu"
            open={visible}
            onCancel={() => (
                onClose(),
                setError(null),
                form.resetFields()
            )}
            footer={null}
            centered
        >
            <div>
                <Row justify="center" style={{ marginBottom: 20 }}>
                    <Col>
                        {/* Icon Lock */}
                        <LockOutlined style={{ fontSize: '48px', color: '#115363' }} />
                    </Col>
                </Row>
                <Form
                    form={form}
                    name="forgotPassword"
                    onFinish={onFinish}
                    initialValues={{ email: '' }}
                >
                    <Text>Nhập email của bạn để nhận mã xác nhận:</Text>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                    {error && <p className='text-red-500 text-left' style={{ paddingBottom: '20px' }}>{error}</p>}
                    <Row justify="center" style={{ marginBottom: 10 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ width: '40%', backgroundColor:'#115363' }}
                            loading={loadingForgotPassword}
                        >
                            Gửi mã xác nhận
                        </Button>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default observer(ForgotPasswordPopUp);
