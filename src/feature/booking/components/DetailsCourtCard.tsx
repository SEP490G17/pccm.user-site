import { ICourtCluster } from "@/app/models/courtcluster.model";
import { Card, Col, Divider, Row, Typography, Tag, Flex } from "antd";

interface IProps {
  court?: ICourtCluster;
}

const formatTime = (timeString: string) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

const DetailsCourtCard = ({ court }: IProps) => {
  return (
    <Card className="details-card" style={{ minHeight: "100%" }}>
      <Flex style={{ margin: '0.5rem 0' }}>
        <Typography.Text style={{ fontSize: '1.3rem' }}>
          <Divider type="vertical" className="divider" />
          Thông tin sân
        </Typography.Text>
      </Flex>
      <table className="w-full details-table">
        <tbody>
          <tr>
            <td>Giờ mở cửa:</td>
            <td style={{ textAlign: 'right' }}>
              {formatTime(court ? court.openTime : "")} - {formatTime(court ? court.closeTime : "")}
            </td>
          </tr>
          <tr>
            <td>Số sân thi đấu:</td>
            <td>{court?.numbOfCourts} Sân</td>
          </tr>
          <tr>
            <td>Giá sân:</td>
            <td>120.000 đ</td>
          </tr>
        </tbody>
      </table>
      <Card style={{ background: "#f3f3f3", padding: '0 0.5rem', height: '210px' }} className="details-service">
        <Row>
          <Typography.Text style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Dịch vụ tiện ích
          </Typography.Text>
        </Row>
        {court && (
          <Row gutter={[16, 32]}>
            <Col span={12} className="details-service-body">
              {court.services.slice(0, 10).slice(0, Math.ceil(Math.min(court.services.length, 10) / 2)).map((service, index) => (
                <Tag key={index} style={{ marginBottom: '8px', backgroundColor: '#108554', color: '#fff' }}>
                  {service.serviceName}
                </Tag>
              ))}
            </Col>
            <Col span={12} className="details-service-body">
              {court.services.slice(0, 10).slice(Math.ceil(Math.min(court.services.length, 10) / 2)).map((service, index) => (
                <Tag key={index} style={{ marginBottom: '8px', backgroundColor: '#108554', color: '#fff' }}>
                  {service.serviceName}
                </Tag>
              ))}
            </Col>
          </Row>
        )}
      </Card>
    </Card>
  );
};

export default DetailsCourtCard;
