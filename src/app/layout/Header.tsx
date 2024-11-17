import {
  Avatar,
  Input,
  Typography,
  Space,
  Dropdown,
  Menu,
  Divider,
  Image,
  Flex,
  Row,
  Col,
} from 'antd';
import {
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
  HistoryOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import logo from '@/assets/pickerball-icon.png';
import listCourtIcon from '@/assets/san_the_thao1.gif';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordPopUp from '@/feature/profile/ChangePasswordPopUp';
import LoginPopUp from '@/feature/auth/LoginPopUp';
import './style/Header.scss';
import { useStore } from '../stores/store';

const { Text } = Typography;

const Header = () => {
  const phrases = ['Tìm sân thể thao', 'Từ khóa tìm kiếm'];
  const [placeholder, setPlaceholder] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const { authStore, commonStore } = useStore();
  const { userApp, logout } = authStore;
  const navigate = useNavigate();
  useEffect(() => {
    if (commonStore.token) {
      authStore.getUser();
    }
  }, []);
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
    if (key === 'viewProfile') {
      if (userApp) {
        navigate('/view-profile');
      } else {
        setLoginModalVisible(true);
      }
    } else if (key === 'login') {
      setLoginModalVisible(true);
    } else if (key === 'viewHistory') {
      navigate('/booking-history');
    } else if (key === 'changePassword') {
      setChangePasswordModalVisible(true);
    } else if (key === 'logout') {
      logout();
    }
  };

  const menu = (
    <Menu className="menu" onClick={handleMenuClick}>
      <Menu.Item key="viewProfile" icon={<UserOutlined />}>
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="viewHistory" icon={<HistoryOutlined />}>
        Lịch sử đặt sân
      </Menu.Item>
      <Menu.Item key="changePassword" icon={<KeyOutlined />}>
        Đổi mật khẩu
      </Menu.Item>
      <Divider style={{ margin: '4px 0' }} />
      {!userApp && (
        <Menu.Item key="login" icon={<UserOutlined />}>
          Đăng nhập
        </Menu.Item>
      )}
      {userApp && (
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <div className="header-container" style={{ padding: '0 50px' }}>
        <Space align="center" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Image preview={false} src={logo} width={'4.0345rem'} height={'2.677rem'} alt="Logo" />
          <Text className="header-title">Pickleball</Text>
        </Space>

        <Space align="center">
          <Input
            placeholder={placeholder}
            className="header-input"
            suffix={<SearchOutlined onClick={handleSearch} />}
          />
        </Space>
        <Space size={40} align="center">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div
                className="header-item"
                onClick={() => navigate('/list-courtcluster')}
                style={{ cursor: 'pointer' }}
              >
                <Flex vertical align="center">
                  <Image
                    preview={false}
                    src={listCourtIcon}
                    width={30}
                    height={24}
                    alt="Sân thể thao"
                  />
                  <Text className="header-text">Sân thể thao</Text>
                </Flex>
              </div>
            </Col>
          </Row>
          <Col span={24}>
            <Dropdown
              className="dropdown"
              overlay={menu}
              trigger={['hover']}
              getPopupContainer={(triggerNode) => {
                const container = document.querySelector('.header-container') as HTMLElement;
                return container || triggerNode;
              }}
            >
              <div className="header-item" style={{ cursor: 'pointer', width: '100%' }}>
                <Flex vertical align="center">
                  {!userApp && (
                    <>
                      <Avatar size={24} alt="Tài khoản" />
                      <Text className="header-text">Tài khoản</Text>
                    </>
                  )}
                  {userApp && (
                    <>
                      <Avatar size={24} alt="Tài khoản" src={userApp.image} />
                      <Text className="header-text">{userApp.displayName}</Text>
                    </>
                  )}
                </Flex>
              </div>
            </Dropdown>
          </Col>
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
