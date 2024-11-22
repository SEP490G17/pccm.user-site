import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
    SkypeFilled,
    TwitterCircleFilled,
    YoutubeFilled,
} from '@ant-design/icons';
import { Card, Col, Divider, Flex, Layout, Row, Tabs, Typography } from 'antd';
import { SiZalo } from 'react-icons/si';
import './style/Footer.scss';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;

const AppFooter = () => {
    return (
        <>
            <div className="section">
                <Title style={{ fontSize: '24px' }}>Kết nối với Thế Giới PickleBall</Title>
                <Card>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Hà Nội" key="1">
                                    <Text strong>Hà Nội</Text>
                                    <p>Điện thoại: <Text type="danger">0111.111.111</Text></p>
                                    <p>Mail: <Text type="danger">email@example.com</Text></p>
                                    <p>Hotline (Zalo): <Text type="danger">0904.795.885</Text></p>
                                </TabPane>
                                <TabPane tab="Hồ Chí Minh" key="2">
                                    <Text strong>Hồ Chí Minh</Text>
                                    <p>Điện thoại: <Text type="danger">0111.111.111</Text></p>
                                    <p>Mail: <Text type="danger">email@example.com</Text></p>
                                    <p>Hotline (Zalo): <Text type="danger">0111.111.111</Text></p>
                                </TabPane>
                                <TabPane tab="Đà Nẵng" key="3">
                                    <Text strong>Đà Nẵng</Text>
                                    <p>Điện thoại: <Text type="danger">0111.111.111</Text></p>
                                    <p>Mail: <Text type="danger">email@example.com</Text></p>
                                    <p>Hotline (Zalo): <Text type="danger">0111.111.111</Text></p>
                                </TabPane>
                                <TabPane tab="Hải Dương" key="4">
                                    <Text strong>Hải Dương</Text>
                                    <p>Điện thoại: <Text type="danger">0111.111.111</Text></p>
                                    <p>Mail: <Text type="danger">email@example.com</Text></p>
                                    <p>Hotline (Zalo): <Text type="danger">0111.111.111</Text></p>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col xs={24} md={12}>
                            <iframe
                                className="iframe-rounded"  // Thêm class cho iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7446071964646!2d105.78066861532864!3d21.043081792652826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab67f1422db7%3A0xb7f769bdaec1fae0!2zNTYgxJDGsOG7nW5nIFRo4bqldSBUcsawbSwgQ2F1IMSRaeG7h3UsIEjDoCBO4buZaQ!5e0!3m2!1sen!2s!4v1699899202517!5m2!1sen!2s"
                                width="100%"
                                height="240"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Col>
                    </Row>
                </Card>
            </div>
            <Layout>
                <Footer className="footer-layout">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Text className="footer-col">Kết nối với Thế Giới Thể Thao</Text>
                            <div className="footer-col-item">
                                <Text>Hà Nội</Text>
                            </div>
                            <div className="footer-col-item">
                                <Text>26A - Thạch Hòa - Thạch Thất - Hà Nội</Text>
                            </div>
                            <div className="footer-col-item">
                                <Text>Điện thoại: <Link href="tel:0904795885" style={{ color: 'red' }}>0111.111.111</Link></Text>
                            </div>
                            <div className="footer-col-item">
                                <Text>Mail: <Link href="mailto:phamtan@thegioithethao.vn">email@example.com</Link></Text>
                            </div>
                            <div className="footer-col-item">
                                <Text>Hotline (Zalo): <Link href="tel:0904795885" style={{ color: 'red' }}>0111.111.111</Link></Text>
                            </div>
                        </Col>
                        <Col span={6}>
                            <Text className="footer-col">Chính sách</Text>
                            <Link className="footer-link">Chính sách bảo mật</Link>
                            <Link className="footer-link">Điều khoản sử dụng</Link>
                            <Link className="footer-link">Hướng dẫn đổi trả</Link>
                            <Link className="footer-link">Cam kết chất lượng</Link>
                            <Link className="footer-link">Giao hàng & Nhận hàng</Link>
                            <Link className="footer-link">Đặt hàng & Thanh toán</Link>
                            <Link className="footer-link">Tuyển dụng</Link>
                        </Col>
                        <Col span={6}>
                            <Text className="footer-col">Hỗ trợ</Text>
                            <Link className="footer-link">Giới thiệu</Link>
                            <Link className="footer-link">Liên hệ</Link>
                        </Col>
                        <Col span={6}>
                            <div className="footer-c">
                                <Text className="footer-col">Cộng đồng</Text>
                                <Flex>
                                    <Link href="#"><FacebookFilled className="icon" /></Link>
                                    <Link href="#"><TwitterCircleFilled className="icon" /></Link>
                                    <Link href="#"><YoutubeFilled className="icon" /></Link>
                                    <Link href="#"><LinkedinFilled className="icon" /></Link>
                                    <Link href="#"><SiZalo className="icon" /></Link>
                                    <Link href="#"><SkypeFilled className="icon" /></Link>
                                    <Link href="#"><InstagramFilled className="icon" /></Link>
                                </Flex>
                            </div>
                        </Col>
                    </Row>
                    <Divider className="footer-divider" />
                    <Text className="footer-copyright">
                        © 2024 Thế Giới Thể Thao. All Rights Reserved.
                    </Text>
                </Footer>
                {/* <div className="footer-red">
                    <Text>SEP490 - TruongBQ,VuNBL,TrongNP,HUNGNT,HieuPM</Text>
                </div> */}
            </Layout>
        </>
    );
};

export default AppFooter;
