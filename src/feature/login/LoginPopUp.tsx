import React, { useState } from 'react';
import { Modal, Button, Typography, Form, Input, Checkbox } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserFormValues } from '@/app/models/user.model';
import { useStore } from '@/app/stores/store';
import { GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons'; // Import icons from Ant Design
import styles from './LoginPopUp.module.scss';

const { Link, Text } = Typography;

interface LoginPopUpProps {
    visible: boolean;
    onClose: () => void;
}

const LoginPopUp: React.FC<LoginPopUpProps> = ({ visible, onClose }) => {
    const { authStore } = useStore();
    const [isSignUp, setIsSignUp] = useState(false);

    const initialValues: UserFormValues = { username: '', password: '' };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username/SDT bắt buộc'),
        password: Yup.string().required('Password bắt buộc'),
    });

    const handleSubmit = async (values: UserFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await authStore.login(values);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title={null}
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            bodyStyle={{ padding: '0' }}
            className={`${styles.container} ${isSignUp ? styles.active : ''}`}
        >
            <div className={styles.formContainer}>
                <div className={`${styles.signIn} ${!isSignUp ? styles.activeSignIn : ''}`}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, isValid, isSubmitting, setFieldValue }) => (
                            <Form name="login" onFinish={handleSubmit} autoComplete="off" style={{ textAlign: 'center' }}>
                                <h1 className={styles.title}>Sign In</h1>
                                <div className={styles.socialIcons}>
                                    <Button icon={<GoogleOutlined />} className={styles.icon} />
                                    <Button icon={<FacebookOutlined />} className={styles.icon} />
                                    <Button icon={<GithubOutlined />} className={styles.icon} />
                                    <Button icon={<LinkedinOutlined />} className={styles.icon} />
                                </div>
                                <span className={styles.text}>or use your email for login</span>
                                <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập SDT/Username!' }]}>
                                    <Input className={styles.input} onChange={(e) => setFieldValue('username', e.target.value)} placeholder="Nhập SDT/Username" />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                    <Input.Password className={styles.input} onChange={(e) => setFieldValue('password', e.target.value)} placeholder="Nhập mật khẩu" />
                                </Form.Item>
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox className={styles.checkboxWrapper} onChange={(e) => setFieldValue('remember', e.target.checked)}>Ghi nhớ đăng nhập</Checkbox>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.submitButton} block disabled={!isValid || isSubmitting} loading={isSubmitting}>ĐĂNG NHẬP</Button>
                                <Text style={{ textAlign: 'center', marginTop: '16px' }}>
                                    <Link href="#" style={{ color: '#1890ff' }}>Quên mật khẩu?</Link>
                                </Text>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={`${styles.signUp} ${isSignUp ? styles.activeSignUp : ''}`}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ handleSubmit, isValid, isSubmitting, setFieldValue }) => (
                            <Form name="register" onFinish={handleSubmit} autoComplete="off">
                                <h1>Create Account</h1>
                                <div className={styles.socialIcons}>
                                    <Button icon={<GoogleOutlined />} className={styles.icon} />
                                    <Button icon={<FacebookOutlined />} className={styles.icon} />
                                    <Button icon={<GithubOutlined />} className={styles.icon} />
                                    <Button icon={<LinkedinOutlined />} className={styles.icon} />
                                </div>
                                <span>or use your email for registration</span>
                                <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                                    <Input className={styles.input} onChange={(e) => setFieldValue('username', e.target.value)} placeholder="Name" />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                    <Input.Password className={styles.input} onChange={(e) => setFieldValue('password', e.target.value)} placeholder="Password" />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.submitButton} block disabled={!isValid || isSubmitting} loading={isSubmitting}>SIGN UP</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className={`${styles.toggleContainer} ${isSignUp ? styles.signUpActive : ''}`}>
                <div className={styles.toggle}>
                    <div className={styles.togglePanel}>
                        <h1>{isSignUp ? "Hello, Friend!" : "Welcome Back!"}</h1>
                        <p>{isSignUp ? "Nhập thông tin cá nhân và bắt đầu hành trình với chúng tôi." : "Để giữ kết nối, vui lòng đăng nhập bằng thông tin cá nhân của bạn."}</p>
                        <button className={styles.toggleButton} onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoginPopUp;
