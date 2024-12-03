import { Button, Card, Col, Image, Row, Skeleton, Space, Tag, Typography } from 'antd';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { ICourtCluster } from '@/app/models/courtcluster.model';

const { Title, Paragraph } = Typography;

interface Props {
  courts: ICourtCluster[];
  loading: boolean;
}

export default function CourtClusterGrid({ courts, loading }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < courts.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const hasNext = currentIndex + itemsPerPage < courts.length;
  const hasPrev = currentIndex > 0;

  const visibleCourts = courts.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div style={{ position: 'relative' }}>
      <Row justify="space-between" style={{ height: '100%' }}>
        <Col style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
          <Button
            onClick={handlePrev}
            icon={<IoIosArrowBack />}
            style={{
              backgroundColor: !hasPrev ? 'white' : "#115363",
              color: !hasPrev ? 'black' : 'white'
            }}
            disabled={!hasPrev}
          />
        </Col>

        <Col style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
          <Button
            onClick={handleNext}
            icon={<IoIosArrowForward />}
            style={{
              backgroundColor: !hasNext ? 'white' : "#115363",
              color: !hasNext ? 'black' : 'white'
            }}
            disabled={!hasNext}
          />
        </Col>
      </Row>

      <Row justify="space-between">
        {loading ? (
          <Skeleton active />
        ) : (
          <Space size="large" style={{ width: '100%' }}>
            <Row gutter={[16, 16]} style={{ width: '100%' }}>
              {visibleCourts.map((c) => (
                <Col key={c.id} xs={24} sm={12} md={6} lg={6} className="court-col">
                  <Card hoverable className="court-card">
                    <Image src={c.images[0]} width={'100%'} height={'200px'} />
                    <div className="court-details">
                      <div className="court-info">
                        <Title level={5} className="court-title">
                          {c.title}
                        </Title>
                        <Paragraph>Khu vực: {c.provinceName} - {c.districtName}</Paragraph>
                        <Paragraph className="service-paragraph" style={{ height: '25px' }}>
                          {c.services.slice(0, 2).map((service: { id: Key | null | undefined; serviceName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                            <Tag key={service.id}>{service.serviceName}</Tag>
                          ))}
                        </Paragraph>
                        <Row justify="space-between" align="middle" className="rating-row">
                          <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                          <Row>
                            <FaStar className="text-yellow-500" color="#f7d03f" />
                            <FaStar className="text-yellow-500" color="#f7d03f" />
                            <FaStar className="text-yellow-500" color="#f7d03f" />
                            <FaStar className="text-yellow-500" color="#f7d03f" />
                            <FaStarHalfAlt className="text-yellow-500" color="#f7d03f" />
                            <Typography.Paragraph className="rating-value">
                              (4.5)
                            </Typography.Paragraph>
                          </Row>
                        </Row>
                      </div>
                      <Button className="book-button">Chi tiết sân</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        )}
      </Row>
    </div>
  );
}
