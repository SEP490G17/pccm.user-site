import './style/TopCourtCluster.scss';

import { Button, Card, Image, Row, Skeleton, Typography } from 'antd';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';

import CourtBookingForm from '@/feature/booking/history/components/QuickBooking/BookingForm';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/app/stores/store';
import { observer } from 'mobx-react-lite';
import { ICourt, ICourtCluster } from '@/app/models/courtcluster.model';

const { Title, Paragraph } = Typography;

interface IProps {
  title?: string;
  itemsPerPage: number;
}

function TopCourtCluster({ title, itemsPerPage }: IProps) {
  const { courtClusterDetailsStore, courtClusterStore } = useStore();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    topCourtClusterArray,
    loadListTopCourt,
    loadingTopCourt,
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
    loadListTopCourt();
  }, [loadListTopCourt]);

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
  }, [topCourtClusterArray, windowWidth]);

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

  const getMinMaxPrices = (courts: ICourt[]) => {
    const prices = courts.flatMap(court => court.courtPrices.map(price => price.price));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { minPrice, maxPrice };
  };

  return (
    <>
      {loadingTopCourt ? (
        <Skeleton
          paragraph={{ rows: 6 }}
          active
          style={{ height: '100%', width: '100%', paddingTop: '30px' }}
        />
      ) : topCourtClusterArray.length === 0 ? (
        <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
          <Typography.Text>Không có sân còn giờ trống</Typography.Text>
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
                {topCourtClusterArray.map((c: ICourtCluster) => (
                  <div
                    key={c.id}
                    style={{ flex: `0 0 ${getResponsiveItemWidth()}`, padding: '0 8px' }}
                  >
                    <Card hoverable className="court-card">
                      <Image src={c.images[0]} width={'100%'} height={'200px'} />
                      <div className="court-details">
                        <div >
                          <Title level={5} className="overflow-hidden" style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            {c.title}
                          </Title>

                          <Paragraph style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>Khu vực: {c.provinceName} - {c.districtName}</Paragraph>
                          <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                          <Paragraph>
                            Giá tiền: {getMinMaxPrices(c.courts).minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} - {getMinMaxPrices(c.courts).maxPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </Paragraph>
                          <Paragraph>
                            Giờ mở cửa: {c.openTime} - {c.closeTime}
                          </Paragraph>
                          <Row>
                            {Array.from({ length: 5 }, (_, i) => {
                              if (i < Math.floor(Number(c.rate ? c.rate.toFixed() : 0))) {
                                return <FaStar key={i} className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />;
                              }
                              else {
                                return <FaRegStar key={i} className="text-yellow-500" style={{ marginTop: '3px' }} />;
                              }
                            })}
                            <Typography.Paragraph style={{ marginLeft: '5px' }}>({c.rate ? c.rate.toFixed() : 0})</Typography.Paragraph>

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

export default observer(TopCourtCluster);
