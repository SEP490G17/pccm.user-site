import './style/Header.scss';

import {
  HistoryOutlined,
  KeyOutlined,
  LogoutOutlined,
  // SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Divider,
  Dropdown,
  Flex,
  Image,
  // Input,
  Menu,
  Space,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

import logo from '@/assets/pickerball-icon.png';
import listCourtIcon from '@/assets/san_the_thao1.gif';
import LoginPopUp from '@/feature/auth/LoginPopUp';
import ChangePasswordPopUp from '@/feature/profile/ChangePasswordPopUp';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/store';
import { router } from '../router/Routes';
import { Link } from '@chakra-ui/react';
import NotificationAtom from '../common/NotificationAtom';

const { Text } = Typography;

const Header = observer(() => {
  // const phrases = ['Tìm sân thể thao', 'Từ khóa tìm kiếm'];
  // const [placeholder, setPlaceholder] = useState('');
  // const [phraseIndex, setPhraseIndex] = useState(0);
  // const [charIndex, setCharIndex] = useState(0);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const { authStore, commonStore } = useStore();
  const { userApp, logout } = authStore;
  const navigate = useNavigate();
  useEffect(() => {
    if (commonStore.token) {
      authStore.getUser();
    }
  }, [authStore, commonStore]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (charIndex < phrases[phraseIndex].length) {
  //       setPlaceholder((prev) => prev + phrases[phraseIndex][charIndex]);
  //       setCharIndex((prev) => prev + 1);
  //     } else {
  //       setTimeout(() => {
  //         setCharIndex(0);
  //         setPlaceholder('');
  //         setPhraseIndex((prev) => (prev + 1) % phrases.length);
  //       }, 100);
  //     }
  //   }, 250);

  //   return () => clearInterval(interval);
  // }, [charIndex, phraseIndex, phrases]);

  // const handleSearch = () => {
  //   console.log('Searching for:', placeholder);
  // };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'viewProfile') {
      if (userApp) {
        navigate('/thongtin');
      } else {
        setLoginModalVisible(true);
      }
    } else if (key === 'login') {
      authStore.setVisible(true);
    } else if (key === 'viewHistory') {
      navigate('/lich-su');
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
        <Flex align="center" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Image preview={false} src={logo} width={'4.0345rem'} height={'2.677rem'} alt="Logo" />
          <Text className="header-title">Pickleball</Text>
        </Flex>
        <Space size={40} align="center">
          <Flex
            align="center"
            onClick={() => navigate('/cum-san')}
            className=" cursor-pointer mr-2"
          >
            <Image preview={false} src={listCourtIcon} width={30} height={24} alt="Sân thể thao" />
          </Flex>

          {userApp && <NotificationAtom />}

          {userApp && (
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
                <Flex className="flex-row gap-2" align="center">
                  <Avatar size={32} alt="Tài khoản" src={userApp.image} />
                  <Text className="hidden md:block text-[#4B5563] whitespace-nowrap overflow-hidden text-ellipsis max-h-28">
                    {userApp.displayName}
                  </Text>
                </Flex>
              </div>
            </Dropdown>
          )}
          {!userApp && (
            <Flex gap={10}>
              <Link onClick={() => authStore.setVisible(true)}>Đăng nhập</Link>/
              <Link
                onClick={() => {
                  router.navigate('/dang-ki');
                }}
              >
                Đăng kí
              </Link>
            </Flex>
          )}
        </Space>
      </div>
      <LoginPopUp visible={isLoginModalVisible} onClose={() => authStore.setVisible(false)} />
      <ChangePasswordPopUp
        visible={isChangePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
      />
    </>
  );
});

export default Header;
