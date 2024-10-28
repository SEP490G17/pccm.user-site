import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './style/ChangePasswordPopUp.scss';

interface ChangePasswordPopUpProps {
    visible: boolean;
    onClose: () => void;
}

const ChangePasswordPopUp: React.FC<ChangePasswordPopUpProps> = ({ visible, onClose }) => {
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
                    // Call API to change the password here
                    console.log('Password changed:', values);
                    resetForm();
                    onClose();
                }}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="modal-body">
                        <Form.Item
                            label="Current Password"
                            help={errors.currentPassword && touched.currentPassword ? errors.currentPassword : null}
                            validateStatus={touched.currentPassword && errors.currentPassword ? 'error' : ''}
                        >
                            <Input.Password
                                name="currentPassword"
                                onChange={handleChange}
                                value={values.currentPassword}
                            />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
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
                            label="Confirm New Password"
                            help={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
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
