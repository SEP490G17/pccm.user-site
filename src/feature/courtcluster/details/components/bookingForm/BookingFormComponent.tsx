import { Card, Tabs, TabsProps } from 'antd';
import { FC } from 'react';
import BookingByDayComponent from './BookingByDayComponent';
import BookingByComboComponent from './BookingByComboComponent';
import { ICourtCluster } from '@/app/models/courtcluster.model';

interface BookingFormComponentProps {
  selectedCourt:ICourtCluster
}

const BookingFormComponent: FC<BookingFormComponentProps> = ({selectedCourt}) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Đặt giờ lẻ',
      children: <BookingByDayComponent selectedCourt={selectedCourt} />,
    },
    {
      key: '2',
      label: 'Đặt theo combo',
      children: <BookingByComboComponent selectedCourt={selectedCourt} />,
    },
  ];
  return (
    <Card className='min-h-[50rem]'   bordered={false}  >
      <Tabs defaultActiveKey="1" items={items}/>
    </Card>
  );
};

export default BookingFormComponent;
