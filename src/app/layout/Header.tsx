import { Avatar, Button, Input, Typography, Space, Image as AntImage, Dropdown, Menu, Divider } from 'antd';
import { SearchOutlined, LogoutOutlined, UserOutlined, HistoryOutlined, KeyOutlined } from '@ant-design/icons';
import logo from '@/assets/pickerball-icon.png';
import notificationIcon from '@/assets/notification.svg';
import defaultUserIcon from '@/assets/defaultUser.png';
import arrowDownIcon from '@/assets/arrow-down.svg';
import listCourtIcon from '@/assets/notification.svg';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopUp from '@/feature/login/LoginPopUp';
import ProfilePopUp from '@/feature/profile/ProfilePopUp';
import ChangePasswordPopUp from '@/feature/profile/ChangePasswordPopUp';

import './style/Header.scss';

const { Text } = Typography;

export interface UserProfile {
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
}

const Header = () => {
    const phrases = ['Tìm sân thể thao', 'Từ khóa tìm kiếm'];
    const [placeholder, setPlaceholder] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({
        fullName: 'Nguyen Trung Kien',
        username: 'kiennguyen',
        email: 'kien@example.com',
        phoneNumber: '0865859202',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (charIndex < phrases[phraseIndex].length) {
                setPlaceholder((prev) => prev + phrases[phraseIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setTimeout(() => {
                    setCharIndex(0);
                    setPlaceholder('');
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }, 100);
            }
        }, 250);

        return () => clearInterval(interval);
    }, [charIndex, phraseIndex]);

    const handleSearch = () => {
        console.log('Searching for:', placeholder);
    };

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "viewProfile") {
            setProfileModalVisible(true);
        } else if (key === "login") {
            setLoginModalVisible(true);
        } else if (key === "viewHistory") {
            navigate('/booking-history');
        } else if (key === "changePassword") {
            setChangePasswordModalVisible(true);
        }
    };


    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="viewProfile" icon={<UserOutlined />}>View Profile</Menu.Item>
            <Menu.Item key="viewHistory" icon={<HistoryOutlined />}>View History Booking</Menu.Item>
            <Menu.Item key="changePassword" icon={<KeyOutlined />}>Change Password</Menu.Item>
            <Divider style={{ margin: '4px 0' }} />
            <Menu.Item key="login" icon={<UserOutlined />}>Login</Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
    );

    const handleUpdateProfile = (updatedProfile: UserProfile) => {
        setUserProfile(updatedProfile);
    };

    return (
        <>
            <div className="header-container">
                <Space align="center">
                    <AntImage
                        preview={false}
                        src={logo}
                        width={'4.0345rem'}
                        height={'2.677rem'}
                        alt="Logo"
                    />
                    <Text className="header-title">
                        Pickle ball
                    </Text>
                </Space>

                <Space align="center">
                    <Input
                        placeholder={placeholder}
                        className="header-input"
                        suffix={<SearchOutlined onClick={handleSearch} />}
                    />
                </Space>

                <Space size={20}>
                    <AntImage src={notificationIcon} width={24} height={24} preview={false} alt="Notifications" />
                    <Button type="text" onClick={() => navigate('/list-courtcluster')}>
                        <AntImage src={listCourtIcon} width={24} height={24} preview={false} alt="List Courts" />
                    </Button>
                    <Avatar src={defaultUserIcon} size={52} alt="User Avatar" />
                    <div>
                        <Text className="header-user-fullname">
                            {userProfile.fullName}
                        </Text>
                        <Text className="header-user-phone">
                            {userProfile.phoneNumber}
                        </Text>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button type="text" icon={<AntImage src={arrowDownIcon} width={24} height={24} preview={false} alt="Arrow Down" />} />
                    </Dropdown>
                </Space>
            </div>

            <LoginPopUp visible={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />
            <ProfilePopUp
                visible={isProfileModalVisible}
                onClose={() => setProfileModalVisible(false)}
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
            />
            <ChangePasswordPopUp
                visible={isChangePasswordModalVisible}
                onClose={() => setChangePasswordModalVisible(false)}
            />

        </>
    );
};

export default observer(Header);
