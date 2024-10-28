import React from 'react';
import ListBanner from '@/feature/home/components/HomeBanner';
import ListCourtCluster from '@/feature/home/components/HomeCourtCluster';
import ListNews from '@/feature/home/components/HomeNews';
import { Layout } from 'antd';
import "./components/style/HomeNews.scss"; 

const { Content } = Layout;


const Home: React.FC = () => {
    return (
        <Layout style={{ maxWidth: '85%', margin: 'auto', padding: '20px 0px 0px 0px'}}>
            <Content style={{ padding: '10px' }}>
                <div style={{marginBottom: '70px'}}>
                    <ListBanner title="" />
                </div>
                <div style={{ marginBottom: '70px' }}>
                    <ListCourtCluster title="Sân thể thao mới" itemsPerPage={4} />
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
