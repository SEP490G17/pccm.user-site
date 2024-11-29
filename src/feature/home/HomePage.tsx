import React, { useEffect } from 'react';
import ListBanner from '@/feature/home/components/HomeBanner';
import ListCourtCluster from '@/feature/home/components/HomeCourtCluster';
import ListNews from '@/feature/home/components/HomeNews';
import { Layout } from 'antd';
import "./components/style/HomeNews.scss";
import { useStore } from '@/app/stores/store';

const { Content } = Layout;


const Home: React.FC = () => {
    const { courtClusterStore, courtClusterDetailsStore } = useStore();
    const { courtClusterArray, listCourt, loadListCourt, loadingInitial } = courtClusterStore;

        // Gọi loadListCourt để lấy dữ liệu khi component mount
        useEffect(() => {
            loadListCourt();  // Gọi API để tải danh sách sân thể thao
        }, [loadListCourt]);

    return (
        <Layout>
            <Content style={{ padding: '10px' }}>
                <div style={{ marginBottom: '70px' }}>
                    <ListBanner title="" />
                </div>
                <div style={{ marginBottom: '70px'}}>
                    <ListCourtCluster title="Sân thể thao mới" itemsPerPage={3} courtClusters={courtClusterArray} />
                </div>

                <div style={{ marginBottom: '70px' }}>
                    <div className="title-divider"></div>
                    <ListNews title="Tin tức mới nhất" itemsPerPage={5} />
                </div>

            </Content>
        </Layout>
    );
};

export default Home;
