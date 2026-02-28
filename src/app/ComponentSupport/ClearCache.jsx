import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from './functions';

const ClearCache = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Xóa localStorage
        localStorage.removeItem("sks-ksk");
        
        // Xóa Cookie (Giả sử hàm deleteCookie của bạn đã được import)
            deleteCookie('sk');

        // Thông báo hoặc log (tùy chọn)
        console.log("Cache đã được dọn dẹp!");

        // Chuyển hướng người dùng về trang login hoặc admin sau khi xóa xong
    }, [navigate]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Đang dọn dẹp bộ nhớ tạm, vui lòng chờ...</p>
        </div>
    );
};

export default ClearCache;