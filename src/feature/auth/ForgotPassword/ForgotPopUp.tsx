import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';
import agent from '../../../app/api/agent';
import { router } from '@/app/router/Routes';

const { Title } = Typography;

interface ForgotPopUpProps {
    token: string;
}

const ForgotPopUp: React.FC<ForgotPopUpProps> = ({ token }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { newPassword: string; confirmPassword: string }) => {
        if (values.newPassword !== values.confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        setLoading(true);
        try {
            // Gửi yêu cầu đổi mật khẩu lên server
            await agent.Account.confirmForgotPassword({
                token,
                newPassword: values.newPassword,
            });
            toast.success('Mật khẩu đã được đặt lại thành công!');
            form.resetFields();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
            router.navigate('/');
        }
    };

    return (
        <Modal
            open={true}
            title={<Title level={4}>Đặt lại mật khẩu</Title>}
            footer={null}
            closable={false}
            centered
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

                <Button type="primary" style={{backgroundColor:'#115363'}} htmlType="submit" block loading={loading}>
                    Đặt lại mật khẩu
                </Button>
            </Form>
        </Modal>
        
    );
};

export default ForgotPopUp;
