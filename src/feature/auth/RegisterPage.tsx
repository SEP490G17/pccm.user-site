import { Form, Input, Button, Row, Col } from 'antd';
import styles from './LoginPopUp.module.scss';
import { useStore } from '@/app/stores/store';
import { RegisterDto } from '@/app/models/account.model';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react';
import { useState } from 'react';
import LoginPopUp from './LoginPopUp';

const RegisterPage = () => {
    const { accountStore } = useStore();
    const { register } = accountStore;
    const [form] = Form.useForm();
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);

    const onFinish = async (values: any) => {
        const data = new RegisterDto({
            displayName: values.displayname,
            email: values.email,
            firstName: values.firstname,
            lastName: values.lastname,
            password: values.password,
            phoneNumber: values.phone,
            username: values.username
        });


        await register(data)
            .then(() => form.resetFields())
    };

    const validatePassword = (_: any, value: any) => {
        if (!value) {
            return Promise.reject(new Error('Vui lòng nhập mật khẩu'));
        }
        const rules = [
            { pattern: /[A-Z]/, message: 'ít nhất một chữ hoa' },
            { pattern: /[0-9]/, message: 'ít nhất một số' },
            { pattern: /[!@#$%^&*]/, message: 'ít nhất một ký tự đặc biệt' },
            { pattern: /^.{8,}$/, message: 'ít nhất 8 ký tự' },
        ];

        const failedRules = rules.filter(rule => !rule.pattern.test(value));
        if (failedRules.length > 0) {
            const messages = failedRules.map(rule => rule.message).join(', ');
            return Promise.reject(new Error(`Mật khẩu phải chứa ${messages}`));
        }

        return Promise.resolve();
    };

    const phoneRules = [
        { required: true, message: 'Vui lòng nhập số điện thoại' },
        { pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' }
    ];

    return (
        <>
            <div className="registration-form-container"
                style={{ width: '50%', margin: '50px auto', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '8px', backgroundColor: '#fff' }}>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <h1 style={{ margin: '0 auto 30px' }}>ĐĂNG KÝ</h1>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                rules={phoneRules}
                            >
                                <Input className={styles.input} placeholder="Số điện thoại *" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { type: 'email', message: 'Vui lòng nhập email hợp lệ' },
                                    { required: true, message: 'Vui lòng nhập email' }
                                ]}
                            >
                                <Input className={styles.input} placeholder="Email *" />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="firstname"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập họ' }
                                ]}
                            >
                                <Input className={styles.input} placeholder="Họ *" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="lastname"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên' }
                                ]}
                            >
                                <Input className={styles.input} placeholder="Tên *" />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="displayname"
                                rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị' }]}
                            >
                                <Input className={styles.input} placeholder="Tên hiển thị *" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên đăng nhập' }
                                ]}
                            >
                                <Input className={styles.input} placeholder="Tên đăng nhập *" />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                rules={[{ validator: validatePassword }]}
                                hasFeedback
                            >
                                <Input.Password className={styles.input} placeholder="Mật khẩu *" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Xác nhận mật khẩu là bắt buộc' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Hai mật khẩu không khớp nhau!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password className={styles.input} placeholder="Xác nhận mật khẩu *" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button loading={accountStore.loadingRegister} className={styles.button} htmlType="submit" block>
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        Bạn đã có tài khoản? &nbsp;<Button onClick={() => (setLoginModalVisible(true))} type="link" style={{ color: 'black', fontSize: '15px', border: '0', padding: '0', fontWeight: 'bold' }}>Đăng nhập</Button>
                    </Form.Item>
                </Form>
                <LoginPopUp visible={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />
            </div >

        </>
    );
};

export default observer(RegisterPage);
