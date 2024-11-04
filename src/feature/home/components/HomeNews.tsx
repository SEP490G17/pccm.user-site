import { useStore } from "@/app/stores/store";
import { Card, Col, Row, Image, Skeleton, Typography, Button, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./style/HomeNews.scss";

const { Title } = Typography;

interface IProps {
    title: string;
    itemsPerPage: number;
}

function HomeNews({ title, itemsPerPage }: IProps) {
    const { newsStore } = useStore();
    const { listNews, loadListNews, loadingInitial } = newsStore;

    useEffect(() => {
        loadListNews();
    }, []);

    const [currentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = listNews.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Title level={3} className="news-title">{title}</Title>
            </Row>
            <Row gutter={[16, 16]} className="news-row">
                {loadingInitial ? (
                    <Skeleton />
                ) : (
                    <>
                        {currentItems.map((news, index) => (
                            <Col key={news.id} span={index === 1 ? 16 : 8} >
                                <Link to={`/news/${news.id}`} key={news.id}>
                                    <Card
                                        hoverable
                                        bodyStyle={{ padding: 0 }}
                                        className="news-card"
                                    >
                                        <div className="card-image-wrapper">
                                            <Image
                                                src={news.thumbnail}
                                                alt={news.title}
                                                className="news-card-image"
                                                loading="lazy"
                                                preview={false}
                                            />
                                        </div>
                                        <div className="card-content">
                                            <Typography.Text strong className="card-title">
                                                {news.title}
                                            </Typography.Text>
                                            <div className="card-info">
                                                <div className="card-tags">
                                                    {news.tags.map((tag: string) => (
                                                        <Tag key={tag} style={{ marginRight: '4px' }}>
                                                            {tag}
                                                        </Tag>
                                                    ))}
                                                </div>
                                                <Typography.Text className="card-date">
                                                    Ngày đăng: {news.createdAt}
                                                </Typography.Text>
                                            </div>
                                        </div>

                                    </Card>
                                </Link>
                            </Col>
                        ))}
                        {currentItems.length < itemsPerPage &&
                            Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
                                <Col key={index} span={6}>
                                    <div className="news-card empty-card" style={{ height: '300px' }}></div>
                                </Col>
                            ))}
                    </>
                )}
            </Row>

            <Row justify="center">
                <Button
                    type="primary"
                    className="view-more-btn"
                    onClick={() => window.location.href = '/news'}
                >
                    Xem thêm
                </Button>
            </Row>
        </>
    );
}

export default observer(HomeNews);
