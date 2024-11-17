import React, { useEffect } from 'react';
import { Modal, Button, Typography, Form, Input, Checkbox } from 'antd';
import { useStore } from '@/app/stores/store';
import styles from './LoginPopUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '@/app/models/account.model';
import { observer } from 'mobx-react';

const { Link } = Typography;

interface LoginPopUpProps {
    visible: boolean;
    onClose: () => void;
}

const LoginPopUp: React.FC<LoginPopUpProps> = ({ visible, onClose }) => {
    const { authStore } = useStore();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (!visible) {
            form.resetFields();
        }
    }, [visible, form]);

    const handleLogin = async (values: any) => {
        const data = new LoginDto({
            username: values.username,
            password: values.password,
        });
        await authStore.login(data)
            .then(onClose)
            .catch()
    };

    return (
        <Modal
            title={null}
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div className={styles.formContainer}>
                <div className={`${styles.signIn}`}>
                    <Form
                        form={form}
                        name="login"
                        autoComplete="off"
                        style={{ textAlign: 'center' }}
                        onFinish={handleLogin}
                    >
                        <h1 className={styles.title}>ĐĂNG NHẬP</h1>
                        <div className={styles.socialIcons}>
                            {/* <Button icon={<GoogleOutlined />} className={styles.icon} />
                            <Button icon={<FacebookOutlined />} className={styles.icon} />
                            <Button icon={<GithubOutlined />} className={styles.icon} />
                            <Button icon={<LinkedinOutlined />} className={styles.icon} /> */}
                        </div>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            validateTrigger={['onBlur', 'onChange']}
                        >
                            <Input className={styles.input} placeholder="Nhập SDT/Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            validateTrigger={['onBlur', 'onChange']}
                        >
                            <Input.Password className={styles.input} placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox className={styles.checkboxWrapper}>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>

                        <Button loading={authStore.loadingLogin} type="primary" htmlType="submit" className={styles.submitButton} block>
                            ĐĂNG NHẬP
                        </Button>
                        <Link href="#" style={{ color: '#115363' }}>Quên mật khẩu?</Link>
                    </Form>
                </div>


            </div>
            <div className={`${styles.toggleContainer}`}>
                <div className={styles.toggle}>
                    <div className={styles.togglePanel}>
                        <h1>Chào mừng trở lại</h1>
                        <p>Để giữ kết nối, vui lòng đăng nhập bằng thông tin cá nhân của bạn.</p>
                        <Button
                            className={styles.toggleButton}
                            onClick={() => {
                                navigate('/register');
                                onClose();
                            }}
                        >
                            {"Đăng kí"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default observer(LoginPopUp);
