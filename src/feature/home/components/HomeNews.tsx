import { useStore } from '@/app/stores/store';
import { Card, Col, Row, Skeleton, Typography, Button, Tag, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/HomeNews.scss';

const { Title } = Typography;

interface IProps {
  title: string;
  itemsPerPage: number;
}

const HomeNews = observer(({ title, itemsPerPage }: IProps) =>{
  const { newsStore } = useStore();
  const { listNews, loadNews, loadingInitial } = newsStore;

  useEffect(() => {
    loadNews();
  }, [loadNews]);


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
            {listNews.map((news, index) => {
              
              if(index >= itemsPerPage) return;
              return (
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
            )})}
          
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
})

export default HomeNews;
