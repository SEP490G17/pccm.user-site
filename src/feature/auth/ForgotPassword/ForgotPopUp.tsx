import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import agent from '../../../app/api/agent';

const { Title } = Typography;

interface ForgotPopUpProps {
    token: string;
    onClose: () => void; 
}

const ForgotPopUp: React.FC<ForgotPopUpProps> = ({ token, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: { newPassword: string; confirmPassword: string }) => {
        if (values.newPassword !== values.confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        setLoading(true);
        try {
            console.log("Token sử dụng để đặt lại mật khẩu:", token);
            await agent.Account.confirmForgotPassword({
                token,
                newPassword: values.newPassword,
            });
            toast.success('Mật khẩu đã được đặt lại thành công!');
            form.resetFields();
            navigate('/');
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={true}
            title={<Title level={4}>Đặt lại mật khẩu</Title>}
            footer={null}
            onCancel={onClose} 
            centered
            closable={true} 
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                        { min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự!' },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự!' },
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu mới" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block loading={loading}>
                    Đặt lại mật khẩu
                </Button>
            </Form>
        </Modal>
    );
};

export default ForgotPopUp;
