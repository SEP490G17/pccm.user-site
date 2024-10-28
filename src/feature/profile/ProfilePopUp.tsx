// ProfilePopUp.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './style/ProfilePopUp.scss';

interface ProfilePopUpProps {
    visible: boolean;
    onClose: () => void;
    userProfile: {
        fullName: string;
        username: string;
        email: string;
        phoneNumber: string;
    };
    onUpdateProfile: (updatedProfile: any) => void;
}

const ProfilePopUp: React.FC<ProfilePopUpProps> = ({ visible, onClose, userProfile, onUpdateProfile }) => {
    const [isEditing, setEditing] = useState(false);

    // Validation schema
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
    });

    return (
        <Modal
            title="Edit Profile"
            visible={visible}
            onCancel={onClose}
            footer={null}
            className="profile-popup-modal"
        >
            <Formik
                initialValues={userProfile}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onUpdateProfile(values);
                    setEditing(false);
                    onClose();
                }}
            >
                {({ values, handleChange, handleSubmit, setFieldTouched, errors }) => (
                    <form onSubmit={handleSubmit} className="modal-body">
                        <Form.Item
                            label="Full Name"
                            className="form-item"
                            help={errors.fullName && <div className="error">{errors.fullName}</div>}
                        >
                            <Input
                                name="fullName"
                                onChange={handleChange}
                                value={values.fullName}
                                disabled={!isEditing}
                                onBlur={() => setFieldTouched('fullName')}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            className="form-item"
                            help={errors.email && <div className="error">{errors.email}</div>}
                        >
                            <Input
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                disabled={!isEditing}
                                onBlur={() => setFieldTouched('email')}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            className="form-item"
                            help={errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                        >
                            <Input
                                name="phoneNumber"
                                onChange={handleChange}
                                value={values.phoneNumber}
                                disabled={!isEditing}
                                onBlur={() => setFieldTouched('phoneNumber')}
                            />
                        </Form.Item>

                        <div className="edit-button">
                            <Button type="default" onClick={() => setEditing(!isEditing)}>
                                {isEditing ? 'Cancel' : 'Edit'}
                            </Button>
                            {isEditing && <Button type="primary" htmlType="submit">Save</Button>}
                        </div>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};

export default ProfilePopUp;
