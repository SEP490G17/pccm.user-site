
import { ICourtCluster } from "@/app/models/courtcluster.model";
import { Card, Col, Divider, Flex, Row, Typography } from "antd";
import { FaCar, FaMotorcycle } from "react-icons/fa6";
import { IoFastFoodSharp, IoRestaurant } from "react-icons/io5";
import { MdLocalDrink } from "react-icons/md";
import { RiDrinks2Fill } from "react-icons/ri";
import { TiWiFi } from "react-icons/ti";

interface IProps {
  court?: ICourtCluster;
}

export default function DetailsCourtCard({ court }: IProps) {
  return (
    <Card className="details-card" style={{ minHeight: "94%" }}>
      <Flex style={{ margin: '0.5rem 0' }}>
        <Typography.Text style={{ fontSize: '1.3rem' }}><Divider type="vertical" className="divider" />Thông tin sân</Typography.Text>
      </Flex>
      <table className="w-full details-table">
        <tbody>
          <tr>
            <td>Giờ mở cửa:</td>
            <td style={{textAlign: 'right'}}>{court?.openHours[0]} - {court?.openHours[1]}</td>
          </tr>
          <tr>
            <td>Số sân thi đấu:</td>
            <td>{court?.quantity} Sân</td>
          </tr>
          <tr>
            <td>Giá sân:</td>
            <td>120.000 đ</td>
          </tr>
          <tr>
            <td>Giá sân giờ vàng:</td>
            <td>120.000 đ</td>
          </tr>
        </tbody>
      </table>
      <Card style={{ background: "#f3f3f3", padding:'0 0.5rem' }} className="details-service">
        <Row>
          <Typography.Text style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>Dịch vụ tiện ích</Typography.Text>
        </Row>
        <Row gutter={[16, 32]}>
          <Col span={12} className="details-service-body">
            <Flex align="center" gap={6}>
              <TiWiFi /> Wifi
            </Flex>
            <Flex align="center" gap={6}>
              <TiWiFi /> Wifi
            </Flex>
            <Flex align="center" gap={6}>
              <FaMotorcycle /> Bãi đỗ xe máy
            </Flex>
            <Flex align="center" gap={6}>
              <MdLocalDrink /> Trà đá
            </Flex>
            <Flex align="center" gap={6}>
              <RiDrinks2Fill /> Nước uống
            </Flex>
          </Col>
          <Col span={12} className="details-service-body">
            <Flex align="center" gap={6}>
              <FaCar /> Bãi đỗ xe ô tô
            </Flex>
            <Flex align="center" gap={6}>
              <IoRestaurant /> Căng tin
            </Flex>
            <Flex align="center" gap={6}>
              <IoFastFoodSharp /> Đồ ăn
            </Flex>
          </Col>
        </Row>
      </Card>
    </Card>
  );
}
