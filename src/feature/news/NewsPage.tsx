import './style/NewsPage.scss';

import { Link } from 'react-router-dom';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import { Button, Flex, Input, Skeleton, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '@/app/stores/store';

const NewsPage = observer(() => {
  const { newsStore } = useStore();
  const { loadNews, listNews, newsPageParam, newsRegistry, loadCommonTags, commonTags, setTagsTerm, tagList } = newsStore;
  useEffect(() => {
    loadNews();
    loadCommonTags();
  }, [loadNews, loadCommonTags]);

  return (
    <div className="news-page">
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/trang-chu' },
          { title: 'Tin tức', to: '/tin-tuc/' },
        ]}
      />
      <h2 className="section-title">Tin tức mới cập nhật</h2>
      <div className="w-full gap-4 flex">
        <Input placeholder="Tìm kiếm" className="w-80" />
        <Input placeholder="Tìm kiếm theo tags" className="w-80" />
        <Button type='primary'>Tìm kiếm</Button>
      </div>
      <div className="news-main-section">
        <div className="news-updates">
          {newsStore.loadingInitial && newsRegistry.size == 0 ? (
            <Skeleton active title paragraph={{ rows: 4 }} />
          ) : (
            <div className="news-list">
              {listNews.map((newsItem) => (
                <Link key={newsItem.id} to={`/tin-tuc/${newsItem.id}`} className="news-item">
                  <img className="thumbnail" src={newsItem.thumbnail} alt={newsItem.title} />
                  <div className="news-content">
                    <h3>{newsItem.title}</h3>
                    <p>{newsItem.title}</p>
                    <span>{new Date(newsItem.createdAt).toLocaleDateString()}</span>
                    <div className="flex flex-row gap-2 mt-5">
                      {newsItem.tags.map((tag) => (
                        <Tag key={tag} color="green">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
              <div className="flex items-center justify-center">
                {newsRegistry.size < newsPageParam.totalElement && (
                  <Button
                    loading={newsStore.loadingInitial}
                    onClick={() => {
                      newsPageParam.skip = newsRegistry.size;
                      if (newsRegistry.size < newsPageParam.totalElement) {
                        loadNews();
                      }
                    }}
                    type="primary"
                  >
                    Xem thêm
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="recent-posts">
          <h3 className="section-title recent-posts-title">Top 10 tags phổ biến</h3>
          <Flex gap={8} className="flex-col">
            {Array.from(commonTags.entries()).map((ct, index) => {
              return (
                <Tag
                  bordered={false}
                  key={index}
                  className="gap-2 text-black h-6 items-center flex justify-between hover:bg-teal-500"
                  onClick={()=> setTagsTerm(ct[0])}
                >
                  {ct[0]}
                  <p className="inline-flex  text-white bg-red-500 w-5 h-5 text-center rounded-full justify-center">
                    {ct[1]}
                  </p>
                </Tag>
              );
            })}
          </Flex>
        </div>
      </div>
    </div>
  );
});

export default NewsPage;
