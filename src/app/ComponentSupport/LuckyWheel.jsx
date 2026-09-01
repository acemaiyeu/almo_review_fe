import React, { useState } from 'react';
import '../../style/LuckyWheel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscount } from '../features/productSlice';
import axiosClient from '../../services/axiosClient';
import { toast } from 'react-toastify';
// Giả sử bạn có action getDiscount từ store
// import { getDiscount } from '../../redux/actions/productActions'; 

const LuckyWheel = ({ onResult, product_id, product, isLogin = false , userComplete = 0, join_lucky = false, discount_price = 0}) => {
  const [modal, setModal] = useState(false)
  // Lấy dữ liệu từ redux store
  const [tiktokid, setTiktokid] = useState("")
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [result, setResult] = useState(null);

  const prizes = [
    { label: 'Giảm 30%', value: 30 },
    { label: 'Giảm 32.5%', value: 32.5},
    { label: 'Giảm 35%', value: 35 },
    { label: 'Giảm 40%', value: 40 },
    { label: 'Giảm 45%', value: 45 },
    { label: 'Giảm 50%', value: 50 }
  ];
  const terms = `<div className=''></div>`;
  const handleSpin = () => {
    if(!tiktokid.startsWith("@") || tiktokid.length < 2){
      toast.error("ID tiktok chưa đúng. Phải bắt đầu bằng @ theo sau là id tiktok")
      return;
    }
    setModal(false)
      axiosClient.post('/get-discount-product', {
        product_id,
        tiktok_id: tiktokid
      }).then((res) => {
        if (spinning) return;
        setNewPrice(res.new_price)
    setSpinning(true);
    setResult(null);

    // 1. Chỉ định mục tiêu (Ví dụ: Index 1 là Giảm 35%)
    const targetIndex = prizes.findIndex((i) => i.value == res.data); 
    const prize = prizes[targetIndex];
    const sectorAngle = 360 / prizes.length; 

    // 2. Tính toán góc quay
    const extraSpin = 1800; // 5 vòng quay
    const angleToCenterOfPrize = (targetIndex * sectorAngle) + (sectorAngle / 2);
    
    // Tính toán góc quay mới dựa trên góc hiện tại để không bị quay ngược về 0
    const currentRotationBase = rotation - (rotation % 360);
    const finalRotation = currentRotationBase + extraSpin + (360 - angleToCenterOfPrize - 100);

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(prize);
      
      // Gửi action lên Redux nếu cần sau khi quay xong
      // dispatch(getDiscount(prize.value)); 
      
      if (onResult) onResult(prize);
    }, 3000);
    

      }).catch()
  };    

  const sectorAngle = 360 / prizes.length;

  return (
    <div className="lucky-wheel-container">
    {modal && 
    <div className="lucky-wheel-container-modal">
        <div className="lucky-wheel-container-modal-form">
            <input className="lucky-wheel-container-modal-form-input" placeholder='@Id tiktok' value={tiktokid} onChange={(e) => setTiktokid(e.target.value)}/>
            <div className="btn btn-primary" style={{backgroundColor: '#f7175a', border:  ' 1px solid #f7175a'}} onClick={handleSpin}>Xác nhận</div>
        </div>
    </div>}
      <div className="wheel-wrapper">
        <div className="wheel-pointer"></div>

        <div
          className="wheel-canvas"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)'
          }}
        >
          {prizes.map((prize, index) => {
            const rotateDeg = index * sectorAngle;
            const skewDeg = 90 - sectorAngle;
            return (
              <div
                key={index}
                className="wheel-sector"
                style={{
                  transform: `rotate(${rotateDeg}deg) skewY(${skewDeg}deg)`,
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#fde8ef'
                }}
              >
                <div
                  className="sector-label"
                  style={{
                    transform: `skewY(-${skewDeg}deg) rotate(${sectorAngle / 2}deg)`
                  }}
                >
                  {prize.label}
                </div>
              </div>
            );
          })}
        </div>
        <div className="wheel-center-dot"></div>
      </div>
      
      <button className="spin-button" disabled={spinning || join_lucky} onClick={() => setModal(true)}>
        {spinning ? 'ĐANG QUAY...' : (!isLogin ? 'BẮT ĐẦU QUAY' : (join_lucky ? `GIÁ KHI TRÚNG GIẢI ${discount_price}` : 'NHẬN GIẢM GIÁ'))}
      </button>

      {result && !spinning && (
        <div className="prize-msg-container">
          <div className="prize-msg">
            Chúc mừng! Bạn nhận được <strong>{result.label} <br/></strong>
            Còn lại <strong>{newPrice.toLocaleString('vi-VN')} đ <br/></strong>
            <i style={{fontSize: "0.8rem"}}>Cùng chờ quay may mắn tại Tiktok #ALmo</i>
          </div>
        </div>
      )}
      <div className="total-user-complete">
          <span className="total-user-complete-number">{product.total_users}</span> người đã tham gia
      </div>
    </div>
  );
};

export default LuckyWheel;