import { Link } from 'react-router-dom';
import img_bct from '../assets/img/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png'
import '../style/Footer.scss'
const Footer = () => {


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
                </div>
                <div className="footer-connect">
                        <h1>Kết nối</h1>
                        <a href="https://facebook.com" target='_blank'><i class="bi bi-facebook"></i> Facebook</a>
                        <a href="https://tiktok.com" target='_blank'><i class="bi bi-tiktok"></i> Tiktok</a>
                        <a href="https://youtube.com" target='_blank'><i class="bi bi-youtube"></i> Youtube</a>
                </div>
        </footer>
    )
}
export default Footer;