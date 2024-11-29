import React from 'react';
import { Modal, Button, Form, Input, Typography, Spin } from 'antd';
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

    // Xử lý sự kiện submit form
    const onFinish = (values: { email: string }) => {
        // Gọi store để gửi email yêu cầu
        accountStore.forgotPassword(values.email);
    };

    return (
        <Modal
            title="Quên mật khẩu"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div>
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

                    <Button type="primary" htmlType="submit" loading={loadingForgotPassword}>
                        Gửi mã xác nhận
                    </Button>
                </Form>
                {loadingForgotPassword && <Spin tip="Đang gửi email..." />}
            </div>
        </Modal>
    );
};

export default observer(ForgotPasswordPopUp);
