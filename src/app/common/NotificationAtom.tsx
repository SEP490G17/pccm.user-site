import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { Badge, Dropdown, List, Skeleton } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NotificationType } from '../models/noti.model';
import { FaCalendarCheck, FaRegCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotificationAtom = observer(() => {
  const { notificationStore, signalRStore } = useStore();
  const phoneNumber = localStorage.getItem('phoneNumber');
  const isMounted = useRef(false);

  const {
    loadNotification,
    notificationArray: NotificationArray,
    notificationPageParam,
  } = notificationStore;
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
    loadNotification();
    if (phoneNumber != null) {
      if (signalRStore.hubConnection == null) {
        signalRStore.createConnection().then(async () => {
          await signalRStore.joinUserConnection(phoneNumber);
        });
      } else {
        signalRStore.joinUserConnection(phoneNumber);
      }
    }
    return () => {
      if (isMounted.current) {
        signalRStore.leaveUserConnection(phoneNumber!);
      }
    };
  }, [phoneNumber, signalRStore, loadNotification]);

  const notificationMenu = (
    <div
      id="scrollableDiv"
      className="w-80 h-80 bg-white"
      style={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <InfiniteScroll
        dataLength={NotificationArray.length}
        next={loadNotification}
        hasMore={NotificationArray.length < notificationPageParam.totalElement}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={NotificationArray}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                className="cursor-pointer"
                avatar={
                  item.type == NotificationType.Booking ? (
                    <FaCalendarCheck className="text-2xl" />
                  ) : (
                    <FaRegCreditCard className="text-lg" />
                  )
                }
                title={<p className="text-sm flex">{item.title}</p>}
                description={
                  <Link
                    to={`/lich-su/chi-tiet/${item.url}`}
                    onClick={async () => {
                      if (!item.isRead) {
                        await notificationStore.updateReadNotification(item.id);
                      }
                    }}
                  >
                    {item.message}
                  </Link>
                }
              />
              <div>{!item.isRead && <Badge color="gold"></Badge>}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );

  return (
      <Dropdown overlay={notificationMenu} trigger={['click']}>
        <Badge count={notificationStore.numOfUnRead} offset={[10, 0]}>
          <BellOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
        </Badge>
      </Dropdown>
  );
});

export default NotificationAtom;
