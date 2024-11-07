import { useStore } from "@/app/stores/store";
import { Button, Card, Row, Col, Skeleton, Typography, Tag, Image, Space, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style/HomeCourtCluster.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CourtBookingForm from "@/feature/booking/BookingForm";

const { Title, Paragraph } = Typography;

interface IProps {
    title: string,
    itemsPerPage: number
}

function CourtClusterList({ title, itemsPerPage }: IProps) {
    const { courtClusterStore } = useStore();
    const { listCourt, loadListCourt, loadingInitial } = courtClusterStore;
    const navigate = useNavigate();

    const courts = [
        { id: 'court1', name: 'Sân 1', number: 1, availableSlots: ['10:00 - 13:00', '15:00 - 20:00'] },
        { id: 'court2', name: 'Sân 2', number: 2, availableSlots: ['09:00 - 12:00', '14:00 - 20:00'] },
        { id: 'court3', name: 'Sân 3', number: 3, availableSlots: ['09:00 - 10:00', '12:00 - 15:00', '17:00 - 20:00'] },
    ];

    const handleBook = (values) => {
        console.log(`Đã đặt sân ID: ${values.court} vào lúc ${values.timeSlot}`);
    };

    useEffect(() => {
        loadListCourt();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = listCourt.slice(startIndex, startIndex + itemsPerPage);

    const hasPrevious = currentPage > 1;
    const hasNext = startIndex + itemsPerPage < listCourt.length;

    const handleNext = () => {
        if (hasNext) {
            setCurrentPage(currentPage + 1);
        } else {
            // Loop back to the first page when at the end
            setCurrentPage(1);
        }
    };

    const handlePrevious = () => {
        if (hasPrevious) {
            setCurrentPage(currentPage - 1);
        } else {
            // Loop back to the last page when at the beginning
            const lastPage = Math.ceil(listCourt.length / itemsPerPage);
            setCurrentPage(lastPage);
        }
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
                    <Space size={"large"}>
                        <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                            <Col>
                                <Button onClick={handlePrevious} type="primary" disabled={!hasPrevious} icon={<IoIosArrowBack />} />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            {currentItems.map((c) => (
                                <Col span={8}>
                                    <Card hoverable className="court-card" style={{ height: '465px' }}>
                                        <Image src={c.images[0]} />
                                        <div className="court-details" style={{ height: '100%' }}>
                                            <div className="court-info" style={{ height: '100%' }}>
                                                <Title level={5} className="overflow-hidden">{c.title}</Title>
                                                <Paragraph>
                                                    Khu vực: {c.address}
                                                </Paragraph>
                                                <Paragraph className="service-paragraph" style={{ height: '25px' }}>
                                                    {c.services.slice(0, 2).map((service) => (
                                                        <Tag key={service.id}>{service.serviceName}</Tag>
                                                    ))}
                                                </Paragraph>
                                                {/* <Paragraph className="product-paragraph">
                                                    Sản phẩm: {c.products.slice(0, 2).map(product => product.productName).join(', ')}
                                                </Paragraph> */}
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
                                            <Flex justify="space-between">
                                                <CourtBookingForm
                                                    courts={courts}
                                                    onBook={handleBook} >

                                                </CourtBookingForm>
                                                <Button
                                                    className="book-button"
                                                    onClick={async () => {
                                                        await courtClusterStore.getDetailsCourtCluster(c.id.toString());
                                                        navigate(`/dat-san/${c.id}`);
                                                    }}
                                                >
                                                    Đặt ngay kẻo muộn
                                                </Button>
                                            </Flex>

                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                            <Col>
                                <Button onClick={handleNext} type="primary" disabled={!hasNext} icon={<IoIosArrowForward />} />
                            </Col>
                        </Row>
                    </Space>
                )}
            </Row>
        </>
    );
}

export default observer(CourtClusterList);
