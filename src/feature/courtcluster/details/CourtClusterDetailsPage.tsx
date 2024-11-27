import { Card, Col, Row, Spin, Typography, Tabs } from 'antd';

import { useStore } from '@/app/stores/store';
import ListCourtCluster from '@/feature/home/components/HomeCourtCluster';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import PageHeadingAtoms from '../../atoms/PageHeadingAtoms';
import DetailsCourtCard from '../../booking/history/components/DetailsCourtCard';
import ListCourtImage from '../../booking/history/components/ListCourtImage';
import ReviewCourtClusterComponent from './components/review/ReviewCourtClusterComponent';
import BookingScheduleComponent from './components/schedule/BookingScheduleComponent';
import './CourtClusterDetailsStyle.scss';
import BookingFormComponent from './components/bookingForm/BookingFormComponent';
import CourtClusterServicesTab from './components/ServiceTab/CourtClusterServicesTab';
import CourtClusterProductsTab from './components/ProductTab/CourtClusterProductsTab'

const CourtClusterDetailsPage = observer(() => {
  const { id } = useParams();
  const { courtClusterDetailsStore } = useStore();
  const {
    selectedCourt,
    reviewArray,
    getDetailsCourtCluster,
    getListReviewByCourtClusterId,
    setLoadingInitialDetailsPage,
    loadingInitialDetailsPage,
  } = courtClusterDetailsStore;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      setLoadingInitialDetailsPage(true);
      Promise.all([
        (courtClusterDetailsStore.loadScheduleBookingList(),
        courtClusterDetailsStore.loadCourtPrice(),
        getDetailsCourtCluster(id),
        getListReviewByCourtClusterId(id)),
      ]).finally(() => setLoadingInitialDetailsPage(false));
    }
  }, [
    id,
    setLoadingInitialDetailsPage,
    getDetailsCourtCluster,
    getListReviewByCourtClusterId,
    courtClusterDetailsStore.loadScheduleBookingList,
    courtClusterDetailsStore,
  ]);
  if (!selectedCourt || loadingInitialDetailsPage) {
    return (
      <div className=" flex min-h-[100vh] justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }
  const ratingsData: { [key: string]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let totalRating = 0;
  reviewArray?.forEach((review) => {
    const rating = review.rating;
    totalRating += rating;
    if (ratingsData[rating]) {
      ratingsData[rating]++;
    } else {
      ratingsData[rating] = 1;
    }
  });
  return (
    <>
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/home' },
          { title: 'Chi tiết sân', to: `/dat-san/${id}` },
        ]}
      />
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={18}>
          <Typography.Title level={3}>{selectedCourt.title}</Typography.Title>
          <Typography.Paragraph
            className="flex gap-2 items-center h-5 text-md"
            style={{ marginBottom: '4px' }}
          ></Typography.Paragraph>

          <Typography.Text
            className="flex gap-1 items-center cursor-pointer"
            style={{ fontSize: '16px' }}
          >
            <FaLocationDot style={{ marginRight: '5px', width: '10px' }} />
            <Link
              style={{ color: 'black' }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?q=${selectedCourt.address}, ${selectedCourt.wardName}, ${selectedCourt.districtName}, ${selectedCourt.provinceName}`,
                  '_blank',
                )
              }
            >
              {`${selectedCourt.address}, ${selectedCourt.wardName}, ${selectedCourt.districtName}, ${selectedCourt.provinceName}`}
            </Link>
          </Typography.Text>
        </Col>
        <Col
          span={6}
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Typography.Text className="flex gap-1 items-center" style={{ fontSize: '16px' }}>
            Đánh giá:{' '}
            {totalRating > 0 && reviewArray.length > 0
              ? (totalRating / reviewArray.length).toFixed()
              : 0}
            /5{' '}
            <FaStar className="text-yellow-500" color="#f7d03f" style={{ marginBottom: '-1px' }} />
          </Typography.Text>
        </Col>
      </Row>

      <div className="w-full">
        <Row gutter={[24, 1]}>
          <Col xs={24} xl={16}>
            <ListCourtImage images={selectedCourt.images} />
          </Col>
          <Col xs={24} xl={8}>
            <DetailsCourtCard court={selectedCourt} />
          </Col>
        </Row>
      </div>
      <Title level={3} className="mt-10">
        Thông lịch sân
      </Title>
      <Row className="mt-4" gutter={[16,16]}>
        <Col xs={24} xl={16}>
          <BookingScheduleComponent selectedCourtCluster={selectedCourt} />
        </Col>
        <Col xs={24} xl={8}>
          <BookingFormComponent selectedCourt={selectedCourt} />
        </Col>
      </Row>
      <Card className="py-6 mt-5">
        <Title className="mb-14 text-center" level={2}>
          Thông tin chi tiết cụm sân {selectedCourt.title}
        </Title>
        <Tabs defaultActiveKey="1" centered>
          {/* Tab List */}
          <Tabs.TabPane tab="Thông tin" key="1">
            <div className="flex justify-center mt-20">
              <div
                className="w-[50rem]"
                dangerouslySetInnerHTML={{ __html: selectedCourt.description }}
              />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Sản phẩm" key="2">
            <div className="mt-6">
              {id && <CourtClusterProductsTab courtClusterId={Number(id)} />}
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Dịch vụ" key="3">
            <div className="mt-6">
              {id && <CourtClusterServicesTab courtClusterId={Number(id)} />}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <div className="mt-2 mb-6 w-full" style={{ marginTop: '30px' }}></div>
      <div style={{ marginBottom: '30px', marginTop: '20px' }}>
        <ListCourtCluster title="Sân pickleball khác" itemsPerPage={3} />
      </div>

      <ReviewCourtClusterComponent reviews={reviewArray} courtClusterId={selectedCourt.id} />
    </>
  );
});

export default CourtClusterDetailsPage;
