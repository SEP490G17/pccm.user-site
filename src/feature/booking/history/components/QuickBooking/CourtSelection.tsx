import { Col, Typography } from "antd";

import CourtIcon from "./CourtIcon";
import { IAvailableSlotModel } from "@/app/models/booking.model";
const { Title } = Typography;

interface IProps {
    availableSlot : IAvailableSlotModel[] | null;
    selectedCourt : number | null;
    handleCourtSelect : (courtId: number) => void;
}

const CourtSelection = ({ availableSlot, selectedCourt, handleCourtSelect }: IProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Title level={5} style={{ textAlign: 'left' }}>Chọn sân:</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {availableSlot?.map((court: any) => (
                    <Col key={court.id}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCourtSelect(court.id)}
                        >
                            <CourtIcon name={court.name} isSelected={selectedCourt === court.id} />
                        </div>
                    </Col>
                ))}
            </div>
        </div>
    )
}

export default CourtSelection