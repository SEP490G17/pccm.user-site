import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Pagination,
  Progress,
  Rate,
  Row,
  Typography,
} from 'antd';
import { IReview, ReviewsDto } from '@/app/models/review.model';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaStar } from 'react-icons/fa';
import ReviewCard from '../../../../booking/history/components/ReviewCard';
import TextArea from 'antd/es/input/TextArea';
import { useStore } from '@/app/stores/store';
import { useToast } from '@chakra-ui/react';

interface IProps {
  reviews?: IReview[] | undefined;
  courtClusterId: number | undefined;
}

const ReviewCourtClusterComponent = ({ reviews, courtClusterId }: IProps) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toast = useToast();
  const { courtClusterDetailsStore, commonStore } = useStore();
  const [form] = Form.useForm();
  const ratingsData: { [key: string]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let totalRating = 0;
  reviews?.forEach((review) => {
    const rating = review.rating;
    totalRating += rating;
    if (ratingsData[rating]) {
      ratingsData[rating]++;
    } else {
      ratingsData[rating] = 1;
    }
  });

  const desc = ['1', '2', '3', '4', '5'];
  const totalVotes = Object.values(ratingsData).reduce((acc, votes) => acc + votes, 0);

  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine items per page based on screen size
  const getResponsiveItemsPerPage = () => {
    if (windowWidth < 576) return 2; // xs
    if (windowWidth < 992) return 3; // sm and md
    return 4; // lg and xl
  };

  const itemsPerPage = getResponsiveItemsPerPage();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reviews?.slice(startIndex, startIndex + itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFinish = async (values: any) => {
    if (values.star == null) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng đánh giá sao',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      const data = new ReviewsDto({
        phoneNumber: commonStore.getPhoneNumber(),
        comment: values.comment,
        courtclusterId: courtClusterId,
        rating: values.star,
      });
      try {
        await courtClusterDetailsStore.createReviews(data, toast);
        form.resetFields();
      } catch (error) {
        console.error("Error creating review:", error);
      }
    }
  };

  const getPercentage = (votes: number) => (votes / totalVotes) * 100;
  return (
    <Card>
      <Flex vertical>
        <Typography.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          Đánh giá sân thể thao
          <Typography.Text style={{ fontWeight: 'normal' }}> ({reviews?.length} đánh giá)</Typography.Text>
        </Typography.Text>
        <Divider type="horizontal" style={{ border: '1px solid rgb(200, 200, 200)' }} />
      </Flex>
      <Row>
        <Col xs={24} sm={24} md={18} lg={18} push={windowWidth < 768 ? 0 : 6}>
          {Object.keys(ratingsData)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((star) => (
              <Row key={star} align="middle" style={{ marginBottom: '10px' }}>
                <Col xs={6} sm={4} style={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }}>
                  <Rate disabled defaultValue={parseInt(star)} style={{ fontSize: '16px' }} />
                </Col>
                <Col xs={12} sm={15} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                  <Progress
                    strokeColor="#108554"
                    percent={getPercentage(ratingsData[star])}
                    showInfo={false}
                  />
                </Col>
                <Col xs={4} sm={4}>
                  {ratingsData[star]} lượt
                </Col>
              </Row>
            ))}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={6}
          pull={windowWidth < 768 ? 0 : 18}
        >
          <Flex vertical style={{ justifyContent: 'center', alignItems: 'center', gap: windowWidth < 768 ? '8px' : '16px' }}>
            <Typography.Text style={{ fontSize: windowWidth < 768 ? '1.1rem' : '1.3rem', fontWeight: 'bold' }}>
              Trung bình
            </Typography.Text>
            <Typography.Text style={{ fontSize: windowWidth < 768 ? '2rem' : '2.5rem', fontWeight: 'bold', lineHeight: '1' }}>
              {totalRating > 0 && totalVotes > 0 ? (totalRating / totalVotes).toFixed() : 0}{' '}
              <FaStar color="#f7d03f" style={{ marginBottom: '-3px', width: windowWidth < 768 ? '20px' : '25px' }} />
            </Typography.Text>
            <Button
              className="button"
              type="primary"
              style={{
                backgroundColor: '#115363',
                fontSize: windowWidth < 768 ? '0.9rem' : '1rem',
                height: windowWidth < 768 ? '32px' : '40px',
                marginTop: windowWidth < 768 ? '4px' : '8px',
                width: windowWidth < 768 ? '190px' : '200px'
              }}
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              Đánh giá và nhận xét
            </Button>
          </Flex>
        </Col>
        <Divider type="horizontal" style={{ border: '1px solid rgb(200, 200, 200)' }} />
      </Row>
      {isFormVisible && (
        <Row>
          <Card
            style={{
              background: '#f3f3f3',
              padding: '0 0.5rem',
              width: '100%',
              marginBottom: '30px',
            }}
          >
            <Form form={form} onFinish={handleFinish}>
              <Flex vertical>
                <Typography.Text
                  style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}
                >
                  Gửi nhận xét của bạn
                </Typography.Text>
                <Typography.Text style={{ fontSize: '1rem', marginBottom: '10px' }}>
                  Đánh giá của bạn về sân này:
                </Typography.Text>

                <Flex gap="middle" vertical style={{ marginBottom: '10px' }}>
                  <Form.Item name="star" style={{ marginBottom: '0' }}>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                  </Form.Item>
                </Flex>
                <Typography.Text style={{ fontSize: '1rem', marginBottom: '15px' }}>
                  Viết nhận xét của bạn vào bên dưới:
                </Typography.Text>
                <Form.Item name="comment" style={{ marginBottom: '15px' }}>
                  <TextArea
                    value={comment}
                    placeholder="Nhận xét của bạn về sân này"
                    style={{ height: '10rem' }}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Item>
                <Flex justify="end">
                  <Button
                    loading={courtClusterDetailsStore.loadingReview}
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: '9rem',
                      height: '40px',
                      borderRadius: '1rem',
                      backgroundColor: '#115363',
                    }}
                  >
                    Gửi đánh giá
                  </Button>
                </Flex>
              </Flex>
            </Form>
          </Card>
        </Row>
      )}
      <Row gutter={[16, 16]}>
        {currentItems?.map((review) => {
          return (
            <Col xs={24} sm={24} md={12} lg={24} key={review.id}>
              <ReviewCard reviews={review} />
            </Col>
          );
        })}
      </Row>
      <Row justify="center" className="pagination" style={{ marginTop: '20px' }}>
        {
          reviews && reviews.length > 0 && (
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={reviews?.length}
              onChange={onPageChange}
            />
          )
        }
      </Row>
    </Card>
  );
};

export default observer(ReviewCourtClusterComponent);
