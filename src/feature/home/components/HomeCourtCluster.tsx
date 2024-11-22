import './style/HomeCourtCluster.scss';
import { Button, Card, Col, Image, Row, Skeleton, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useStore } from '@/app/stores/store';
import CourtBookingForm from '@/feature/booking/history/components/QuickBooking/BookingForm';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface IProps {
  title?: string;
  itemsPerPage: number;
}

function CourtClusterList({ title, itemsPerPage }: IProps) {
  const { courtClusterStore, courtClusterDetailsStore } = useStore();
  const { listCourt, loadListCourt, loadingInitial } = courtClusterStore;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingCourtId, setLoadingCourtId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    loadListCourt();
  }, [loadListCourt]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine items per page based on screen size
  const getResponsiveItemsPerPage = () => {
    if (windowWidth < 576) return 1; // xs
    if (windowWidth < 992) return 2; // sm and md
    if (windowWidth < 1024) return 2; // lg but smaller than 1024px
    return 3; // xl and larger screens
  };

  const responsiveItemsPerPage = getResponsiveItemsPerPage();
  const startIndex = (currentPage - 1) * responsiveItemsPerPage;

  // Ensure we don't exceed array bounds when slicing
  const endIndex = Math.min(startIndex + responsiveItemsPerPage, listCourt.length);
  const currentItems = listCourt.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listCourt.length / responsiveItemsPerPage);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Reset to first page if current page becomes invalid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleNext = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle empty state
  if (!loadingInitial && listCourt.length === 0) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: '200px' }}>
        <Typography.Text>Không có sân bóng nào</Typography.Text>
      </Row>
    );
  }

  return (
    <div className="court-cluster-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
        <Title level={3}>{title}</Title>
      </Row>

      {loadingInitial ? (
        <Skeleton active />
      ) : (
        <div className="court-list-content">
          <Button
            className="nav-button prev-button"
            onClick={handlePrevious}
            style={{
              backgroundColor: !hasPrevious ? 'white' : '#115363',
              color: !hasPrevious ? 'black' : 'white',
            }}
            disabled={!hasPrevious}
            icon={<IoIosArrowBack />}
          />

          <Row gutter={[16, 16]} className="courts-container">
            {currentItems.map((c) => (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={windowWidth < 1024 ? 12 : 24 / itemsPerPage}
                xl={24 / itemsPerPage}
                key={c.id}
              >
                <Card hoverable className="court-card">
                  <Image src={c.images[0]} />
                  <div className="court-details" style={{ height: '100%' }}>
                    <div className="court-info" style={{ height: '100%' }}>
                      <Title level={5} className="overflow-hidden">
                        {c.title}
                      </Title>
                      <Paragraph>Khu vực: {c.address}</Paragraph>
                      <Paragraph className="service-paragraph" style={{ height: '25px' }}>
                        {/* {c.services.slice(0, 2).map((service) => (
                                                        <Tag key={service.id}>{service.serviceName}</Tag>
                                                    ))} */}
                      </Paragraph>
                      <Row justify="space-between" align="middle" className="rating-row">
                        <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                        <Row>
                          <FaStar
                            className="text-yellow-500"
                            color="#f7d03f"
                            style={{ marginTop: '3px' }}
                          />
                          <FaStar
                            className="text-yellow-500"
                            color="#f7d03f"
                            style={{ marginTop: '3px' }}
                          />
                          <FaStar
                            className="text-yellow-500"
                            color="#f7d03f"
                            style={{ marginTop: '3px' }}
                          />
                          <FaStar
                            className="text-yellow-500"
                            color="#f7d03f"
                            style={{ marginTop: '3px' }}
                          />
                          <FaStarHalfAlt
                            className="text-yellow-500"
                            color="#f7d03f"
                            style={{ marginTop: '3px' }}
                          />
                          <Typography.Paragraph style={{ marginLeft: '5px' }}>
                            (4.5)
                          </Typography.Paragraph>
                        </Row>
                      </Row>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: windowWidth < 1540 ? 'column' : 'row',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
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
              </Col>
            ))}
          </Row>

          <Button
            className="nav-button next-button"
            onClick={handleNext}
            style={{
              backgroundColor: !hasNext ? 'white' : '#115363',
              color: !hasNext ? 'black' : 'white',
            }}
            disabled={!hasNext}
            icon={<IoIosArrowForward />}
          />
        </div>
      )}
    </div>
  );
}

export default observer(CourtClusterList);
