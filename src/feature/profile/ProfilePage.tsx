import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, Avatar, Skeleton, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import './style/ProfilePage.scss';
import { useStore } from '@/app/stores/store';
import { RcFile } from 'antd/es/upload';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { UpdateProfileDto } from '@/app/models/account.model';
import { toast } from 'react-toastify';

const { Option } = Select;

const ProfilePage: React.FC = () => {
    const { uploadStore, accountStore } = useStore();
    const { upImage } = uploadStore;
    const { profileData, loadingProfile } = accountStore;
    const [isEditing, setEditing] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>(profileData?.imageUrl);
    const [tempImageFile, setTempImageFile] = useState<RcFile | null>(null);

    useEffect(() => {
        accountStore.profile();
    }, [accountStore]);

    useEffect(() => {
        if (profileData) {
            form.setFieldsValue({
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                phone: profileData.phoneNumber,
                imageUrl: profileData.imageUrl,
                birthday: profileData.birthDate ? dayjs(profileData.birthDate) : null,
                gender: profileData.gender ? 'male' : 'female',
            });
            setImageUrl(profileData.imageUrl);
        }
    }, [profileData, form]);

    const handleBeforeUpload = (file: RcFile) => {
        setTempImageFile(file);
        setImageUrl(URL.createObjectURL(file));
        return false;
    };

    const handleUpdateProfile = async (values: any) => {
        const data = new UpdateProfileDto({
            birthDate: values.birthday,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phone,
            gender: values.gender === 'male',
        });

        try {
            if (tempImageFile) {
                accountStore.loadingUpdate = true;
                const uploadedImage = await upImage(tempImageFile, tempImageFile.name);
                data.imageUrl = uploadedImage.url;
            }
            else {
                data.imageUrl = profileData ? profileData.imageUrl : null;
            }

            await accountStore.updateProfile(data);
            toast.success('Cập nhật tài khoản thành công');
        } catch {
            toast.error('Cập nhật tài khoản thất bại');
        }
    };

    return (
        <div className="profile-page-container">
            <PageHeadingAtoms
                breadCrumb={[{ title: 'Trang chủ', to: '/home' }, { title: 'Thông tin cá nhân', to: '/view-profile/' }]}
            />
            <div style={{ maxWidth: '70%', margin: 'auto' }}>
                <div style={{ padding: '5%', backgroundColor: 'white', borderRadius: '8px' }}>
                    <Form form={form} onFinish={handleUpdateProfile} className="form-container">
                        {
                            loadingProfile
                                ? <Skeleton active paragraph={{ rows: 7 }} />
                                : <>
                                    <div className="avatar-section">
                                        <Upload
                                            accept="image/*"
                                            name="avatar"
                                            showUploadList={false}
                                            beforeUpload={handleBeforeUpload}
                                            disabled={!isEditing}
                                        >
                                            <div className="avatar-wrapper">
                                                <Avatar
                                                    size={100}
                                                    src={imageUrl}
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
                                    <Row gutter={[16, 0]} className="form-row">
                                        <Col xs={24} sm={24} md={24}>
                                            <Form.Item
                                                required
                                                label="Họ"
                                                name="firstName"
                                                labelCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                                            >
                                                <Input disabled={!isEditing} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24}>
                                            <Form.Item
                                                required
                                                label="Tên"
                                                name="lastName"
                                                labelCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                                            >
                                                <Input disabled={!isEditing} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={[16, 16]} className="form-row">
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Form.Item
                                                required
                                                label="Email"
                                                name="email"
                                                labelCol={{ span: 24 }}
                                                rules={[
                                                    { required: true, message: 'Vui lòng nhập email' },
                                                    { type: 'email', message: 'Email không hợp lệ' }
                                                ]}
                                            >
                                                <Input disabled={!isEditing} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Form.Item
                                                required
                                                label="Số Điện Thoại"
                                                labelCol={{ span: 24 }}
                                                name="phone"
                                                rules={[
                                                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                                                    { pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' }
                                                ]}
                                            >
                                                <Input
                                                    disabled={!isEditing}
                                                    type="tel"
                                                    maxLength={10}
                                                    onKeyDown={(e) => {
                                                        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
                                                        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={[16, 16]} className="form-row">
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Form.Item labelCol={{ span: 24 }} label="Ngày sinh" name="birthday">
                                                <DatePicker format={'DD/MM/YYYY'} disabled={!isEditing} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Form.Item labelCol={{ span: 24 }} label="Giới Tính" name="gender">
                                                <Select disabled={!isEditing}>
                                                    <Option value="male">Nam</Option>
                                                    <Option value="female">Nữ</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <div className="edit-button">
                                        {!isEditing ? (
                                            <Button
                                                type='default'
                                                style={{
                                                    backgroundColor: '#115363',
                                                    color: 'white',
                                                }}
                                                onClick={() => setEditing(!isEditing)}
                                            >
                                                Thay đổi
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    type='default'
                                                    disabled={accountStore.loadingUpdate}
                                                    style={{
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                    }}
                                                    onClick={() => setEditing(!isEditing)}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    loading={accountStore.loadingUpdate}
                                                    style={{ backgroundColor: '#115363', color: 'white' }}
                                                    htmlType="submit"
                                                >
                                                    Lưu
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </>
                        }
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default observer(ProfilePage);
