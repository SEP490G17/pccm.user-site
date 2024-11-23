import { IReview } from "@/app/models/review.model";
import { useStore } from "@/app/stores/store";
import { Avatar, Card, Modal, Rate, Space, Typography } from "antd";
interface IProps {
    reviews: IReview;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


const ReviewCard = ({ reviews }: IProps) => {
    const { courtClusterDetailsStore, commonStore } = useStore();
    const userLoginPhoneNumber = commonStore.getPhoneNumber()

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa đánh giá này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                await courtClusterDetailsStore.deleteReviews(reviews.id);
            },
        });
    };

    return (
        <Card
            style={{
                width: '100%',
                marginBottom: 16,
                border: 'none',
                padding: 0,
            }}
            bodyStyle={{ padding: '8px 0' }}
        >
            <Card.Meta
                avatar={<Avatar size="small" />}
                title={
                    <Space direction="vertical" size={0}>
                        <Space direction="horizontal">
                            <Typography.Text strong>{reviews.fullName}</Typography.Text>
                            <Rate style={{ fontSize: '13px' }} value={reviews.rating} disabled />
                        </Space>
                    </Space>
                }
            />
            <Space direction="vertical" style={{ marginTop: 8, paddingLeft: 48 }}>
                <Typography.Text>{reviews.comment}</Typography.Text>
                <Space direction="horizontal" size={"middle"}>
                    <Typography.Text type="secondary" style={{ fontSize: '10px' }}> {formatDate(reviews.createdAt)}</Typography.Text>
                    {(userLoginPhoneNumber === reviews.phoneNumber) && (
                        <Typography.Link
                            onClick={showDeleteConfirm}
                            type="danger"
                            style={{ fontSize: '10px' }}
                        >
                            Xóa
                        </Typography.Link>
                    )}
                </Space>
            </Space>
        </Card>
    );
};

export default ReviewCard;
