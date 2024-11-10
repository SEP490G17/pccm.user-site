import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, Avatar } from 'antd';
import { userProfileMock, UserProfile } from '@/app/mocks/user.mocks';
import { EditOutlined } from '@ant-design/icons';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import './style/ProfilePage.scss';
import { useStore } from '@/app/stores/store';
import { RcFile } from 'antd/es/upload';

const { Option } = Select;

const ProfilePage = () => {
    const { uploadStore, accountStore } = useStore()
    const { upImage } = uploadStore
    const [isEditing, setEditing] = useState(false);
    useEffect(() => {
        accountStore.profile()
    }, [])
    const [userProfile, setUserProfile] = useState<UserProfile>(userProfileMock);

    const handleBeforeUpload = (file: RcFile) => {
        if (file instanceof File) {
            upImage(file, file.name);
        } else {
            console.error('File type is incorrect.');
        }
        return false;
    };

    const handleUpdateProfile = () => {
        console.log()
    }

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

                    <Form onFinish={handleUpdateProfile} className="form-container">
                        <div className="avatar-section">
                            <Upload
                                accept='image/*'
                                name="avatar"
                                showUploadList={false}
                                beforeUpload={handleBeforeUpload}
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
                        <Form.Item label="Tên Người Dùng">
                            <Input
                                name="userName"
                                disabled={!isEditing}
                            />
                        </Form.Item>
                        <div className="form-row compact">
                            <Form.Item label="Email">
                                <Input
                                    name="email"
                                    disabled={!isEditing}
                                />
                            </Form.Item>
                            <Form.Item label="Số Điện Thoại" >
                                <Input
                                    name="phone"

                                    disabled={!isEditing}

                                />
                            </Form.Item>
                        </div>
                        <div className="form-row compact">
                            <Form.Item label="Ngày sinh" >
                                <DatePicker
                                    name="birthday"

                                    disabled={!isEditing}
                                />
                            </Form.Item>
                            <Form.Item label="Giới Tính" >
                                <Select


                                    disabled={!isEditing}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item label="Địa Chỉ" >
                            <Input
                                name="address"


                                disabled={!isEditing}

                            />
                        </Form.Item>

                        <div className="edit-button">
                            <Button type="default" onClick={() => setEditing(!isEditing)}>
                                {isEditing ? 'Cancel' : 'Edit'}
                            </Button>
                            {isEditing && <Button type="primary" htmlType="submit">Save</Button>}
                        </div>
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
