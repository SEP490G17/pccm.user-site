import { useNavigate } from 'react-router-dom';
import ForgotPopUp from './ForgotPopUp';

const ConfirmForgotPassword = () => {
    // Lấy token từ URL bất kể môi trường hiện tại
    const currentUrl = window.location.href; 

    // Các domain hợp lệ
    const isArgonautDomain = currentUrl.startsWith("http://localhost:3000/") || currentUrl.startsWith("http://localhost:3001/") || currentUrl.startsWith("http://localhost:3002/") || currentUrl.startsWith("https://trongnp-registry.site/");

    const urlParams = new URL(currentUrl).searchParams; // Parse URL
    const token = urlParams.get('token'); // Lấy token
    const navigate = useNavigate();

    if (!isArgonautDomain) {
        // Nếu không phải domain hợp lệ, không xử lý
        navigate('/server-error');
        return null;
    }

    if (!token) {
        // Nếu không có token, chuyển hướng về trang lỗi
        navigate('/server-error');
        return null;
    }

    return <ForgotPopUp token={token} />;
};

export default ConfirmForgotPassword;
