import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const { Content } = Layout;

const App = () => {
  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.keyCode === 123) {
        // F12 key
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        // Ctrl + Shift + I
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        // Ctrl + Shift + J
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: any) => {
      e.preventDefault(); // Disable right-click menu
    };
    if (import.meta.env.VITE_API_URL !== 'http://localhost:5000/api/') {
      // Listen to keydown events and right-click events
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
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

      <Content className="container mx-auto mt-[8rem] mb-[1rem] min-h-[100vh]">
        <Outlet />
      </Content>

      <ToastContainer
        style={{ paddingTop: '80px' }}
        position="top-right"
        hideProgressBar
        theme="colored"
      />
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

export default App;
