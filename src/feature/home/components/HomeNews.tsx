import { useStore } from '@/app/stores/store';
import { Card, Col, Row, Skeleton, Typography, Button, Tag, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/HomeNews.scss';

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
        <Title level={3} className="news-title">
          {title}
        </Title>
      </Row>
      <Row gutter={[16, 16]} className="news-row">
        {loadingInitial ? (
          <Skeleton />
        ) : (
          <>
            {currentItems.map((news, index) => (
              <Col
                key={news.id}
                xs={24}
                sm={24}
                md={index === 1 ? 16 : 8}
                lg={index === 1 ? 16 : 8}
              >
                <Link to={`/tin-tuc/${news.id}`} key={news.id}>
                  <Card
                    hoverable
                    bodyStyle={{
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                    className="news-card"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${news.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div className="card-content" style={{ padding: '16px' }}>
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
                          Ngày đăng: {new Date(news.createdAt).toLocaleDateString()}
                        </Typography.Text>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
            {currentItems.length < itemsPerPage &&
              Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                >
                  <div className="news-card empty-card" style={{ height: '300px' }}></div>
                </Col>
              ))}
            <Flex justify='center' className='w-full'>
              <Button
                style={{ backgroundColor: '#115363' }}
                type="primary"
                className="view-more-btn"
                onClick={() => (window.location.href = '/tin-tuc')}
              >
                Xem thêm
              </Button>
            </Flex>
          </>
        )}
      </Row>
    </>
  );
}

export default observer(HomeNews);
