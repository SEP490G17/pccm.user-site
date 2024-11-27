import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';

const { Text } = Typography;

interface ForgotPasswordPopUpProps {
    visible: boolean;
    onClose: () => void;
}

const ForgotPasswordPopUp: React.FC<ForgotPasswordPopUpProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const { accountStore } = useStore();
    const { loadingForgotPassword } = accountStore;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onFinish = async (values: { email: string }) => {
        try {
            await accountStore.forgotPassword(values.email);
            setTimeout(() => {
                setSuccessMessage(null);
                onClose();
            }, 700);
        } catch{
            form.setFields([
                {
                    name: 'email',
                    errors: ['Có lỗi xảy ra khi gửi mã xác nhận, vui lòng thử lại.'],
                },
            ]);
        }
    };

    return (
        <Modal
            title={<div style={{ textAlign: 'center' }}>Quên mật khẩu</div>}
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div>
                <Row justify="center" style={{ marginBottom: 20 }}>
                    <Col>
                        {/* Icon Lock */}
                        <LockOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </Col>
                </Row>
                <Form
                    form={form}
                    name="forgotPassword"
                    onFinish={onFinish}
                    initialValues={{ email: '' }}
                >
                    <Row style={{ marginBottom: 10 }}>
                        <Col>
                            <Text>Nhập email của bạn để nhận mã xác nhận:</Text>
                        </Col>
                    </Row>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                    {successMessage && (
                        <Row justify="center" style={{ marginBottom: 10 }}>
                            <Text style={{ color: 'green' }}>{successMessage}</Text>
                        </Row>
                    )}
                    <Row justify="center" style={{ marginBottom: 10 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ width: '40%' }}
                            loading={loadingForgotPassword}
                        >
                            {loadingForgotPassword ? 'Đang gửi...' : 'Gửi mã xác nhận'}
                        </Button>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default observer(ForgotPasswordPopUp);
