import './style/CourtClusterList.scss';
import { Button, Card, Col, Flex, Image, Input, Row, Select, Slider, Typography } from 'antd';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import ListBanner from '@/feature/home/components/HomeBanner';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import { useStore } from '@/app/stores/store';
import AddressSelectAtom from '@/app/common/form/AddressSelectAtom';
import { SearchOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import CourtBookingForm from '@/feature/booking/history/components/QuickBooking/BookingForm';
import TopCourtCluster from './TopCourtCluster';
import { TiArrowSync } from "react-icons/ti";
import LoadMoreButtonAtoms from '@/feature/atoms/LoadMoreButtonAtoms';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const ListCourtClusterPage = observer(() => {
  const { courtClusterStore, courtClusterDetailsStore } = useStore();
  const {
    courtClusterArray,
    courtClusterRegistry,
    loadListCourt,
    courtPageParams,
    loadListTopCourt,
    loadingInitial,
    loadingMore
  } = courtClusterStore;
  const navigate = useNavigate();
  const phrases = ['Tìm sân thể thao'];
  const [placeholder, setPlaceholder] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loadingCourtId, setLoadingCourtId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([10000, 1500000]);
  const [searchText, setSearchText] = useState('');
  const [rating, setRating] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < phrases[phraseIndex].length) {
        setPlaceholder((prev) => prev + phrases[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setPlaceholder('');
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 100);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [charIndex, phraseIndex, phrases]);

  // State for form fields
  const [formValues, setFormValues] = useState({
    province: '',
    district: '',
    ward: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  // Handle field changes
  const handleFieldChange = (field: string, value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    // Mark field as touched
    setTouched((prevState: any) => ({
      ...prevState,
      [field]: true,
    }));

    // Validate the field
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    const errors: any = {};
    if (value === '') {
      errors[field] = `${field} is required`;
    }
    setFormErrors(errors);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadListCourt();
    loadListTopCourt();
  }, [loadListCourt, loadListTopCourt]);

  // Hàm xử lý khi nhấn "Tìm kiếm"
  const handleSearch = () => {
    const searchParams = {
      searchText,
      ...formValues, // Bao gồm province, district, ward, address
      rating,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };
    // Gọi API
    loadListCourt(searchParams);
  };

  const handleReset = () => {
    setSearchText('');
    setFormValues({
      province: '',
      district: '',
      ward: '',
      address: '',
    });
    setRating('');
    setPriceRange([10000, 1500000]);

    loadListCourt();
  }

  return (
    <div className="list-court-cluster">
      <PageHeadingAtoms
        breadCrumb={[
          { title: 'Trang chủ', to: '/trang-chu' },
          { title: 'Sân thể thao', to: '/cum-san' },
        ]}
      />
      <div className="banner-container">
        <ListBanner title="" />
      </div>


      <div className="featured-courts-wrapper">
        <div className="featured-courts">
          <TopCourtCluster itemsPerPage={3} />
        </div>
      </div>

      <Title level={1} style={{ margin: '24px 0' }}>
        Danh sách sân
      </Title>

      <Flex
        style={{
          backgroundColor: '#fff',
          marginBottom: '20px',
          padding: '20px 3px 20px 20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row gutter={[16, 16]} justify="space-between" align="middle" className="filter-row">
          <Col xs={24} sm={24} md={24} lg={6}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Tên sân
            </label>
            <Input
              placeholder={placeholder}
              style={{ width: '100%' }}
              suffix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>

          <Col xs={24} sm={24} md={24} lg={6}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Khu vực
            </label>
            <AddressSelectAtom
              onChange={handleFieldChange}
              values={formValues}
              errors={formErrors}
              touched={touched}
            />
          </Col>

          <Col xs={24} sm={12} md={24} lg={4}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Đánh giá
            </label>
            <Select
              defaultValue="Tất cả"
              style={{ width: '100%' }}
              value={rating}
              onChange={(value) => setRating(value)}
            >
              <Option value="">Tất cả</Option>
              <Option value="5">Đánh giá 4 đến 5 sao</Option>
              <Option value="3">Đánh giá 2 đến 3 sao</Option>
              <Option value="1">Đánh giá 1 sao</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={24} lg={5}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Mức giá
            </label>
            <Slider
              range
              min={10000}
              max={1500000}
              step={10000}
              value={priceRange}
              onChange={(value: number[]) => setPriceRange(value)}
              styles={{
                track: {
                  backgroundColor: '#115363',
                },
              }}
            />
            {`${priceRange[0]?.toLocaleString()} VND - ${priceRange[1]?.toLocaleString()} VND`}
          </Col>

          <Col xs={21} sm={21} md={21} lg={2}>
            <Button
              style={{ marginTop: '5px', height: '50px', borderRadius: '10px' }}
              className="book-button"
              onClick={() => handleSearch()}
            >
              Tìm sân
            </Button>
          </Col>
          <Col xs={3} sm={3} md={3} lg={1} className="icon-wrapper">
            <TiArrowSync onClick={() => handleReset()} />
          </Col>
        </Row>
      </Flex>

      <Row gutter={[3, 3]} className="court-list">
        {loadingInitial
          ? Array.from({ length: 4 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6}>
              <Card loading={true} />
            </Col>
          ))
          : courtClusterArray.map((c) => (
            <Col key={c.id} xs={24} sm={12} md={8} lg={6} className="court-col">
              <Card hoverable className="court-card" style={{ height: '95%' }}>
                <Image src={c.images[0]} width={'100%'} height={'200px'} />
                <div className="court-details">
                  <div className="court-info">
                    <Title level={5} className="court-title">
                      {c.title}
                    </Title>
                    <Paragraph>Khu vực: {c.provinceName} - {c.districtName}</Paragraph>
                    <Row justify="space-between" align="middle" className="rating-row">
                      <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                      <Row>
                        {Array.from({ length: 5 }, (_, i) => {
                          if (i < Math.floor(Number(c.rate ? c.rate.toFixed() : 0))) {
                            return <FaStar key={i} className="text-yellow-500" color="#f7d03f" style={{ marginTop: '3px' }} />;
                          }
                          else {
                            return <FaRegStar key={i} className="text-yellow-500" style={{ marginTop: '3px' }} />;
                          }
                        })}
                        <Typography.Paragraph style={{ marginLeft: '5px' }}>({c.rate ? c.rate.toFixed() : 0})</Typography.Paragraph>
                      </Row>
                    </Row>
                  </div>
                  <Flex vertical gap={8}>
                    <CourtBookingForm
                      courtClusterId={c.id}
                      loadingCourtId={loadingCourtId}
                      setLoadingCourtId={setLoadingCourtId}
                    />
                    <Button
                      className="book-button"
                      onClick={() => {
                        courtClusterDetailsStore.clearSelectedCourt();
                        navigate(`/chi-tiet/${c.id}`);
                      }}
                    >
                      Chi tiết sân
                    </Button>
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
      </Row>

      <Row justify="center">
        <LoadMoreButtonAtoms
          handleOnClick={() => {
            const searchParams = {
              searchText,
              ...formValues,
              rating,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
            };
            courtClusterStore.loadingMore = true
            courtPageParams.skip = courtClusterRegistry.size;
            loadListCourt(searchParams);
          }}
          hidden={courtClusterRegistry.size == courtPageParams.totalElement}
          loading={loadingMore}
        >
        </LoadMoreButtonAtoms>
      </Row>
    </div>
  );
})

export default ListCourtClusterPage;
