import { useNavigate } from 'react-router-dom';
import ForgotPopUp from './ForgotPopUp';

const ConfirmForgotPassword = () => {
    // Lấy token từ URL bất kể môi trường hiện tại
    const currentUrl = window.location.href;

    // Các domain hợp lệ
    const isArgonautDomain =
        currentUrl.startsWith("http://localhost:3000/") ||
        currentUrl.startsWith("http://localhost:3001/") ||
        currentUrl.startsWith("http://localhost:3002/") ||
        currentUrl.startsWith("https://argonaut.asia/");

    const urlParams = new URL(currentUrl).searchParams; // Parse URL
    const token = urlParams.get("token"); // Lấy token
    const navigate = useNavigate();

    if (!isArgonautDomain) {
        // Nếu không phải domain hợp lệ, không xử lý
        console.error("Truy cập từ domain không hợp lệ:", currentUrl);
        navigate("/404");
        return null;
    }

    if (!token) {
        // Nếu không có token, chuyển hướng về trang lỗi
        console.error("Không tìm thấy token trong URL.");
        navigate("/404");
        return null;
    }

    // Define an onClose handler
    const handleClose = () => {
        // Redirect to another page, such as the login page
        navigate("/");
    };

    return <ForgotPopUp token={token} onClose={handleClose} />;
};

export default ConfirmForgotPassword;
