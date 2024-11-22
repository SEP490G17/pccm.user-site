import './style/HomeCourtCluster.scss';

import { Button, Card, Col, Image, Row, Skeleton, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useStore } from "@/app/stores/store";
import CourtBookingForm from "@/feature/booking/history/components/QuickBooking/BookingForm";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface IProps {
    title?: string;
    itemsPerPage: number;
}

function CourtClusterList({ title, itemsPerPage }: IProps) {
    const { courtClusterStore,courtClusterDetailsStore } = useStore();
    const { listCourt, loadListCourt, loadingInitial } = courtClusterStore;
    const navigate = useNavigate();

    useEffect(() => {
        loadListCourt();
    }, [loadListCourt]);

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingCourtId, setLoadingCourtId] = useState<number | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    const currentItems = listCourt.slice(startIndex, startIndex + responsiveItemsPerPage);

    const hasPrevious = currentPage > 1;
    const hasNext = startIndex + responsiveItemsPerPage < listCourt.length;

    const handleNext = () => {
        setCurrentPage(hasNext ? currentPage + 1 : 1);
    };

    const handlePrevious = () => {
        setCurrentPage(hasPrevious ? currentPage - 1 : Math.ceil(listCourt.length / responsiveItemsPerPage));
    };

    return (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Title level={3}>{title}</Title>
            </Row>
            <Row justify="space-between">
                {loadingInitial ? (
                    <Skeleton active />
                ) : (
                    <Space size="large">
                        <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                            <Col>
                                <Button onClick={handlePrevious} style={{
                                    backgroundColor: !hasPrevious ? 'white' : "#115363",
                                    color: !hasPrevious ? 'black' : 'white'
                                }} disabled={!hasPrevious} icon={<IoIosArrowBack />} />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            {currentItems.map((c) => (
                                <Col xs={24} sm={12} md={12} lg={windowWidth < 1024 ? 12 : 8} xl={8} key={c.id}>
                                    <Card hoverable className="court-card" >
                                        <Image src={c.images[0]} />
                                        <div className="court-details" style={{ height: '100%' }}>
                                            <div className="court-info" style={{ height: '100%' }}>
                                                <Title level={5} className="overflow-hidden">{c.title}</Title>
                                                <Paragraph>Khu vực: {c.address}</Paragraph>
                                                <Paragraph className="service-paragraph" style={{ height: '25px' }}>
                                                    {c.services.slice(0, 2).map((service) => (
                                                        <Tag key={service.id}>{service.serviceName}</Tag>
                                                    ))}
                                                </Paragraph>
                                                <Row justify="space-between" align="middle" className="rating-row">
                                                    <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                                                    <Row>
                                                        <FaStar className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />
                                                        <FaStar className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />
                                                        <FaStar className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />
                                                        <FaStar className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />
                                                        <FaStarHalfAlt className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />
                                                        <Typography.Paragraph style={{ marginLeft: '5px' }}>(4.5)</Typography.Paragraph>
                                                    </Row>
                                                </Row>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                            <Col>
                                <Button onClick={handleNext} style={{
                                    backgroundColor: !hasNext ? 'white' : "#115363",
                                    color: !hasNext ? 'black' : 'white'
                                }} disabled={!hasNext} icon={<IoIosArrowForward />} />
                            </Col>
                        </Row>
                    </Space>
                )}
            </Row>
        </>
    );
}

export default observer(CourtClusterList);
