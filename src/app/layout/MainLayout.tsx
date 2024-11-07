import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';

const { Content } = Layout;

const App = () => {

    return (
        <Layout>
            <Layout.Header
                style={{
                    background: 'white',
                    height: '2rem',
                    position: 'fixed',
                    zIndex: 999,
                    width: '100%',
                    padding: 0,
                }}
            >
                <Header />
            </Layout.Header>


            <Content
                style={{
                    background: '#F5F6F7',
                    paddingTop: '5rem',
                    paddingBottom: '1rem',
                    minHeight: '100vh',
                    width: '100%',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >

                <Outlet />
            </Content>

            <ToastContainer style={{paddingTop:'80px'}} position="top-right" hideProgressBar theme="colored" />
            <Layout.Footer
                style={{
                    width: '100%',
                    background: 'white',
                }}
            >
                <Footer />
            </Layout.Footer>
        </Layout>
    );
};

export default observer(App);
