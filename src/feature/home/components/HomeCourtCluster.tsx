import { useStore } from "@/app/stores/store";
import { Button, Card, Row, Col, Skeleton, Typography, Tag, Image } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style/HomeCourtCluster.scss';

const { Title, Paragraph } = Typography;

interface IProps {
    title: string,
    itemsPerPage: number
}

function CourtClusterList({ title, itemsPerPage }: IProps) {
    const { courtStore } = useStore();
    const { listCourt, loadListCourt, loadingInitial } = courtStore;
    const navigate = useNavigate();

    useEffect(() => {
        loadListCourt();
    }, []);

    const [currentPage] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const filteredCourts = selectedLocation
        ? listCourt.filter(court => court.location.thanhpho === selectedLocation)
        : listCourt;
    const currentItems = filteredCourts.slice(startIndex, startIndex + itemsPerPage);

    const handleLocationFilter = (location: string) => {
        setSelectedLocation(location);
    };

    return (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Title level={3}>{title}</Title>
                <div>
                    {["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"].map(location => (
                        <Button
                            key={location}
                            type={selectedLocation === location ? "primary" : "default"}
                            onClick={() => handleLocationFilter(location)}
                            style={{ marginRight: '8px' }}
                        >
                            {location}
                        </Button>
                    ))}
                </div>
            </Row>
            <Row justify="space-between">
                {loadingInitial ? (
                    <Skeleton active />
                ) : (
                    <>
                        {currentItems.map((c) => (
                            <Col key={c.id} span={6} style={{ padding: '10px' }} >
                                <Card hoverable className="court-card">
                                    <Image src={c.images[0]} width={"100%"} height={"200px"} />
                                    <div className="court-details">
                                        <div className="court-info">
                                            <Title level={5} className="overflow-hidden">{c.title}</Title>
                                            <Paragraph>
                                                Khu vực: {c.location.thanhpho} - {c.location.tinh}
                                            </Paragraph>
                                            <Paragraph className="service-paragraph">
                                                Dịch vụ: {c.services.slice(0, 2).map((service) => (
                                                    <Tag key={service.id}>{service.name}</Tag>
                                                ))}
                                            </Paragraph>
                                            <Paragraph className="product-paragraph">
                                                Sản phẩm: {c.products.slice(0, 2).map(product => product.name).join(', ')}
                                            </Paragraph>
                                            <Row justify="space-between" align="middle" className="rating-row">
                                                <Paragraph>Số sân: {c.quantity}</Paragraph>
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
                                        <Button className="book-button" onClick={() => navigate('/dat-san')}>
                                            Đặt ngay kẻo muộn
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                        {currentItems.length < itemsPerPage &&
                            Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
                                <Col key={index} span={6}>
                                    <div className="court-card empty-card" style={{ height: '100%' }}></div>
                                </Col>
                            ))}
                    </>
                )}
            </Row>
        </>
    );
}

export default observer(CourtClusterList);
 