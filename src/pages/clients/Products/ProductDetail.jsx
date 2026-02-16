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
import AnimatedCounter from '../../../app/ComponentSupport/AnimatedCounter.jsx';

const ProductDetail = () => {
    const profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const { slug } = useParams();
    const [stermModal, setStermModal] = useState(false);
    const [loading, setLoading] = useState(true);
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
    getProduct()
  };
  const handleClose = (e) => {
  e.stopPropagation(); // Ngăn chặn sự kiện lan lên cha
  setStermModal(false);
};
  const getProduct = async () => {
    const product_api = await getProductClientDetail(slug);
        if(product_api){
            setProduct({
                ...product_api
            })
            setLoading(false);
        }
  }
  useEffect(() => {
        getProduct()
    }, [product.id])
    if(loading){
        return <div className="spin">
                    <div class="spinner-grow text-almo" role="status"></div>Đang tải sản phẩm...
                </div>;
    }
    return (product.id ?
        <div className="product-detail-container">   
            <div className="product-detail-header">{product?.name}</div>
            <hr/>
            <div className="product-price">GIÁ SẢN PHẨM (đã mua): {product.price}</div>
            <div className="product-box">
                <div className="product-detail-video-rate">
                    <div className="product-detail-video-rate-title">Video Review</div>
               {/* <TikTokPlayer videoUrl="https://www.tiktok.com/@69s.pet/video/7605579465699101972?is_from_webapp=1&sender_device=pc" /> */}
               {product.review_link && product.type_review_link === "youtube" && 
                    <YouTubePlayer videoUrl={product.review_link} />
                }
                {product.review_link && product.type_review_link === "tiktok" && 
                    <TikTokPlayer videoUrl={product.review_link} />
                }
                <div className="product-detail-video-rate-title">Video Review Lại</div>
               {/* <TikTokPlayer videoUrl="https://www.tiktok.com/@69s.pet/video/7605579465699101972?is_from_webapp=1&sender_device=pc" /> */}
               {product.review_link2 && product.type_review_link2 === "youtube" && 
                    <YouTubePlayer videoUrl={product.review_link2} />
                }
                {product?.review_link2 && product.type_review_link2 === "tiktok" && 
                    <TikTokPlayer videoUrl={product.review_link2} />
                }
            </div>
             <div className="product-detail-fast-rate">
                <div className="product-detail-fast-rate-title">Đánh giá nhanh</div>
                <div className="product-detail-fast-rate-content">
                    <DisplayContent htmlFromEditor={product?.rate_descriptions ?? ""}/>
                </div>
            </div>
            </div>
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
                <div className="lucky-wheel-sterm">
                        <div className="lucky-wheel-sterm-text" onClick={() => setStermModal(true)}>Thể lệ
                            {stermModal &&
                                <div className="lucky-wheel-sterm-modal">
                                        <span className="lucky-wheel-sterm-modal-closed" onClick={(e) => handleClose(e)}>Đóng</span>
                                        <div className="lucky-wheel-sterm-modal-title">
                                            THỂ LỆ CHƯƠNG TRÌNH "VÒNG QUAY MAY MẮN – SĂN DEAL ĐỘC BẢN"
                                        </div>
                                        <div className="lucky-wheel-sterm-modal-content">
                                            <div className="lucky-wheel-sterm-modal-content-title">1. GIỚI THIỆU CHƯƠNG TRÌNH</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li>Chương trình được tổ chức bởi Almo Review nhằm tạo cơ hội cho cộng đồng yêu công nghệ sở hữu các sản phẩm Review chất lượng với mức giá ưu đãi cực sốc (giảm từ 35% đến 50%). Mỗi sản phẩm được Review là sản phẩm duy nhất, đã qua sử dụng thực tế trong 01 tháng để đảm bảo đánh giá khách quan nhất.</li>
                                                </ul>
                                            </div>
                                            <div className="lucky-wheel-sterm-modal-content-title">2. ĐỐI TƯỢNG THAM GIA</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li>Tất cả người chơi có tài khoản hợp lệ trên website</li>
                                                    <li><b>Yêu cầu bắt buộc: </b>Tài khoản phải được đăng ký <b>bằng số điện thoại chính chủ</b><i>(Tránh gian lận)</i>, Email thật <i>(Quên mật khẩu sẽ được kích hoạt qua email)</i></li>
                                                    <li>Mỗi cá nhân chỉ được dùng tối qua 1 tài khoản</li>
                                                </ul>
                                            </div>
                                            <div className="lucky-wheel-sterm-modal-content-title">3. YÊU CẦU TRƯỚC KHI QUAY GIẢI</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li>Số lượng tham gia: ít nhất 50 người đăng ký (hoặc chờ đủ 50 người)</li>
                                                </ul>
                                            </div>
                                            <div className="lucky-wheel-sterm-modal-content-title">4. CÁC BƯỚC THAM GIA</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li><b>Bước 1:</b> Đăng nhập vào website</li>
                                                    <li><b>Bước 2:</b> Xem video review và tìm hiểu thông số kỹ thật sản phẩm</li>
                                                    <li><b>Bước 3:</b> Nhấn nút <b>NHẬN GIẢM GIÁ</b>. Hệ thống sẽ ghi nhận lại mức giảm giá của bạn từ 35% - 50%</li>
                                                    <li><b>Bước 4:</b> Chờ đến phiên live được thông báo qua email hoặc tại web. Nếu trúng giải sẽ được thông báo qua số điện thoại chính chủ (<b>Không chấp nhận số khác với tài khoản đăng ký</b>)</li>
                                                    <li><b>Bước 5:</b> Sau khi đã được xác nhận quý khách hàng đợi 1 - 2 ngày để web cập nhật thông tin đơn hàng tại <b>Quản lý đơn hàng</b> trên website</li>
                                                </ul>
                                            </div>
                                            <div className="lucky-wheel-sterm-modal-content-title">5. CƠ CHẾ TRÚNG GIẢI</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li>Vì mỗi sản phẩm chỉ có <b>1 cái duy nhất</b>, việc chọn người mua sẽ thực hiện công khai</li>
                                                    <li><b>Hình thức: </b> Livestream quay số ngẫu nhiên trên trang thứ 3 (như Wheel of Names hoặc Random.org)</li>
                                                    <li><b>Dữ liệu quay: </b> Dựa vào số thứ tự (STT) trong danh sách những người đã tham gia quay thưởng trên web</li>
                                                    <li><b>Thời gian công bố: </b> Được thể hiện rõ trong lúc livestream và được cập nhật sau đó tại trang chi tiết sản phẩm</li>
                                                </ul>
                                            </div>
                                            <div className="lucky-wheel-sterm-modal-content-title">6. QUY ĐỊNH VỀ TÍNH MINH BẠCH VÀ CHỐNG GIAN LẬN</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li><b>Loại bỏ tài khoản ảo: </b>Chúng tôi sẽ dùng một số biện pháp để hạn chế người dùng spam tài khoản</li>
                                                    <li><b>Xác minh người thắng cuộc: </b>Khi chọn được người may mắn, Ban tổ chức (BTC) sẽ liên hệ trực tiếp qua SĐT đã đăng ký tài khoản. Nếu sau 3 lần gọi (trong vòng 24h) không liên hệ được, BTC có quyền hủy kết quả và thực hiện quay số lại. (CÙng với việc chặn tài khoản để tránh mất thời gian cho các phiên live sau)</li>
                                                    <li><b>Quyền quyết định: </b>Quyết định của BTC dựa trên dữ liệu hệ thống là quyết định cuối cùng</li>
                                                </ul>
                                            </div>
                                            <div className="lucky-wheel-sterm-modal-content-title">7. HƯỚNG DẪN DÀNH CHO NGƯỜI KHÔNG TRÚNG GIẢI</div>
                                            <div className="lucky-wheel-sterm-modal-content-body">
                                                <ul>
                                                    <li>
                                                        Với những người dùng không may mắn trúng sản phẩm, bạn có thể lựa chọn mua sản phẩm mới 100% thông qua các liên kết Affiliate (Shopee, Lazada, TikTok) được đính kèm ngay tại trang sản phẩm để ủng hộ kênh. Nếu có vấn đề gì về sản phẩm hãy liên hệ với chúng tôi để có thể giải đáp thắc mắc cũng như là hỗ trợ quý khách hàng
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                            }
                        </div>
                       
                </div>
                <LuckyWheel onResult={handlePrizeReceived} product_id={product.id} isLogin={profile.email !== ''} userComplete={2000} join_lucky={product.join_lucky} discount_price={product.discount_price}/>
            </div>
           
    </div> : <div className="product-detail-container"><p>Không tìm thấy sản phẩm</p></div>)
}
export default ProductDetail;