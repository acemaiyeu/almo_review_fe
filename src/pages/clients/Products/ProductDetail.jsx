import { useEffect, useState } from 'react';
import DisplayContent from '../../../app/ComponentSupport/DisplayContent';
import '../../../style/ProductDetail.scss'
import LuckyWheel from '../../../app/ComponentSupport/LuckyWheel.jsx';
import { updateDynamic } from '../../../app/features/dynamicIslandSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { showDynamic } from '../../../app/ComponentSupport/functions.js';
import { getProductClientDetail } from '../../../services/ProductService.js';
import { useParams } from 'react-router-dom';
import TikTokPlayer from '../../../app/ComponentSupport/TikTokPlayer.jsx';
import YouTubePlayer from '../../../app/ComponentSupport/YouTubePlayer.jsx';

const ProductDetail = () => {
    const profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const { slug } = useParams();
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
    const handlePrizeReceived = (prize) => {
    // console.log("Dữ liệu nhận được từ con:", prize);
    showDynamic(dispatch,`Bạn nhận được giảm giá ${prize.label} cho sản phẩm: ${product.name}`)
  };
  const getProduct = async () => {
    const product_api = await getProductClientDetail(slug);
        if(product_api){
            setProduct({
                ...product_api
            })
        }
  }
  useEffect(() => {
        getProduct()
    }, [product.id])
    return (product.id ?
        <div className="product-detail-container">   
            <div className="product-detail-header">{product?.name}</div>
            <hr/>
            <div className="product-box">
                <div className="product-detail-video-rate">
                    <div className="product-detail-video-rate-title">Video Review</div>
               {/* <TikTokPlayer videoUrl="https://www.tiktok.com/@69s.pet/video/7605579465699101972?is_from_webapp=1&sender_device=pc" /> */}
               <YouTubePlayer videoUrl="https://www.youtube.com/watch?v=Ly0wJQEgGn4" />
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
                
                {product.affilate_lazada_link &&
                        <div className="product-affilate-link-item">
                            <div className="product-affilate-link-item-logo">
                                <img className="product-affilate-link-item-img" src="https://image.sggp.org.vn/w1000/Uploaded/2026/yfsgf/2019_06_20/3_BIXQ.png.webp" alt="logo-lazada" loading='lazy'></img>
                            </div>
                            <a href="" target="_blank" className="product-affilate-link-item-title" alt="affilate-link-lazada">Mua hàng tại Lazada</a>
                        </div>
                    }
                    {product.affilate_tiktok_link && 
                        <div className="product-affilate-link-item">
                            <div className="product-affilate-link-item-logo">
                                <img className="product-affilate-link-item-img" src="https://cloud.shopback.com/c_fit,h_750,w_750/store-service-vn/assets/258709/2d508ce0-8522-11ee-bcea-33e49e1b1414.png" alt="logo-tiktok" loading='lazy'></img>
                            </div>
                            <a href="" target="_blank" className="product-affilate-link-item-title" alt="affilate-link-tiktok">Mua hàng tại TiktokShop</a>
                        </div>
                    }
                    {product.affilate_shopee_link && 
                        <div className="product-affilate-link-item">
                            <div className="product-affilate-link-item-logo">
                                <img className="product-affilate-link-item-img" src="https://play-lh.googleusercontent.com/vrrgAukb27gHzlI-lwHQoabie4ByvZKMN9QVN7jgd5KCFgEKCbQClsujkfqhExpfrUdS=w600-h300-pc0xffffff-pd" alt="logo-shoppee" loading='lazy'></img>
                            </div>
                            <a target="_blank" className="product-affilate-link-item-title" href={product.affilate_shopee_link} alt="affilate-link-shopee">Mua hàng tại Shopee</a>
                        </div>
                    }
                
            </div>
            <div className="product-promotion">
                <LuckyWheel onResult={handlePrizeReceived} product_id={product.id} isLogin={profile.email !== ''}/>
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
           
    </div> : <div className="product-detail-container"><p>Không tìm thấy sản phẩm</p></div>)
}
export default ProductDetail;