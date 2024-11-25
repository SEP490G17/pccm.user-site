import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPopUp from './ForgotPopUp';

const ConfirmForgotPassword = () => {
    // Lấy token từ URL bất kể môi trường hiện tại
    const currentUrl = window.location.href; // URL đầy đủ, ví dụ: https://argonaut.asia/confirm-forgot-password?token=...
    const isArgonautDomain = currentUrl.startsWith("http://localhost:3000/");
    const urlParams = new URL(currentUrl).searchParams; // Parse URL
    const token = urlParams.get('token'); // Lấy token
    const navigate = useNavigate();

    if (!isArgonautDomain) {
        // Nếu không phải domain chính thức, không xử lý
        console.error("Truy cập từ domain không hợp lệ:", currentUrl);
        navigate('/404');
        return null;
    }

    if (!token) {
        // Nếu không có token, chuyển hướng về trang lỗi
        console.error("Không tìm thấy token trong URL.");
        navigate('/404');
        return null;
    }

    return <ForgotPopUp token={token} />;
};

export default ConfirmForgotPassword;
