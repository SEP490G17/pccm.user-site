import './style/NewsPage.scss';

import { Link } from 'react-router-dom';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import Pagination from '@/feature/atoms/Pagination';
import { Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '@/app/stores/store';

const NewsPage = () => {
    const { newsStore } = useStore();

    useEffect(() => {
        newsStore.loadListNews();
    }, [newsStore]);

    const sortedNews = newsStore.paginatedNews.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const recentPosts = sortedNews.slice(0, 5);
    const shuffledNews = [...newsStore.listNews].sort(() => 0.5 - Math.random());
    const { currentPage, pageSize } = newsStore;
 

    return (
        <div className="news-page">
            <PageHeadingAtoms
                breadCrumb={[
                    { title: "Trang chủ", to: "/trang-chu" },
                    { title: "Tin tức", to: "/tin-tuc/" }
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
                                <Link key={newsItem.id} to={`/tin-tuc/${newsItem.id}`} className="news-item">
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
                    <h3 className="section-title recent-posts-title" >Bài viết gần đây</h3>
                    {newsStore.loadingInitial ? (
                        <Skeleton active title paragraph={{ rows: 3 }} />
                    ) : (
                        <div className="recent-post-list">
                            {recentPosts.map((newsItem) => (
                                <Link key={newsItem.id} to={`/tin-tuc/${newsItem.id}`} className="recent-post-item">
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
                <h3 className="section-title">Tin liên quan</h3>
                {newsStore.loadingInitial ? (
                    <Skeleton active title paragraph={{ rows: 3 }} />
                ) : (
                    <div className="related-news-container">
                        <div className="related-news-list">
                            {shuffledNews.map((newsItem) => (
                                <Link key={newsItem.id} to={`/tin-tuc/${newsItem.id}`} className="related-news-item">
                                    <img src={newsItem.thumbnail || '/default-thumbnail.jpg'} alt={newsItem.title} />
                                    <h4>{newsItem.title}</h4>
                                    <p>{newsItem.title.slice(0, 70)}...</p>
                                    <span>{new Date(newsItem.createdAt).toLocaleDateString()}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(NewsPage);
