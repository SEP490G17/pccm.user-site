import { useStore } from "@/app/stores/store";
import { Button, Card, Row, Col, Typography, Select, Input, Tag, Image } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import ListBanner from '@/feature/home/components/HomeBanner';
import Pagination from '@/feature/atoms/Pagination';
import "./ListCourtCluster.scss";
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

interface IProps {
    itemsPerPage: number;
}

function ListCourtCluster({ itemsPerPage }: IProps) {
    const { courtStore } = useStore();
    const { listCourt, loadListCourt, loadingInitial } = courtStore;

    useEffect(() => {
        window.scrollTo(0, 0);
        loadListCourt();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = listCourt.slice(startIndex, startIndex + itemsPerPage);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="list-court-cluster">
            <PageHeadingAtoms
                breadCrumb={[
                    { title: "Trang chủ", to: "/home" },
                    { title: "Sân thể thao", to: "/list-courtcluster" }
                ]}
            />
            <Row justify="space-between" align="middle" className="filter-row" style={{ marginBottom: "32px" }}>
                <Col span={3}>
                    <Button type="primary" icon={<IoMdRefresh />} style={{ width: "100%", backgroundColor: 'green' }}>
                        Danh mục sân
                    </Button>
                </Col>
                <Col span={6}>
                    <Search placeholder="Tìm sân" style={{ width: "100%" }} />
                </Col>
                <Col span={3}>
                    <Select defaultValue="Tất cả" style={{ width: "100%" }}>
                        <Option value="all">Khu vực</Option>
                        <Option value="hanoi">Hà Nội</Option>
                        <Option value="hochiminh">Hồ Chí Minh</Option>
                        <Option value="danang">Đà Nẵng</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Tất cả" style={{ width: "100%" }}>
                        <Option value="all">Đánh giá</Option>
                        <Option value="5">5 sao</Option>
                        <Option value="4">4 sao</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Tất cả" style={{ width: "100%" }}>
                        <Option value="all">Mức giá</Option>
                        <Option value="low">Thấp</Option>
                        <Option value="medium">Trung bình</Option>
                        <Option value="high">Cao</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    <Button type="primary" style={{ width: "100%", backgroundColor: 'green' }}>
                        Tìm sân
                    </Button>
                </Col>
            </Row>

            <div className="banner-container">
                <ListBanner title="" />
            </div>

            <Row gutter={[16, 16]} className="court-list">
                {loadingInitial
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <Col key={i} span={5}>
                            <Card loading={true} />
                        </Col>
                    ))
                    : currentItems.map((c) => (
                        <Col key={c.id} span={6} className="court-col">
                            <Card hoverable className="court-card">
                                <Image src={c.images[0]} width={"100%"} height={"200px"} />
                                <div className="court-details">
                                    <div className="court-info">
                                        <Title level={5} className="court-title">{c.title}</Title>
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
                                                <FaStar className="text-yellow-500" color="#f7d03f" />
                                                <FaStar className="text-yellow-500" color="#f7d03f" />
                                                <FaStar className="text-yellow-500" color="#f7d03f" />
                                                <FaStar className="text-yellow-500" color="#f7d03f" />
                                                <FaStarHalfAlt className="text-yellow-500" color="#f7d03f" />
                                                <Typography.Paragraph className="rating-value">(4.5)</Typography.Paragraph>
                                            </Row>
                                        </Row>
                                    </div>
                                    <Button className="book-button">
                                        Đặt ngay kẻo muộn
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
            </Row>

            <Row justify="center" className="pagination">
                <Pagination
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                    total={listCourt.length}
                    onPageChange={onPageChange}
                />
            </Row>
        </div>
    );
}

export default observer(ListCourtCluster);