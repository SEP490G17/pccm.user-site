import { Col, Row, Typography } from "antd";

import "./style.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import ListCourtImage from "./components/ListCourtImage";
import DetailsCourtCard from "./components/DetailsCourtCard";
import BookWithRequirement from "./components/BookWithRequirement";
import { useStore } from "@/app/stores/store";
import ReviewCourtCluster from "./components/ReviewCourtCluster";
import ListCourtCluster from '@/feature/home/components/HomeCourtCluster';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";

const BookingCourtPage = () => {
    const { id } = useParams();
    const { courtClusterStore } = useStore();
    const { selectedCourt } = courtClusterStore

    useEffect(() => {
        if (id) {
            courtClusterStore.getDetailsCourtCluster(id);
        }
    }, [id, courtClusterStore]);

    return (
        <>
            <div style={{ maxWidth: '85%', margin: 'auto', padding: '20px 0px' }}>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={18}>
                        <Typography.Title level={3}>{selectedCourt?.title}</Typography.Title>
                        <Typography.Paragraph
                            className="flex items-center gap-2 text-md h-5"
                            style={{ marginBottom: "4px" }}
                        ></Typography.Paragraph>

                        <FaLocationDot style={{ marginRight: "5px", width: "10px" }} />
                        <Typography.Text className="flex items-center gap-1" style={{ fontSize: '16px' }}>
                            {selectedCourt?.address}
                        </Typography.Text>

                    </Col>
                    <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Typography.Text className="flex items-center gap-1" style={{ fontSize: '16px' }}>
                            Đánh giá: 4.5/5 <FaStar className="text-yellow-500" color="#f7d03f" style={{ marginBottom: '-1px' }} />
                        </Typography.Text>
                    </Col>
                </Row>

                <div className="w-full">
                    <Row gutter={[24, 1]}>
                        <Col span={16}>
                            <ListCourtImage images={selectedCourt?.images} />
                        </Col>
                        <Col span={8}>
                            <DetailsCourtCard court={selectedCourt} />
                        </Col>
                    </Row>
                </div>
                <div className="w-full mt-2 mb-6">
                    <Row gutter={[24, 1]}>
                        <Col span={6}>
                            <BookWithRequirement />
                        </Col>
                        <Col span={18}>
                            {/* <ScheduleModel /> */}
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: '30px', marginTop: '20px' }}>
                    <ListCourtCluster title="Sân pickleball khác" itemsPerPage={3} />
                </div>

                <ReviewCourtCluster />
            </div>
        </>
    );
}

export default observer(BookingCourtPage)