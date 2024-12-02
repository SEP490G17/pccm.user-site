import React from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './style/ChangePasswordPopUp.scss';
import { ChangePasswordInput } from '@/app/models/account.model';
import { useStore } from '@/app/stores/store';

interface ChangePasswordPopUpProps {
  visible: boolean;
  onClose: () => void;
}

const ChangePasswordPopUp: React.FC<ChangePasswordPopUpProps> = ({ visible, onClose }) => {
  const { accountStore } = useStore();
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <Modal
      title="Đổi mật khẩu"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="change-password-modal"
      width="60%"
      destroyOnClose
    >
      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const changeInput = new ChangePasswordInput({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          });
          accountStore.changePassword(changeInput);
          resetForm();
          onClose();
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className="modal-body">
            <Row gutter={16}>
              <Col xs={24} sm={24} >
                <Form.Item
                  label="Mật khẩu hiện tại"
                  help={errors.currentPassword && touched.currentPassword ? errors.currentPassword : null}
                  validateStatus={touched.currentPassword && errors.currentPassword ? 'error' : ''}
                >
                  <Input.Password
                    name="currentPassword"
                    onChange={handleChange}
                    value={values.currentPassword}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} >
                <Form.Item
                  label="Mật khẩu mới"
                  help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                  validateStatus={touched.newPassword && errors.newPassword ? 'error' : ''}
                >
                  <Input.Password
                    name="newPassword"
                    onChange={handleChange}
                    value={values.newPassword}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} >
                <Form.Item
                  label="Xác nhận mật khẩu mới"
                  help={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                  validateStatus={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
                >
                  <Input.Password
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="modal-footer">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Button type="default" onClick={onClose} block>
                    Hủy
                  </Button>
                </Col>
                <Col xs={24} sm={12}>
                  <Button type="default" style={{ backgroundColor: '#115363', color: 'white' }} htmlType="submit" block>
                    Xác nhận
                  </Button>
                </Col>
              </Row>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePasswordPopUp;
