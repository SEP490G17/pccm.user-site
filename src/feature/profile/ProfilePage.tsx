import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, Avatar } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userProfileMock, UserProfile } from '@/app/mocks/user.mocks';
import dayjs from 'dayjs';
import { EditOutlined } from '@ant-design/icons';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import './style/ProfilePage.scss';
import { useStore } from '@/app/stores/store';

const { Option } = Select;

const ProfilePage: React.FC = () => {
    const { uploadStore } = useStore()
    const { upImage } = uploadStore
    const [isEditing, setEditing] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile>(userProfileMock);

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('User Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        birthday: Yup.date().nullable().required('Birthday is required'),
        gender: Yup.string().required('Gender is required'),
        address: Yup.string().required('Address is required'),
    });

    const handleUpdateProfile = (updatedProfile: UserProfile) => {
        setUserProfile(updatedProfile);
    };

    return (
        <div className="profile-page-container" style={{ maxWidth: '85%', margin: 'auto', padding: '50px 0px' }}>
            <PageHeadingAtoms
                breadCrumb={[
                    { title: "Trang chủ", to: "/home" },
                    { title: "Thông tin cá nhân", to: "/view-profile/" }
                ]}
            />
            <div style={{ maxWidth: '70%', margin: 'auto' }}>

                <div style={{ padding: '5%', backgroundColor: 'white', borderRadius: '8px' }}>
                    <h1>Thay đổi thông tin</h1>
                    <Formik
                        initialValues={{
                            userName: userProfile.userName,
                            email: userProfile.email,
                            phone: userProfile.phone,
                            birthday: userProfile.birthday ? dayjs(userProfile.birthday) : null,
                            gender: userProfile.gender,
                            address: userProfile.address,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleUpdateProfile({
                                ...values,
                                birthday: values.birthday ? values.birthday.format('DD-MM-YYYY') : '',
                            });
                            setEditing(false);
                        }}
                    >
                        {({ values, handleChange, handleSubmit, setFieldTouched, errors, setFieldValue }) => (
                            <form onSubmit={handleSubmit} className="form-container">
                                <div className="avatar-section">
                                    <Upload
                                        accept='image/*'
                                        name="avatar"
                                        showUploadList={false}
                                        onChange={(info) => {
                                            if (info.file.status === 'done') {
                                                upImage(info.file, info.file.fileName)
                                            }
                                        }}
                                        disabled={!isEditing}
                                    >
                                        <div className="avatar-wrapper">
                                            <Avatar
                                                size={100}
                                                src={userProfile.avatar || ''}
                                                style={{ cursor: isEditing ? 'pointer' : 'default' }}
                                            />
                                            {isEditing && (
                                                <div className="avatar-overlay">
                                                    <EditOutlined style={{ fontSize: '24px', color: 'white' }} />
                                                </div>
                                            )}
                                        </div>
                                    </Upload>
                                </div>
                                <Form.Item label="Tên Người Dùng" help={errors.userName && <div className="error">{errors.userName}</div>}>
                                    <Input
                                        name="userName"
                                        onChange={handleChange}
                                        value={values.userName}
                                        disabled={!isEditing}
                                        onBlur={() => setFieldTouched('userName')}
                                    />
                                </Form.Item>
                                <div className="form-row compact">
                                    <Form.Item label="Email" help={errors.email && <div className="error">{errors.email}</div>}>
                                        <Input
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            disabled={!isEditing}
                                            onBlur={() => setFieldTouched('email')}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Số Điện Thoại" help={errors.phone && <div className="error">{errors.phone}</div>}>
                                        <Input
                                            name="phone"
                                            onChange={handleChange}
                                            value={values.phone}
                                            disabled={!isEditing}
                                            onBlur={() => setFieldTouched('phone')}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-row compact">
                                    <Form.Item label="Ngày sinh" help={errors.birthday && <div className="error">{errors.birthday}</div>}>
                                        <DatePicker
                                            name="birthday"
                                            onChange={(date) => setFieldValue('birthday', date)}
                                            value={values.birthday}
                                            disabled={!isEditing}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Giới Tính" help={errors.gender && <div className="error">{errors.gender}</div>}>
                                        <Select
                                            onChange={(value) => setFieldValue('gender', value)}
                                            value={values.gender}
                                            disabled={!isEditing}
                                        >
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <Form.Item label="Địa Chỉ" help={errors.address && <div className="error">{errors.address}</div>}>
                                    <Input
                                        name="address"
                                        onChange={handleChange}
                                        value={values.address}
                                        disabled={!isEditing}
                                        onBlur={() => setFieldTouched('address')}
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
