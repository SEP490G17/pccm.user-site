import { useStore } from "@/app/stores/store";
import { Button, Card, Row, Col, Skeleton, Typography, Tag, Image } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style/HomeCourtCluster.scss';

const { Title, Paragraph } = Typography;

interface IProps {
    title: string,
}

function CourtClusterList({ title }: IProps) {
    const { courtStore } = useStore();
    const { listCourt, loadListCourt, loadingInitial } = courtStore;
    const navigate = useNavigate();

    useEffect(() => {
        loadListCourt();
    }, [loadListCourt]);

    const newestCourts = listCourt
        .slice()
        .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
        .slice(0, 4);

    return (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Title level={3}>{title}</Title>
            </Row>
            <Row justify="space-between">
                {loadingInitial ? (
                    <Skeleton active />
                ) : (
                    newestCourts.map((c) => (
                        <Col key={c.id} span={6} style={{ padding: '10px' }}>
                            <Card hoverable className="court-card">
                                <Image src={c.images[0]} width={"100%"} height={"200px"} />
                                <div className="court-details">
                                    <div className="court-info">
                                        <Title level={5} className="overflow-hidden">{c.title}</Title>
                                        <Paragraph>Khu vực: {c.location.thanhpho} - {c.location.tinh}</Paragraph>
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
                                                <FaStar color="#f7d03f" style={{ marginTop: '3px' }} />
                                                <FaStar color="#f7d03f" style={{ marginTop: '3px' }} />
                                                <FaStar color="#f7d03f" style={{ marginTop: '3px' }} />
                                                <FaStar color="#f7d03f" style={{ marginTop: '3px' }} />
                                                <FaStarHalfAlt color="#f7d03f" style={{ marginTop: '3px' }} />
                                                <Paragraph style={{ marginLeft: '5px' }}>(4.5)</Paragraph>
                                            </Row>
                                        </Row>
                                    </div>
                                    <Button className="book-button" onClick={() => navigate('/dat-san')}>
                                        Đặt ngay kẻo muộn
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
}

export default observer(CourtClusterList);
