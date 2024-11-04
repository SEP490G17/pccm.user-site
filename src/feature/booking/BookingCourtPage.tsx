import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import san1 from "@/assets/images/san1.png";
import san2 from "@/assets/images/san2.png";
import san3 from "@/assets/images/san3.png";
import san4 from "@/assets/images/san4.png";

import "./style.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import ListCourtImage from "./components/ListCourtImage";
import DetailsCourtCard from "./components/DetailsCourtCard";
// import ProductList from "./components/ListCourtCluster";
import BookWithRequirement from "./components/BookWithRequirement";
import { useStore } from "@/app/stores/store";
import { ICourtCluster } from "@/app/models/courtcluster.model";
import ReviewCourtCluster from "./components/ReviewCourtCluster";
import ListCourtCluster from '@/feature/home/components/HomeCourtCluster';
const BookingCourtPage = () => {
    const images = [
        { src: san1 },
        { src: san2 },
        { src: san3 },
        { src: san4 },
    ];
    const { courtStore } = useStore();
    const [court, setCourt] = useState<ICourtCluster>();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (courtStore.listCourt.length === 0) {
            courtStore.loadListCourt();
        }
        setCourt(() => courtStore.listCourt[0]);
    }, []);

    return (
        <>
            <div style={{ maxWidth: '85%', margin: 'auto', padding: '20px 0px' }}>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={18}>
                        <Typography.Title level={3}>{court?.title}</Typography.Title>
                        <Typography.Paragraph
                            className="flex items-center gap-2 text-md h-5"
                            style={{ marginBottom: "4px" }}
                        ></Typography.Paragraph>

                        <FaLocationDot style={{ marginRight: "5px", width: "10px" }} />
                        <Typography.Text className="flex items-center gap-1" style={{ fontSize: '16px' }}>
                            {court?.location.thanhpho}
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
                            <ListCourtImage images={images} />
                        </Col>
                        <Col span={8}>
                            <DetailsCourtCard court={court} />
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
                    <ListCourtCluster title="Sân pickleball khác" />
                </div>

                <ReviewCourtCluster />
            </div>
        </>
    );
}

export default BookingCourtPage