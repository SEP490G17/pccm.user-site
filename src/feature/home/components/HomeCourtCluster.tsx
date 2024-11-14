import { useStore } from "@/app/stores/store";
import { Button, Card, Row, Col, Skeleton, Typography, Tag, Image, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style/HomeCourtCluster.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CourtBookingForm from "@/feature/booking/components/BookingSuggestHours/BookingForm";

const { Title, Paragraph } = Typography;

interface IProps {
    title: string;
    itemsPerPage: number;
}

function CourtClusterList({ title, itemsPerPage }: IProps) {
    const { courtClusterStore } = useStore();
    const { listCourt, loadListCourt, loadingInitial } = courtClusterStore;
    const navigate = useNavigate();

    useEffect(() => {
        loadListCourt();
    }, [loadListCourt]);

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingCourtId, setLoadingCourtId] = useState<number | null>(null);
    const [quickBookingLoadingCourtId, setQuickBookingLoadingCourtId] = useState<number | null>(null);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = listCourt.slice(startIndex, startIndex + itemsPerPage);

    const hasPrevious = currentPage > 1;
    const hasNext = startIndex + itemsPerPage < listCourt.length;

    const handleNext = () => {
        setCurrentPage(hasNext ? currentPage + 1 : 1);
    };

    const handlePrevious = () => {
        setCurrentPage(hasPrevious ? currentPage - 1 : Math.ceil(listCourt.length / itemsPerPage));
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
                                <Col span={8} key={c.id}>
                                    <Card hoverable className="court-card" style={{ height: '420px' }}>
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
                                                    loading={quickBookingLoadingCourtId === c.id}
                                                    className="book-button"
                                                    onClick={async () => {
                                                        setQuickBookingLoadingCourtId(c.id);
                                                        await courtClusterStore.getDetailsCourtCluster(c.id.toString());
                                                        navigate(`/dat-san/${c.id}`);
                                                        setQuickBookingLoadingCourtId(null);
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
