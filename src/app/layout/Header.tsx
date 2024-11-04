import { Avatar, Button, Input, Typography, Space, Dropdown, Menu, Divider } from 'antd';
import { SearchOutlined, LogoutOutlined, UserOutlined, HistoryOutlined, KeyOutlined } from '@ant-design/icons';
import logo from '@/assets/pickerball-icon.png';
import notificationIcon from '@/assets/notification.svg';
import defaultUserIcon from '@/assets/defaultUser.png';
import arrowDownIcon from '@/assets/arrow-down.svg';
import listCourtIcon from '@/assets/san_the_thao1.gif';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordPopUp from '@/feature/profile/ChangePasswordPopUp';
import LoginPopUp from '@/feature/login/LoginPopUp';
import './style/Header.scss';

const { Text } = Typography;

const Header = () => {
    const phrases = ['Tìm sân thể thao', 'Từ khóa tìm kiếm'];
    const [placeholder, setPlaceholder] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const navigate = useNavigate();

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
            navigate('/view-profile');
        } else if (key === "login") {
            setLoginModalVisible(true);
        } else if (key === "viewHistory") {
            navigate('/booking-history');
        } else if (key === "changePassword") {
            setChangePasswordModalVisible(true);
        }
    };

    const menu = (
        <Menu className='menu' onClick={handleMenuClick}>
            <Menu.Item key="viewProfile" icon={<UserOutlined />}>View Profile</Menu.Item>
            <Menu.Item key="viewHistory" icon={<HistoryOutlined />}>View History Booking</Menu.Item>
            <Menu.Item key="changePassword" icon={<KeyOutlined />}>Change Password</Menu.Item>
            <Divider style={{ margin: '4px 0' }} />
            <Menu.Item key="login" icon={<UserOutlined />}>Login</Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="header-container">
                <Space align="center">
                    <img src={logo} width="65" height="45" alt="Logo" />
                    <Text className="header-title">Pickle ball</Text>
                    <AntImage
                        preview={false}
                        src={logo}
                        width={'4.0345rem'}
                        height={'2.677rem'}
                        alt="Logo"
                    />
                    <Text className="header-title">
                        Pickleball
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
                    <Space
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.625rem',
                            borderRadius: '100%',
                            border: '1px solid #63748A',
                            padding: '0.1rem',
                        }}
                    >
                        <Avatar
                            shape="circle"
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                            icon={<img src={notificationIcon} width={24} height={24} alt="Notifications" />}
                        />
                    </Space>
                    <Button type="text" onClick={() => navigate('/list-courtcluster')}>
                        <img src={listCourtIcon} width={40} height={30} alt="List Courts" />
                    </Button>
                    <Avatar src={defaultUserIcon} size={52} alt="User Avatar" />
                    <div>
                        <Text className="header-user-fullname">John Doe</Text>
                        <Text className="header-user-phone">+123456789</Text>
                    </div>
                    <Dropdown
                        className='dropdown'
                        overlay={menu}
                        trigger={['hover']}
                        getPopupContainer={(triggerNode) => {
                            const container = document.querySelector('.header-container') as HTMLElement;
                            return container || triggerNode;
                        }}
                    >
                        <Button type="text" icon={<AntImage src={arrowDownIcon} width={24} height={24} preview={false} alt="Arrow Down" />} />
                    </Dropdown>
                </Space>
            </div>
            <LoginPopUp visible={isLoginModalVisible} onClose={() => setLoginModalVisible(false)} />
            <ChangePasswordPopUp
                visible={isChangePasswordModalVisible}
                onClose={() => setChangePasswordModalVisible(false)}
            />
        </>
    );
};

export default observer(Header);
