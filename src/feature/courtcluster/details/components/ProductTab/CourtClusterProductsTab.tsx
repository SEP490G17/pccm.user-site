import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Select, Typography, Row, Col, Card } from 'antd'; // Import necessary components from Ant Design
import { useStore } from '@/app/stores/store.ts';
import { Image } from 'antd'; // Import Image from antd

const { Text, Title } = Typography;

interface Props {
    courtClusterId: number;
}

const CourtClusterProductsTab: React.FC<Props> = ({ courtClusterId }) => {
    const { productStore, categoryStore } = useStore();
    const {
        loading: loadingProducts,
        productRegistry,
        filterByCourtCluster,
        filterByCategory,
    } = productStore;
    const { loadingInitial: loadingCategories, categoryRegistry, loadCategories } = categoryStore;
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

    useEffect(() => {
        filterByCourtCluster(courtClusterId);
        if (categoryRegistry.size === 0 && !loadingCategories) {
            loadCategories();
        }
    }, [courtClusterId, filterByCourtCluster, categoryRegistry.size, loadCategories, loadingCategories]);

    const handleCategoryChange = (categoryId: number | undefined) => {
        setSelectedCategory(categoryId);

        if (categoryId === undefined) {
            filterByCourtCluster(courtClusterId); // When "Tất cả" is selected, load all products
        } else {
            filterByCategory(categoryId); // Filter by specific category
        }
    };

    const productArray = Array.from(productRegistry.values());
    const categoryArray = Array.from(categoryRegistry.values());

    return (
        <div>
            {/* Category Filter */}
            <div style={{ marginBottom: 24 }}>
                <Select
                    placeholder="Tất cả"
                    value={selectedCategory === undefined ? '' : selectedCategory}
                    onChange={(value) =>
                        handleCategoryChange(value ? Number(value) : undefined)
                    }
                    style={{ width: 200 }}
                >
                    <Select.Option value="">Tất cả</Select.Option> 
                    {categoryArray.length > 0 ? (
                        categoryArray.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.categoryName}
                            </Select.Option>
                        ))
                    ) : (
                        <Select.Option value="" disabled>
                            Không có danh mục nào
                        </Select.Option>
                    )}
                </Select>
            </div>

            {/* Loading state */}
            {loadingProducts || loadingCategories ? (
                <Text style={{ fontSize: '16px' }}>Đang tải danh sách sản phẩm và danh mục...</Text>
            ) : (
                <Row gutter={[16, 16]}>
                    {productArray.length > 0 ? (
                        productArray.map((product) => (
                            <Col key={product.id} span={8}>
                                <Card
                                    hoverable
                                    cover={
                                        product.thumbnailUrl ? (
                                            <Image
                                                src={product.thumbnailUrl}
                                                alt={product.productName}
                                                height={200}
                                                width="100%"
                                                style={{ objectFit: 'cover', borderRadius: 8 }}
                                                preview={{ src: product.thumbnailUrl }}
                                            />
                                        ) : null
                                    }
                                    style={{
                                        borderRadius: 8,
                                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <div>
                                        <Title level={5}>{product.productName}</Title>
                                        <Text> Số lượng: {product.quantity}</Text>
                                        <div style={{ marginTop: 8 }}>
                                            <Title level={5} style={{ color: '#009688' }}>
                                                Giá: {product.price.toLocaleString('vn')} VND
                                            </Title>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Text style={{ fontSize: '16px' }}>Không có sản phẩm nào trong danh mục này.</Text>
                    )}
                </Row>
            )}
        </div>
    );
};

// Named export for Fast Refresh compatibility
export default observer(CourtClusterProductsTab);
