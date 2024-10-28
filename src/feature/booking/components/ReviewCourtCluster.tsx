import { Button, Card, Col, Divider, Flex, Form, Progress, Rate, Row, Typography } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { FaStar } from "react-icons/fa"

const ReviewCourtCluster = () => {
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const ratingsData: { [key: string]: number } = {
        1: 51,
        2: 30,
        3: 15,
        4: 5,
        5: 10,
    };
    const desc = ['1', '2', '3', '4', '5'];
    const totalVotes = Object.values(ratingsData).reduce((acc, votes) => acc + votes, 0);

    const handleFinish = (values: { comment: string; rating: number }) => {
        console.log('Submitted:', values);
        // Gửi dữ liệu đến server hoặc thực hiện các hành động khác
    };

    const getPercentage = (votes: number) => (votes / totalVotes) * 100;
    return (
        <Card>
            <Flex vertical>
                <Typography.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Đánh giá sân thể thao<Typography.Text style={{ fontWeight: 'normal' }}> (1 đánh giá)</Typography.Text></Typography.Text>
                <Divider type="horizontal" style={{ border: '1px solid rgb(200, 200, 200)' }} />
            </Flex>
            <Row>
                <Col span={18} push={6}>
                    {Object.keys(ratingsData).sort((a, b) => parseInt(b) - parseInt(a)).map((star) => (
                        <Row key={star} align="middle" style={{ marginBottom: '10px' }}>
                            <Col span={4}>
                                <Rate disabled defaultValue={parseInt(star)} />
                            </Col>
                            <Col span={15}>
                                <Progress percent={getPercentage(ratingsData[star])} showInfo={false} />
                            </Col>
                            <Col span={4} offset={1}>
                                {ratingsData[star]} lượt
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col span={6} pull={18}>
                    <Flex vertical style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Trung bình</Typography.Text>
                        <Typography.Text style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>5 <FaStar color="#f7d03f" style={{ marginBottom: '-3px', width: '25px' }} /></Typography.Text>
                        <Button className="button" type="primary" onClick={() => setIsFormVisible(!isFormVisible)}>Đánh giá và nhận xét</Button>
                    </Flex>
                </Col>
                <Divider type="horizontal" style={{ border: '1px solid rgb(200, 200, 200)' }} />
            </Row>
            {isFormVisible && (
                <Row>
                    <Card style={{ background: "#f3f3f3", padding: '0 0.5rem', width: '100%' }}>
                        <Form onFinish={handleFinish}>
                            <Flex vertical>
                                <Typography.Text style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
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
                                    <Button type="primary" htmlType="submit" style={{ width: '9rem', height: '40px', borderRadius: '1rem' }}>
                                        Gửi đánh giá
                                    </Button>
                                </Flex>
                            </Flex>
                        </Form>
                    </Card>
                </Row>
            )}
        </Card>
    )
}

export default ReviewCourtCluster