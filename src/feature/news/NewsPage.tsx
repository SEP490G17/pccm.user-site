import './style/NewsPage.scss';
import { Link } from 'react-router-dom';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import { Button, Input, Skeleton, Tag, Checkbox, Row, Col, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '@/app/stores/store';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

const NewsPage = observer(() => {
  const { newsStore } = useStore();
  const {
    loadNews,
    listNews,
    newsPageParam,
    newsRegistry,
    loadCommonTags,
    loadAnotherNews,
    anotherTags,
    commonTags,
    anotherTagsPageParam,
    handleChangeTags,
    handlerSearchTempChange,
  } = newsStore;

  useEffect(() => {
    loadNews();
    loadCommonTags();
    loadAnotherNews();
  }, [loadNews, loadCommonTags, loadAnotherNews]);

  const onChange = (list: any) => {
    handleChangeTags(list);
  };

  const tags = Array.from(commonTags.entries()).map((ct) => ({
    value: ct[0],
    count: ct[1],
  }));

  const handlSearch = async () => {
    newsPageParam.clearLazyPage();
    newsRegistry.clear();
    await loadNews();
  };

  return (
    <div className="news-page">
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/trang-chu' },
          { title: 'Tin tức', to: '/tin-tuc/' },
        ]}
      />

      <div className="news-main-section">
        <div className="news-updates">
          <div className="w-full gap-4 flex justify-between">
            <h2 className="section-title">Tin tức </h2>
            <div className="flex justify-end items-end mt-auto gap-2 h-10 mb-5">
              <Input
                placeholder="Tìm kiếm"
                className="w-80 h-10"
                value={newsPageParam.searchTerm}
                onChange={(e: any) => {
                  handlerSearchTempChange(e.target.value);
                }}
              />
              <Button type="text" className="h-10 bg-teal-600 text-white" onClick={handlSearch}>
                Tìm kiếm
              </Button>
            </div>
          </div>
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
        <div>
          <h2 className="section-title" style={{ marginBottom: '1.8rem' }}>
            Lọc kết quả{' '}
          </h2>
          <div className="fixFilter">
            <Checkbox.Group value={newsPageParam.tagsList} onChange={onChange} className="w-full">
              <div className="recent-posts">
                <h3 className="section-title recent-posts-title">Top 5 tags phổ biến</h3>
                <Row className="mb-5">
                  {tags.map((tag, index) => (
                    <Col span={24} key={index} className="flex items-center justify-between">
                      <Checkbox value={tag.value} className="gap-2">
                        {tag.value}
                      </Checkbox>
                      <p className="inline-flex text-white bg-red-500 w-5 h-5 text-center rounded-full justify-center items-center">
                        {tag.count}
                      </p>
                    </Col>
                  ))}
                </Row>

                <Accordion defaultIndex={[0]} allowMultiple className="border-none">
                  <AccordionItem className="border-none">
                    <h3 className="section-title recent-posts-title">
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Các tác khác
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      <Row className="mb-3">
                        {anotherTags.map((tag, index) => (
                          <Col span={24} key={index} className="flex items-center justify-between">
                            <Checkbox value={tag} className="gap-2">
                              {tag}
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>

                      <Flex className="justify-center">
                        {anotherTagsPageParam.totalElement > anotherTags.length && (
                          <Button
                            type="link"
                            onClick={() => {
                              anotherTagsPageParam.skip = anotherTags.length;
                              loadAnotherNews();
                            }}
                          >
                            Xem thêm...
                          </Button>
                        )}
                      </Flex>
                      <Flex className="mt-5 justify-end w-full gap-4">
                        <Button
                          type="text"
                          className="bg-teal-700 text-white"
                          onClick={async () => {
                            newsPageParam.clearLazyPage();
                            newsRegistry.clear();
                            await loadNews();
                          }}
                        >
                          Lọc
                        </Button>
                        <Button type="text" className="bg-red-600 text-white">
                          Reset
                        </Button>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewsPage;
