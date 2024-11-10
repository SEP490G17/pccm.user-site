import { Button, Card, Col, Divider, Flex, Form, Pagination, Progress, Rate, Row, Typography } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { FaStar } from "react-icons/fa"
import ReviewCard from "./ReviewCard";
import { IReview, ReviewsDto } from "@/app/models/review.model";
import { useStore } from "@/app/stores/store";
import { toast } from "react-toastify";

interface IProps {
    reviews?: IReview[] | undefined;
    courtClusterId: number | undefined;
}

const ReviewCourtCluster = ({ reviews, courtClusterId }: IProps) => {
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { courtClusterStore } = useStore();
    const [form] = Form.useForm();
    const ratingsData: { [key: string]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    let totalRating = 0;
    reviews?.forEach(review => {
        const rating = review.rating
        totalRating += rating
        if (ratingsData[rating]) {
            ratingsData[rating]++;
        } else {
            ratingsData[rating] = 1;
        }
    })

    const desc = ['1', '2', '3', '4', '5'];
    const totalVotes = Object.values(ratingsData).reduce((acc, votes) => acc + votes, 0);

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * 4;
    const currentItems = reviews?.slice(startIndex, startIndex + 4);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFinish = async (values: any) => {
        if (values.star == null) {
            toast.error("Vui lòng đánh giá sao")
        }
        else {
            const data = new ReviewsDto({
                userId: "557ef055-e2c3-4bca-b904-315a088f9b7a",
                comment: values.comment,
                courtclusterId: courtClusterId,
                createAt: "",
                rating: values.star
            })
            await courtClusterStore.createReviews(data)
                .then(() => {
                    setIsFormVisible(false);
                    form.resetFields();
                })
        }
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
                                <Progress strokeColor="#108554" percent={getPercentage(ratingsData[star])} showInfo={false} />
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
                        <Typography.Text style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalRating > 0 && totalVotes > 0 ? (totalRating / totalVotes).toFixed() : 0} <FaStar color="#f7d03f" style={{ marginBottom: '-3px', width: '25px' }} /></Typography.Text>
                        <Button className="button" type="primary" style={{ backgroundColor: '#115363' }} onClick={() => setIsFormVisible(!isFormVisible)}>Đánh giá và nhận xét</Button>
                    </Flex>
                </Col>
                <Divider type="horizontal" style={{ border: '1px solid rgb(200, 200, 200)' }} />
            </Row>
            {isFormVisible && (
                <Row>
                    <Card style={{ background: "#f3f3f3", padding: '0 0.5rem', width: '100%', marginBottom: '30px' }}>
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
                                    <Button loading={courtClusterStore.loadingReview}
                                        type="primary" htmlType="submit"
                                        style={{ width: '9rem', height: '40px', borderRadius: '1rem', backgroundColor: "#115363" }}>
                                        Gửi đánh giá
                                    </Button>
                                </Flex>
                            </Flex>
                        </Form>
                    </Card>
                </Row>
            )}
            <Row>
                {currentItems?.map((review) => {
                    return (
                        <Col span={24} key={review.id}>
                            <ReviewCard
                                reviews={review}
                            />
                        </Col>
                    );
                })}

            </Row>
            <Row justify="center" className="pagination">
                <Pagination
                    current={currentPage}
                    pageSize={4}
                    total={reviews?.length}
                    onChange={onPageChange}
                />
            </Row>
        </Card>
    )
}

export default ReviewCourtCluster