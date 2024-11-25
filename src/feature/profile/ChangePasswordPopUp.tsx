import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './style/ChangePasswordPopUp.scss';
import { ChangePasswordInput } from '@/app/models/account.model';
import AccountStore from '@/app/stores/accountStore';
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
      title="Change Password"
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="change-password-modal"
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
            <Form.Item
              label="Mật khẩu cũ"
              help={
                errors.currentPassword && touched.currentPassword ? errors.currentPassword : null
              }
              validateStatus={touched.currentPassword && errors.currentPassword ? 'error' : ''}
            >
              <Input.Password
                name="currentPassword"
                onChange={handleChange}
                value={values.currentPassword}
              />
            </Form.Item>

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

            <Form.Item
              label="Nhập lại mật khẩu mới"
              help={
                errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null
              }
              validateStatus={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
            >
              <Input.Password
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </Form.Item>

            <div className="modal-footer">
              <Button type="default" onClick={onClose}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePasswordPopUp;
