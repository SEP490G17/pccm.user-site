import './style/HomeCourtCluster.scss';

import { Button, Card, Image, Row, Skeleton, Typography } from 'antd';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';

import CourtBookingForm from '@/feature/booking/history/components/QuickBooking/BookingForm';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/app/stores/store';
import { observer } from 'mobx-react-lite';

const { Title, Paragraph } = Typography;

interface IProps {
  title?: string;
  itemsPerPage: number;
}

function CourtClusterList({ title, itemsPerPage }: IProps) {
  const { courtClusterDetailsStore, courtClusterStore } = useStore();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    courtClusterArray,
    loadListCourt,
    loadingInitial,
  } = courtClusterStore;
  const [loadingCourtId, setLoadingCourtId] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      checkScroll();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadListCourt();
  }, [loadListCourt]);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, [courtClusterArray, windowWidth]);

  const getResponsiveItemWidth = () => {
    if (windowWidth < 576) return '100%';
    if (windowWidth < 992) return '50%';
    if (windowWidth < 1280) return '33.333%';
    return `${100 / itemsPerPage}%`;
  };

  const handleNext = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemWidth = container.offsetWidth;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextScroll = Math.min(currentScroll + itemWidth, maxScroll);
      container.scrollTo({ left: nextScroll, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemWidth = container.offsetWidth;
      const currentScroll = container.scrollLeft;
      const prevScroll = Math.max(currentScroll - itemWidth, 0);
      container.scrollTo({ left: prevScroll, behavior: 'smooth' });
    }
  };

  // const getVisibleItems = () => {
  //   if (windowWidth < 576) return 1;
  //   if (windowWidth < 992) return 2;
  //   if (windowWidth < 1280) return 3;
  //   return itemsPerPage;
  // };

  return (
    <>
      {loadingInitial ? (
        <Skeleton
          paragraph={{ rows: 6 }}
          active
          style={{ height: '100%', width: '100%' }}
        />
      ) : courtClusterArray.length === 0 ? (
        <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
          <Typography.Text>Không có sân bóng nào</Typography.Text>
        </Row>
      ) : (
        <div className="court-cluster-container">
          <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
            <Title level={3}>{title}</Title>
          </Row>

          <div className="court-list-content">
            <Button
              className="nav-button prev-button"
              onClick={handlePrevious}
              style={{
                backgroundColor: !canScrollLeft ? 'white' : '#115363',
                color: !canScrollLeft ? 'black' : 'white',
              }}
              disabled={!canScrollLeft}
              icon={<IoIosArrowBack />}
            />

            <div ref={containerRef} className="courts-container">
              <div className="courts-wrapper" style={{ display: 'flex' }}>
                {courtClusterArray.map((c: any) => (
                  <div
                    key={c.id}
                    style={{ flex: `0 0 ${getResponsiveItemWidth()}`, padding: '0 8px' }}
                  >
                    <Card hoverable className="court-card">
                      <Image src={c.images[0]} />
                      <div className="court-details">
                        <div className="court-info">
                          <Title level={5} className="overflow-hidden">
                            {c.title}
                          </Title>
                          <Paragraph>Khu vực: {c.address}</Paragraph>
                          <Row justify="space-between" align="middle" className="rating-row">
                            <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                            <Row>
                              <FaStar className="text-yellow-500" style={{ marginTop: '3px' }} />
                              <FaStar className="text-yellow-500" style={{ marginTop: '3px' }} />
                              <FaStar className="text-yellow-500" style={{ marginTop: '3px' }} />
                              <FaStar className="text-yellow-500" style={{ marginTop: '3px' }} />
                              <FaStarHalfAlt className="text-yellow-500" style={{ marginTop: '3px' }} />
                              <Typography.Paragraph style={{ marginLeft: '5px' }}>(4.5)</Typography.Paragraph>
                            </Row>
                          </Row>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <CourtBookingForm
                            courtClusterId={c.id}
                            loadingCourtId={loadingCourtId}
                            setLoadingCourtId={setLoadingCourtId}
                          />
                          <Button
                            className="book-button"
                            onClick={() => {
                              courtClusterDetailsStore.clearSelectedCourt();
                              navigate(`/chi-tiet/${c.id}`);
                            }}
                          >
                            Chi tiết sân
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="nav-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: !canScrollRight ? 'white' : '#115363',
                color: !canScrollRight ? 'black' : 'white',
              }}
              disabled={!canScrollRight}
              icon={<IoIosArrowForward />}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default observer(CourtClusterList);
