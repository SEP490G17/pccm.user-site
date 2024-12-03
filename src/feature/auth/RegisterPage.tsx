import { Form, Input, Button, Row, Col } from 'antd';
import styles from './LoginPopUp.module.scss';
import { useStore } from '@/app/stores/store';
import { RegisterDto } from '@/app/models/account.model';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite';

import { toast } from 'react-toastify';

const RegisterPage = () => {
    const { accountStore, authStore } = useStore();
    const { register } = accountStore;
    const [form] = Form.useForm();

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
            .then((value) => {
                if (value.err !== undefined) {
                    toast.error(value.err.toString());
                } else {
                    toast.success("Tạo tài khoản thành công");
                }
            })
            .catch(() => toast.error("Đã xảy ra lỗi"));
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
        <div
            className={styles['registration-form-container']}
        >
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                layout="vertical"
                scrollToFirstError
            >
                <h2 className={styles['form-title']}>ĐĂNG KÝ</h2>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item name="phone" rules={phoneRules}>

                            <Input
                                className={styles.input}
                                placeholder="Số điện thoại *"
                                onKeyDown={(e) => {
                                    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
                                    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
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
                    <Col xs={24} sm={12}>
                        <Form.Item name="firstname" rules={[{ required: true, message: 'Vui lòng nhập họ' }]}>
                            <Input className={styles.input} placeholder="Họ *" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item name="lastname" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                            <Input className={styles.input} placeholder="Tên *" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                            <Input className={styles.input} placeholder="Tên đăng nhập *" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item name="password" rules={[{ validator: validatePassword }]} hasFeedback>
                            <Input.Password className={styles.input} placeholder="Mật khẩu *" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
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
                    <Button
                        loading={accountStore.loadingRegister}
                        className={styles.button}
                        htmlType="submit"
                        block
                    >
                        Đăng ký
                    </Button>
                </Form.Item>

                <Form.Item>
                    Bạn đã có tài khoản? &nbsp;
                    <Button
                        onClick={() => authStore.setVisible(true)}
                        type="link"
                        className={styles['login-link']}
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(RegisterPage);
