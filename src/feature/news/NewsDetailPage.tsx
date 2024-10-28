import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import { useParams, Link } from 'react-router-dom';
import './style/NewsDetailPage.scss';
import ListBanner from '@/feature/home/components/HomeBanner';
import { FacebookOutlined, TwitterOutlined, LinkOutlined } from '@ant-design/icons';
import defaultThumbnail from '@/assets/defaultUser.png';


const NewsDetail: React.FC = () => {
    const { newsStore } = useStore();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (newsStore.listNews.length === 0) {
            newsStore.loadListNews();
        }
    }, [newsStore]);

    const newsItem = id
        ? newsStore.listNews.find((news) => news.id === parseInt(id)) || null
        : null;

    if (!newsItem) {
        return <div>Không tìm thấy tin tức</div>;
    }

    return (
        <div className="news-detail" style={{ maxWidth: '85%', margin: 'auto', padding: '20px 0px' }}>
            <Breadcrumb style={{ padding: '15px 0px' }} className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/home">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/news">Tin tức</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{newsItem.title}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: '50px' }}>
                <ListBanner title="" />
            </div>
            <div className="news-detail-content">
                <div className="content-wrapper">
                    <div className="toc">
                        <h3 className="toc-title">Mục lục nội dung</h3>
                        <ul className="toc-list">
                            <li>1. Quy trình thiết kế sân pickleball</li>
                            <li>2. Thi công sân pickleball</li>
                            <li>3. Báo giá thiết kế</li>
                        </ul>
                    </div>
                    <div className="main-content">
                        <h1 className="news-title">{newsItem.title}</h1>
                        <img
                            src={newsItem.thumbnail || defaultThumbnail}
                            alt={newsItem.title || 'News image'}
                            className="news-thumbnail"
                        />
                        <p className="news-description">{newsItem.description}</p>
                        <div className="news-tags">
                            <strong>Tags:</strong>
                            {newsItem.tags.map((tag, index) => (
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="news-date">
                            <strong>Ngày đăng:</strong> {new Date(newsItem.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="social-section">
                        <div className="social-item">
                            <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
                        </div>
                        <div className="social-item">
                            <TwitterOutlined style={{ fontSize: '24px', color: '#00acee' }} />
                        </div>
                        <div className="social-item">
                            <img
                                src="https://img.icons8.com/color/48/000000/zalo.png"
                                alt="Zalo"
                                style={{ width: '24px', height: '24px' }}
                            />
                        </div>
                        <div className="social-item">
                            <LinkOutlined style={{ fontSize: '24px', color: '#000000' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(NewsDetail);
