import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import { Skeleton, Row, Col, Button } from 'antd';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import { Link } from 'react-router-dom';
import Pagination from '@/feature/atoms/Pagination';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './style/NewsPage.scss';

const NewsPage = () => {
    const { newsStore } = useStore();

    useEffect(() => {
        newsStore.loadListNews();
    }, [newsStore]);

    const sortedNews = newsStore.paginatedNews.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const recentPosts = sortedNews.slice(0, 5);
    const shuffledNews = [...newsStore.listNews].sort(() => 0.5 - Math.random());
    const relatedPageSize = 4;
    const { currentPage, pageSize, relatedNewsCurrentPage } = newsStore;


    const hasRelatedPrevious = relatedNewsCurrentPage > 1;
    const hasRelatedNext = relatedNewsCurrentPage < Math.ceil(shuffledNews.length / pageSize);


    const handleRelatedNext = () => {
        if (hasRelatedNext) {
            newsStore.setRelatedNewsCurrentPage(relatedNewsCurrentPage + 1);
        }
    };

    const handleRelatedPrevious = () => {
        if (hasRelatedPrevious) {
            newsStore.setRelatedNewsCurrentPage(relatedNewsCurrentPage - 1);
        }
    };

    return (
        <div className="news-page">
            <PageHeadingAtoms
                breadCrumb={[
                    { title: "Trang chủ", to: "/home" },
                    { title: "Tin tức", to: "/news/" }
                ]}
            />
            <div className="news-main-section">
                <div className="news-updates">
                    <h2 className="section-title">Tin tức mới cập nhật</h2>
                    {newsStore.loadingInitial ? (
                        <Skeleton active title paragraph={{ rows: 4 }} />
                    ) : (
                        <div className="news-list">
                            {sortedNews.map((newsItem) => (
                                <Link key={newsItem.id} to={`/news/${newsItem.id}`} className="news-item">
                                    <img
                                        className="thumbnail"
                                        src={newsItem.thumbnail}
                                        alt={newsItem.title}
                                    />
                                    <div className="news-content">
                                        <h3>{newsItem.title}</h3>
                                        <p>{newsItem.title}</p>
                                        <span>{new Date(newsItem.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        total={newsStore.listNews.length}
                        onPageChange={(page) => newsStore.setCurrentPage(page)}
                    />
                </div>

                <div className="recent-posts">
                    <h3 className="section-title recent-posts-title" style={{ marginTop: '30px' }}>Bài viết gần đây</h3>
                    {newsStore.loadingInitial ? (
                        <Skeleton active title paragraph={{ rows: 3 }} />
                    ) : (
                        <div className="recent-post-list">
                            {recentPosts.map((newsItem) => (
                                <Link key={newsItem.id} to={`/news/${newsItem.id}`} className="recent-post-item">
                                    <img src={newsItem.thumbnail || '/default-thumbnail.jpg'} alt={newsItem.title} />
                                    <div className="recent-post-content">
                                        <h4>{newsItem.title}</h4>
                                        <p>{newsItem.title.slice(0, 70)}...</p>
                                        <span className="post-date">{new Date(newsItem.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="related-news">
                <h3 className="section-title" style={{ marginTop: '30px' }}>Tin liên quan</h3>
                {newsStore.loadingInitial ? (
                    <Skeleton active title paragraph={{ rows: 3 }} />
                ) : (
                    <div className="related-news-container">
                        <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                            <Col>
                                <Button onClick={handleRelatedPrevious} type="primary" disabled={!hasRelatedPrevious} icon={<IoIosArrowBack />} />
                            </Col>
                        </Row>
                        <div className="related-news-list">
                            {shuffledNews.slice((relatedNewsCurrentPage - 1) * relatedPageSize, relatedNewsCurrentPage * relatedPageSize).map((newsItem) => (
                                <Link key={newsItem.id} to={`/news/${newsItem.id}`} className="related-news-item">
                                    <img src={newsItem.thumbnail || '/default-thumbnail.jpg'} alt={newsItem.title} />
                                    <h4>{newsItem.title}</h4>
                                    <p>{newsItem.title.slice(0, 70)}...</p>
                                    <span>{new Date(newsItem.createdAt).toLocaleDateString()}</span>
                                </Link>
                            ))}
                        </div>
                        <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                            <Col>
                                <Button onClick={handleRelatedNext} type="primary" disabled={!hasRelatedNext} icon={<IoIosArrowForward />} />
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(NewsPage);
