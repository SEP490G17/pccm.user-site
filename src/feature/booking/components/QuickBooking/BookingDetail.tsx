import { Flex, Tag, TimePicker, Typography } from 'antd';
const { Title } = Typography;
import { Dayjs } from 'dayjs';

interface IProps {
    availableSlots: string[];
    setSelectedTimeRange: (value: [Dayjs | null, Dayjs | null]) => void;
    disabledTime: () => any;
}

const BookingDetail = ({
    availableSlots,
    setSelectedTimeRange,
    disabledTime,
}: IProps) => {
    return (
        <>
            <Title level={5} style={{ textAlign: 'left' }}>Các giờ còn trống:</Title>
            <Flex wrap='wrap'>
                {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                        <Tag key={index} color="green" style={{ cursor: 'pointer', margin: '1px' }}>
                            {slot}
                        </Tag>
                    ))
                ) : (
                    <span>Không có giờ trống!</span>
                )}
            </Flex>

            <Title level={5} style={{ textAlign: 'left', marginTop: '20px' }}>Chọn giờ thuê:</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <TimePicker.RangePicker
                    allowClear
                    format="HH:00"
                    inputReadOnly
                    style={{ width: '70%' }}
                    needConfirm={false}
                    onChange={(value) => value && setSelectedTimeRange([value[0], value[1]])}
                    disabledTime={disabledTime}
                    placeholder={["Giờ bắt đầu", "Giờ kết thúc"]}
                />
            </div>
        </>
    );
};

export default BookingDetail;
