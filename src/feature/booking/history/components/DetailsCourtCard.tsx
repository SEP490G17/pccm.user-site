import { ICourt, ICourtCluster } from '@/app/models/courtcluster.model';
import { CarOutlined, CoffeeOutlined, ShopOutlined, WifiOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Flex, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaHamburger, FaMotorcycle } from 'react-icons/fa';

interface IProps {
  court?: ICourtCluster;
}

const formatTime = (timeString: string) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

const getMinMaxPrices = (courts: ICourt[]) => {
  const prices = courts.flatMap(court => court.courtPrices.map(price => price.price));

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return { minPrice, maxPrice };
};

const DetailsCourtCard = ({ court }: IProps) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    if (court) {
      const { minPrice, maxPrice } = getMinMaxPrices(court.courts);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    }
  }, [court]);
  return (
    <Card className="details-card" style={{ minHeight: '100%' }}>
      <Flex style={{ margin: '0.5rem 0' }}>
        <Typography.Text style={{ fontSize: '1.3rem' }}>
          <Divider type="vertical" className="divider" />
          Thông tin sân
        </Typography.Text>
      </Flex>
      <table className="w-full details-table">
        <tbody>
          <tr>
            <td>Giờ mở cửa:</td>
            <td style={{ textAlign: 'right' }}>
              {formatTime(court ? court.openTime : '')} - {formatTime(court ? court.closeTime : '')}
            </td>
          </tr>
          <tr>
            <td>Số sân thi đấu:</td>
            <td>{court?.numbOfCourts} Sân</td>
          </tr>
          <tr>
            <td>Giá sân từ:</td>
            <td>{minPrice?.toLocaleString('vn')} đ</td>
          </tr>
          <tr>
            <td>Giá sân đến:</td>
            <td>{maxPrice?.toLocaleString('vn')} đ</td>
          </tr>
        </tbody>
      </table>
      <Card
        style={{ background: '#f3f3f3', padding: '1rem', height: 'auto' }}
        className="details-service"
      >
        <Row>
          <Typography.Text style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Dịch vụ tiện ích
          </Typography.Text>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Space className="utility-item">
              <WifiOutlined style={{ fontSize: '1.2rem', fontWeight: 600 }} />
              <Typography.Text style={{ fontWeight: 600 }}>Wifi</Typography.Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space className="utility-item">
              <FaMotorcycle style={{ fontSize: '1.2rem', fontWeight: 600 }} />
              <Typography.Text style={{ fontWeight: 600 }}>Bãi đỗ xe máy</Typography.Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space className="utility-item">
              <CarOutlined style={{ fontSize: '1.2rem', fontWeight: 600 }} />
              <Typography.Text style={{ fontWeight: 600 }}>Bãi đỗ xe ô tô</Typography.Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space className="utility-item">
              <FaHamburger style={{ fontSize: '1.2rem', fontWeight: 600 }} />
              <Typography.Text style={{ fontWeight: 600 }}>Đồ ăn</Typography.Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space className="utility-item">
              <CoffeeOutlined style={{ fontSize: '1.2rem', fontWeight: 600 }} />
              <Typography.Text style={{ fontWeight: 600 }}>Đồ uống</Typography.Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space className="utility-item">
              <ShopOutlined style={{ fontSize: '1.2rem', fontWeight: 600 }} />
              <Typography.Text style={{ fontWeight: 600 }}>Căng tin</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default DetailsCourtCard;
