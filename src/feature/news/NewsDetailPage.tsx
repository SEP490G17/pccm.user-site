import { useStore } from '@/app/stores/store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style/NewsDetailPage.scss';
// import ListBanner from '@/feature/home/components/HomeBanner';
// import { FacebookOutlined, TwitterOutlined, LinkOutlined } from '@ant-design/icons';
import defaultThumbnail from '@/assets/defaultUser.png';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';

const NewsDetail: React.FC = () => {
    const { newsStore } = useStore();
    const { id } = useParams<{ id: string }>();
    const newsId = Number(id);
    const { newsDetail } = newsStore
    window.scrollTo(0, 0);
    useEffect(() => {
        newsStore.detailNews(newsId);
    }, [newsStore, newsId]);

    if (!newsDetail) {
        return <div>Không tìm thấy tin tức</div>;
    }

    return (
        <div className="news-detail" style={{ margin: 'auto', padding: '20px 0px' }}>
            <PageHeadingAtoms
                breadCrumb={[
                    { title: "Trang chủ", to: "/trang-chu" },
                    { title: "Tin tức", to: `/tin-tuc` },
                    { title: newsDetail.title, to: `/tin-tuc/${newsDetail.id}` }
                ]}
            />
            {/* <div style={{ marginBottom: '50px' }}>
                <ListBanner title="" />
            </div> */}
            <div className="news-detail-content">
                <div className="content-wrapper">
                    <div className="main-content">
                        <h1 className="news-title">{newsDetail.title}</h1>
                        <img
                            src={newsDetail.thumbnail || defaultThumbnail}
                            alt={newsDetail.title || 'News image'}
                            className="news-thumbnail"
                        />
                        <div className="news-description" dangerouslySetInnerHTML={{ __html: newsDetail.description }} />
                        <div className="news-tags">
                            <strong>Tags: </strong>
                            {newsDetail.tags.map((tag, index) => (
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="news-date">
                            <strong>Ngày đăng: </strong> {new Date(newsDetail.createdAt).toLocaleDateString()}
                        </div>
                        <div className="news-content" dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
                    </div>
                    {/* <div className="social-section">
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default observer(NewsDetail);
