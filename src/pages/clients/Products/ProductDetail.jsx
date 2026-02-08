import { useState } from 'react';
import DisplayContent from '../../../app/ComponentSupport/DisplayContent';
import '../../../style/ProductDetail.scss'
import LuckyWheel from '../../../app/ComponentSupport/LuckyWheel.jsx';
import { updateDynamic } from '../../../app/features/dynamicIslandSlice.js';
import { useDispatch } from 'react-redux';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        id: null,
        name: "IPHONE 15 PROMAX",
        property: `<div className="product-detail-content-phone">
                <div className="product-detail-content-title">Thông số kỹ thuật</div> <hr/
            </div>`,
        rate_descriptions: `
            <div>
            <h1>Màn hình: </h1><p>Với độ phân giải lên đến 2k cùng với tấm màn AMOLED khiến cho người dùng khá thích</p></div>
        `
    })
        const sendNotifiDynamic = (content) => {
        // Truyền vào đúng cấu trúc action.payload.title và action.payload.content
        dispatch(updateDynamic({
          title: "notifi", 
          content: content
        }));
      };
    const handlePrizeReceived = (prize) => {
    // console.log("Dữ liệu nhận được từ con:", prize);
    sendNotifiDynamic(`Bạn nhận được giảm giá ${prize.label} cho sản phẩm: ${product.name}`)
    
    
    // Bạn có thể xử lý lưu vào database hoặc update giỏ hàng tại đây
  };
    return (<div className="product-detail-container">
            <div className="product-detail-header">IPHONE 15 PRO MAX</div>
            <hr/>
            <div className="product-box">
                <div className="product-detail-video-rate">
                    <div className="product-detail-video-rate-title">Video Review</div>
                <video 
                    id="product-detail-video" 
                    src="..." 
                    controls         /* Hiển thị thanh điều khiển (play, volume) */
                    muted            /* Tắt tiếng (bắt buộc nếu muốn tự động phát trên Chrome/Safari) */
                    playsInline      /* Giúp video phát ngay trong khung trên mobile, không bị nhảy toàn màn hình */
                    poster="url_anh_cho" /* Ảnh hiển thị trước khi video được bấm phát */
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
            </div>
             <div className="product-detail-fast-rate">
                <div className="product-detail-fast-rate-title">Đánh giá nhanh</div>
                <div className="product-detail-fast-rate-content">
                    <DisplayContent htmlFromEditor={product?.rate_descriptions ?? ""}/>
                </div>
            </div>
            </div>
           <div className="product-box">
             <div className="product-affilate-link-list">
                <div className="product-affilate-link-item">
                    <div className="product-affilate-link-item-logo">
                        <img className="product-affilate-link-item-img" src="https://play-lh.googleusercontent.com/vrrgAukb27gHzlI-lwHQoabie4ByvZKMN9QVN7jgd5KCFgEKCbQClsujkfqhExpfrUdS=w600-h300-pc0xffffff-pd" alt="logo-shoppee" loading='lazy'></img>
                    </div>
                    <a target="_blank" className="product-affilate-link-item-title" href="" alt="affilate-link-shoppee">Mua hàng tại Shoppee</a>
                </div>
                <div className="product-affilate-link-item">
                    <div className="product-affilate-link-item-logo">
                        <img className="product-affilate-link-item-img" src="https://image.sggp.org.vn/w1000/Uploaded/2026/yfsgf/2019_06_20/3_BIXQ.png.webp" alt="logo-lazada" loading='lazy'></img>
                    </div>
                    <a href="" target="_blank" className="product-affilate-link-item-title" alt="affilate-link-shoppee">Mua hàng tại Lazada</a>
                </div>
                <div className="product-affilate-link-item">
                    <div className="product-affilate-link-item-logo">
                        <img className="product-affilate-link-item-img" src="https://cloud.shopback.com/c_fit,h_750,w_750/store-service-vn/assets/258709/2d508ce0-8522-11ee-bcea-33e49e1b1414.png" alt="logo-tiktok" loading='lazy'></img>
                    </div>
                    <a href="" target="_blank" className="product-affilate-link-item-title" alt="affilate-link-shoppee">Mua hàng tại TiktokShop</a>
                </div>
            </div>
            <div className="product-promotion">
                <LuckyWheel onResult={handlePrizeReceived} />
            </div>
           </div>
            {/* <div className="product-detail-content-phone">
                <div className="product-detail-content-title">Thông số kỹ thuật</div> <hr/>
                <div className="product-detail-content-title">Màn hình</div>
                <div className="product-detail-info-list">
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Kích thước màn hình</div>
                        <div className="product-detail-info-item-value">6.7 inches</div>
                    </div>
                     <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Công nghệ màn hình</div>
                        <div className="product-detail-info-item-value">Super Retina XDR OLED</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Độ phân giải màn hình</div>
                        <div className="product-detail-info-item-value">2796 x 1290-pixel</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Tính năng màn hình</div>
                        <div className="product-detail-info-item-value">Tốc độ làm mới 120Hz
                                                                        460 ppi
                                                                        2000 nits
                                                                        HDR
                                                                        True Tone
                                                                        Dải màu rộng (P3)
                                                                        Haptic Touch
                                                                        Tỷ lệ tương phản 2.000.000:1</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Tần số quét</div>
                        <div className="product-detail-info-item-value">120Hz</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Kiểu màn hình</div>
                        <div className="product-detail-info-item-value">Dynamic Island</div>
                    </div>
                </div>
                
                <div className="product-detail-content-title">Camera sau</div>
                <div className="product-detail-info-list">
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Camera sau</div>
                        <div className="product-detail-info-item-value">Camera chính: 48MP, 24 mm, ƒ/1.78
                                                                        Camera góc siêu rộng: 12 MP, 13 mm, ƒ/2.2
                                                                        Camera Tele: 12 MP</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Quay video</div>
                        <div className="product-detail-info-item-value">4K@24/25/30/60 fps
                                                                        HD 1080p@25/30/60 fps
                                                                        HD 720p@30 fps</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Tính năng camera</div>
                        <div className="product-detail-info-item-value">Flash True Tone Thích Ứng
                                                                        Photonic Engine
                                                                        Deep Fusion
                                                                        HDR thông minh thế hệ 5
                                                                        Ảnh chân dung thế hệ mới với Focus và Depth Control
                                                                        Hiệu ứng Chiếu Sáng Chân Dung với sáu chế độ
                                                                        Chế độ Ban Đêm</div>
                    </div>
                </div>
                <div className="product-detail-content-title">Camera trước</div>
                <div className="product-detail-info-list">
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Camera trước</div>
                        <div className="product-detail-info-item-value">12MP, ƒ/1.9</div>
                    </div>
                    <div className="product-detail-info-item">
                        <div className="product-detail-info-item-title">Quay video trước</div>
                        <div className="product-detail-info-item-value">4K@24/25/30/60 fps
                                                                        HD 1080p@25/30/60 fps</div>
                    </div>
                </div>
            </div> */}
            <DisplayContent htmlFromEditor={product?.property ?? ""}/>
           
    </div>)
}
export default ProductDetail;