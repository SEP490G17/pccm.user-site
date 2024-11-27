import './CourtClusterList.scss';
import { Button, Card, Col, Image, Input, Row, Select, Slider, Typography } from 'antd';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import ListBanner from '@/feature/home/components/HomeBanner';
import ListCourtCluster from '@/feature/home/components/HomeCourtCluster';
import PageHeadingAtoms from '@/feature/atoms/PageHeadingAtoms';
import Pagination from '@/feature/atoms/Pagination';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import AddressSelectAtom from '@/app/common/form/AddressSelectAtom';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

interface IProps {
  itemsPerPage: number;
}

function ListCourtClusterPage({ itemsPerPage }: IProps) {
  const { courtClusterStore } = useStore();
  const { listCourt, loadListCourt, loadingInitial } = courtClusterStore;

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 1500000]);

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
    setTouched((prevState) => ({
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
  }, [loadListCourt]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = listCourt.slice(startIndex, startIndex + itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="list-court-cluster">
      <PageHeadingAtoms
        breadCrumb={[{ title: 'Trang chủ', to: '/home' }, { title: 'Sân thể thao', to: '/list-courtcluster' }]}
      />

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Row gutter={[16, 16]} justify="space-between" align="middle" className="filter-row">
          <Col xs={24} sm={24} md={8} lg={5}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tìm sân</label>
            <Input placeholder="Tìm sân" style={{ width: '100%', marginBottom: '40px' }} suffix={<SearchOutlined />} />
          </Col>

          <Col xs={24} sm={24} md={10} lg={9}>
            <AddressSelectAtom
              onChange={handleFieldChange}
              values={formValues}
              errors={formErrors}
              touched={touched}
            />
          </Col>

          <Col xs={24} sm={12} md={3} lg={3}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Đánh giá</label>
            <Select defaultValue="Tất cả" style={{ width: '100%', marginBottom: '40px' }}>
              <Option value="all">Tất cả</Option>
              <Option value="5">5 sao</Option>
              <Option value="4">4 sao</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={3} lg={5}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Mức giá</label>
            <Slider
              range
              min={100}
              max={1500000}
              step={100}
              value={priceRange}
              onChange={(value: [number, number]) => setPriceRange(value)}
              style={{ marginBottom: '25px' , marginTop: '15px' }}
            />
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              {`${priceRange[0]?.toLocaleString()} VND - ${priceRange[1]?.toLocaleString()} VND`}
            </div>
          </Col>

          <Col xs={24} sm={12} md={1} lg={2}>
            <Button
              type="primary"
              style={{
                width: '100%',
                backgroundColor: 'green',
                color: 'white',
                marginBottom: '15px',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </div>

      <div className="featured-courts">
        <ListCourtCluster itemsPerPage={4} />
      </div>

      <Title level={2} style={{ marginBottom: '24px' }}>
        Danh sách sân
      </Title>
      <Row gutter={[16, 16]} className="court-list">
        {loadingInitial
          ? Array.from({ length: 4 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6}>
              <Card loading={true} />
            </Col>
          ))
          : currentItems.map((c) => (
            <Col key={c.id} xs={24} sm={12} md={8} lg={6} className="court-col">
              <Card hoverable className="court-card">
                <Image src={c.images[0]} width={'100%'} height={'200px'} />
                <div className="court-details">
                  <div className="court-info">
                    <Title level={5} className="court-title">
                      {c.title}
                    </Title>
                    <Paragraph>Khu vực: {c.address}</Paragraph>
                    <Row justify="space-between" align="middle" className="rating-row">
                      <Paragraph>Số sân: {c.numbOfCourts}</Paragraph>
                      <Row>
                        <FaStar className="text-yellow-500" color="#f7d03f" />
                        <FaStar className="text-yellow-500" color="#f7d03f" />
                        <FaStar className="text-yellow-500" color="#f7d03f" />
                        <FaStar className="text-yellow-500" color="#f7d03f" />
                        <FaStarHalfAlt className="text-yellow-500" color="#f7d03f" />
                        <Typography.Paragraph className="rating-value">(4.5)</Typography.Paragraph>
                      </Row>
                    </Row>
                  </div>
                  <Button className="book-button">Chi tiết sân</Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>

      <Row justify="center" className="pagination">
        <Pagination
          currentPage={currentPage}
          pageSize={itemsPerPage}
          total={listCourt.length}
          onPageChange={onPageChange}
        />
      </Row>
    </div>
  );
}

export default ListCourtClusterPage;
