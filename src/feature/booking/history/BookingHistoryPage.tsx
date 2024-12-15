import React, { useState } from 'react';
import { Button, Tabs, Typography } from 'antd';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
const { Title } = Typography;

import BookingHistoryAllTabs from './tabs/BookingHistoryAllTabs';
import { Tab } from 'rc-tabs/lib/interface';
import BookingHistoryPendingTabs from './tabs/BookingHistoryPendingTabs';
import BookingHistoryAcceptedTabs from './tabs/BookingHistoryAcceptedTabs';
import BookingHistoryDenyTabs from './tabs/BookingHistoryDenyTabs';
import BookingHistoryCancelTabs from './tabs/BookingHistoryCancelTabs';
import { ReloadOutlined } from '@ant-design/icons';
import { useStore } from '@/app/stores/store';
const BookingHistoryPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('1');
  const { bookingHistoryStore } = useStore();
  const items: Tab[] = [
    {
      label: <p className="w-32">Đang chờ duyệt</p>,
      key: '1',
      children: <BookingHistoryPendingTabs />,
    },
    {
      label: <p className="w-32">Đã được duyệt</p>,
      key: '2',
      children: <BookingHistoryAcceptedTabs />,
    },
    {
      label: <p className="w-32">Đã bị từ chối</p>,
      key: '3',
      children: <BookingHistoryDenyTabs />,
    },
    {
      label: <p className="w-32">Đã huỷ </p>,
      key: '4',
      children: <BookingHistoryCancelTabs />,
    },
    {
      label: <p className="w-32">Tất cả</p>,
      key: '5',
      children: <BookingHistoryAllTabs />,
    },
  ];
  const handleTabsChange = (key: string) => {
    setSelectedTab(key);
  };

  const handleReload = async () => {
    switch (selectedTab) {
      case '1':
        await bookingHistoryStore.reloadPending();
        break;
      case '2':
        await bookingHistoryStore.reloadAccepted();
        break;
      case '3':
        await bookingHistoryStore.reloadDeny();
        break;
      case '4':
        await bookingHistoryStore.reloadCancel();
        break;
      case '5':
        await bookingHistoryStore.reloadAll();
        break;
    }
  };

  return (
    <>
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/trang-chu' },
          { title: 'Sân thể thao', to: '/cum-san' },
        ]}
      />
      <div className="flex flex-row justify-between items-center">
        <Title level={2}>Lịch Sử Đặt Sân</Title>
        <Button icon={<ReloadOutlined />} onClick={handleReload}>
          Tải lại
        </Button>
      </div>
      <Tabs type="card" items={items} centered onChange={handleTabsChange} />
    </>
  );
};

export default BookingHistoryPage;
