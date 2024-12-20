import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, Form, Input, Checkbox } from 'antd';
import { useStore } from '@/app/stores/store';
import styles from './LoginPopUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '@/app/models/account.model';
import { observer } from 'mobx-react-lite';
import ForgotPasswordPopUp from '../auth/ForgotPassword/ForgotPasswordPopUp';

const { Link } = Typography;

interface LoginPopUpProps {
  visible: boolean;
  onClose: () => void;
}

const LoginPopUp = observer(({ onClose }: LoginPopUpProps) => {
  const { authStore } = useStore();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const { visible, loadingLogin } = authStore;
  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setError(null);
    }
  }, [visible, form]);
  const [error, setError] = useState<any>(null);
  const handleLogin = async (values: any) => {
    const data = new LoginDto({
      username: values.username,
      password: values.password,
    });
    await authStore
      .login(data)
      .then((value) => {
        if (value.err) {
           setError(value.err.response?.data);
        }
        if (value.res) {
          setError(null);
          authStore.setVisible(false);
        }
      })
      .catch();
  };

  return (
    <>
      <Modal
        title={null}
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        width={'60rem'}
      >
        <div className={styles.formContainer}>
          <div className={`${styles.signIn} `} style={!isMobile ? { width: '50%' } : {}}>
            <Form
              form={form}
              name="login"
              initialValues={{
                username: 'trongnp144',
                password: '123456aA@'
              }}
              autoComplete="off"
              style={{ textAlign: 'center' }}
              onFinish={handleLogin}
            >
              <h1 className={`${styles.title} mb-5`}>ĐĂNG NHẬP</h1>
              {error && <p className='text-red-500 text-left mb-3'>{error}</p>}

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
              <Button
                loading={loadingLogin}
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
                block
              >
                ĐĂNG NHẬP
              </Button>
              <Link
                onClick={() => {
                  setForgotPasswordVisible(true);
                  onClose();
                }}
                style={{ color: '#115363' }}
              >
                Quên mật khẩu?
              </Link>
            </Form>
          </div>
        </div>
        {!isMobile && (
          <div className={`${styles.toggleContainer}`}>
            <div className={styles.toggle}>
              <div className={styles.togglePanel}>
                <h1>Chào mừng trở lại</h1>
                <p>Để giữ kết nối, vui lòng đăng nhập bằng thông tin cá nhân của bạn.</p>
                <Button
                  className={styles.toggleButton}
                  onClick={() => {
                    navigate('/dang-ki');
                    onClose();
                  }}
                >
                  {'Đăng kí'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ForgotPasswordPopUp
        visible={forgotPasswordVisible}
        onClose={() => setForgotPasswordVisible(false)}
      />
    </>
  );
});

export default LoginPopUp;
