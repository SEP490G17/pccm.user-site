import { Row, Col, Typography, Popover } from 'antd'; // Replace Grid with Row
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/stores/store';
import { useEffect, useState } from 'react';

interface IProps {
    courtClusterId: number;
}

const { Text, Title } = Typography;

const CourtClusterServicesTab = observer(({ courtClusterId }: IProps) => {
    const { serviceStore } = useStore();
    const [activePopover, setActivePopover] = useState<number | null>(null); // Track which Popover is active

    useEffect(() => {
        // Load services based on courtClusterId
        serviceStore.setFilterTerm(`courtClusterId=${courtClusterId}`);
    }, [courtClusterId, serviceStore]);

    if (serviceStore.loadingInitial) {
        return <Text style={{ fontSize: '16px' }}>Đang tải danh sách dịch vụ...</Text>;
    }

    if (!serviceStore.serviceArray.length) {
        return <Text style={{ fontSize: '16px' }}>Không có dịch vụ nào cho cụm sân này.</Text>;
    }

    const handleMouseEnter = (index: number) => {
        setActivePopover(index); // Show Popover for the hovered item
    };

    const handleMouseLeave = () => {
        setActivePopover(null); // Hide Popover when mouse leaves
    };

    const popoverContent = (service: any) => (
        <div>
            <Title level={4}>{service.serviceName}</Title>
            <Text> Mô tả: {service.description}</Text>
            <Title level={5} style={{ color: '#009688' }}>
                Giá: {service.price.toLocaleString('vn')} VND
            </Title>
        </div>
    );

    return (
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {serviceStore.serviceArray.map((service, index) => (
                <Col key={service.id} span={8}>
                    <div
                        style={{
                            background: 'white',
                            padding: 16,
                            borderRadius: 8,
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease-in-out',
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Popover
                            content={popoverContent(service)}
                            trigger="hover"
                            open={activePopover === index} // Updated from "visible" to "open"
                            placement="top"
                            overlayStyle={{ width: 300 }}
                            onOpenChange={() => {
                                // Optionally, you can handle open change here if needed
                            }}
                        >
                            <div>
                                <Title level={5} style={{ fontWeight: 'bold' }} ellipsis>
                                    {service.serviceName}
                                </Title>
                                <Text ellipsis style={{ maxWidth: '100%' }}>
                                    Mô tả: {service.description}
                                </Text>
                            </div>
                        </Popover>
                        <Title level={5} style={{ marginTop: 'auto', color: '#009688' }}>
                            Giá: {service.price.toLocaleString('vn')} VND
                        </Title>
                    </div>
                </Col>
            ))}
        </Row>
    );
});

export default CourtClusterServicesTab;
