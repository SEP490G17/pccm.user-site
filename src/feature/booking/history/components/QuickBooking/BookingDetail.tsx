import { Flex, Tag, TimePicker, Typography } from 'antd';

import { Dayjs } from 'dayjs';
const { Title } = Typography;

interface IProps {
    availableSlots: string[];
    setSelectedTimeRange: (value: [Dayjs | null, Dayjs | null]) => void;
    disabledTime?: () => any;
}

const BookingDetail = ({
    availableSlots,
    setSelectedTimeRange,
}: IProps) => {
    return (
        <Flex vertical gap="middle">
            <Flex align="center" justify="space-between">
                <Title level={5} style={{ margin: 0, minWidth: '150px' }}>Các giờ còn trống:</Title>
                <Flex flex={1} wrap='wrap'>
                    {availableSlots.length > 0 ? (
                        availableSlots.map((slot, index) => (
                            <Tag key={index} color="green" style={{ cursor: 'pointer', margin: '2px' }}>
                                {slot}
                            </Tag>
                        ))
                    ) : (
                        <span>Không có giờ trống!</span>
                    )}
                </Flex>
            </Flex>

            <Flex align="center" justify="space-between">
                <Title level={5} style={{ margin: 0, minWidth: '150px' }}>Chọn giờ thuê:</Title>
                <Flex flex={1}>
                    <TimePicker.RangePicker
                        allowClear
                        minuteStep={15}
                        format={'HH:mm'}
                        hourStep={1}
                        inputReadOnly
                        style={{ width: '100%' }}
                        needConfirm={false}
                        onChange={(value) => value && setSelectedTimeRange([value[0], value[1]])}
                        placeholder={["Giờ bắt đầu", "Giờ kết thúc"]}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default BookingDetail;
