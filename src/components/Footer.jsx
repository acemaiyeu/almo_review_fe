import { Link } from 'react-router-dom';
import img_bct from '../assets/img/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png'
import '../style/Footer.scss'
import { useEffect } from 'react';
const Footer = () => {

    const isDevHost = window.location.hostname.startsWith("localhost") || window.location.hostname.startsWith("192.168")
    useEffect(() => {
        if(!isDevHost){
          const handleContextMenu = (e) => e.preventDefault();
    
        // 2. Chặn các phím tắt Inspect (F12, Ctrl+Shift+I, v.v.)
        const handleKeyDown = (e) => {
          if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
            (e.ctrlKey && e.keyCode === 85) // Ctrl+U
          ) {
            e.preventDefault();
            alert("Hành động bị chặn để bảo vệ dữ liệu!");
          }
        };
    
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
          document.removeEventListener('keydown', handleKeyDown);
        };
        }
      }, []);

    return (
        <footer className="footer-container">
                <div className="footer-auth">
                    <div className="footer-auth-logo">
                        Almo Review
                    </div>
                    <div className="footer-auth-bct">
                        <img className="img-bct" src={img_bct} ></img>
                    </div>
                </div>
                <div className="footer-about">
                        <h1>Về chúng tôi</h1>
                        <Link to="/about">Giới thiệu</Link>
                </div>
                <div className="footer-policy">
                        <h1>Chính sách</h1>
                        <Link to="/policy">Chính sách bảo mật</Link>
                        <Link to="/terms">Điều khoản sử dụng & Thể lệ Quay thưởng</Link>
                        <Link to="/inspection-policy">Chính sách Kiểm hàng, Đổi trả & Bảo hành</Link>
                </div>
                <div className="footer-connect">
                        <h1>Kết nối</h1>
                        <a href="https://facebook.com" className="facebook_link" target='_blank'><i class="bi bi-facebook"></i> Facebook</a>
                        <a href="https://tiktok.com" className="tiktok_link" target='_blank'><i class="bi bi-tiktok"></i> Tiktok</a>
                        <a href="https://youtube.com" className="youtube_link" target='_blank'><i class="bi bi-youtube"></i> Youtube</a>
                </div>
        </footer>
    )
}
export default Footer;