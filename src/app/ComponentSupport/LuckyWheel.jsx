import React, { Component } from 'react';
import '../../style/LuckyWheel.css';

class LuckyWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      rotation: 0,
      result: null,
    };

    this.prizes = [
      { label: 'Giảm 30%', value: 30 },
      { label: 'Giảm 35%', value: 35 },
      { label: 'Giảm 40%', value: 40 },
      { label: 'Giảm 45%', value: 45 },
      { label: 'Giảm 50%', value: 50 }
    ];
  }

  // handleSpin = () => {
  //   if (this.state.spinning) return;

  //   this.setState({ spinning: true, result: null });

  //   // FIX CỨNG: Luôn dừng ở 'Giảm 35%' (index 1)
  //   const targetIndex = 1; 
  //   const prize = this.prizes[targetIndex];
  //   const sectorAngle = 360 / this.prizes.length;

  //   // LOGIC QUAY ĐỨNG CHÍNH XÁC:
  //   // 1. Mỗi vòng quay là 360deg.
  //   // 2. Để targetIndex nằm ở ĐỈNH (12h), ta cần quay ngược lại một khoảng bằng vị trí của nó.
  //   // 3. Trừ đi (sectorAngle / 2) để mũi tên nằm giữa múi.
  //   const currentRotation = this.state.rotation;
  //   const offset = (targetIndex * sectorAngle) + (sectorAngle / 2);
  //   const extraSpin = 1800; // Quay 5 vòng cho đẹp
    
  //   // Công thức tính góc quay mới để dừng đúng đỉnh:
  //   const newRotation = currentRotation + extraSpin + (360 - (currentRotation % 360)) - offset;

  //   this.setState({ rotation: newRotation });

  //   setTimeout(() => {
  //     this.setState({ spinning: false, result: prize });
  //     if (this.props.onResult) this.props.onResult(prize);
  //   }, 3000);
  // };

handleSpin = () => {
  if (this.state.spinning) return;

  this.setState({ spinning: true, result: null });

  // 1. Chỉ định chính xác mục tiêu là Giảm 35% (Index 1)
  const targetIndex = 0; 
  const prize = this.prizes[targetIndex];
  const sectorAngle = 360 / this.prizes.length; // 72 độ

  // 2. Tính toán góc quay chuẩn
  const extraSpin = 1800; // Quay 5 vòng để tạo hiệu ứng
  
  // Giải thích công thức:
  // - (targetIndex * sectorAngle): Đưa vị trí bắt đầu của múi về trục 0 (3h)
  // - (sectorAngle / 2): Đưa điểm giữa của múi về trục 0 (3h)
  // - Cộng thêm 90 độ: Vì mũi tên nằm ở đỉnh (12h), ta phải quay thêm 90 độ để đưa cái đang ở "3h" lên "12h"
  const angleToCenterOfPrize = (targetIndex * sectorAngle) + (sectorAngle / 2);
  
  // Chúng ta dùng dấu trừ vì vòng quay quay theo chiều kim đồng hồ
  const finalRotation = this.state.rotation + extraSpin + (360 - (this.state.rotation % 360)) - angleToCenterOfPrize - 90;

  this.setState({ rotation: finalRotation });

  setTimeout(() => {
    this.setState({ spinning: false, result: prize });
    if (this.props.onResult) this.props.onResult(prize);
  }, 3000);
};
  render() {
    const { rotation, spinning, result } = this.state;
    const sectorAngle = 360 / this.prizes.length;

    return (
      <div className="lucky-wheel-container">
        <div className="wheel-wrapper">
          {/* MŨI TÊN CHỈ ĐIỂM (FIXED TẠI ĐÂY) */}
          <div className="wheel-pointer"></div>

          <div
            className="wheel-canvas"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)'
            }}
          >
            {this.prizes.map((prize, index) => {
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

        <button className="spin-button" onClick={this.handleSpin} disabled={spinning}>
          {spinning ? 'ĐANG QUAY...' : 'NHẬN GIẢM GIÁ'}
        </button>

        {result && !spinning && (
          <div className="prize-msg">Chúc mừng! Bạn nhận được <strong>{result.label} <br/></strong><i style={{fontSize: "0.8rem"}}>Cùng chờ quay may mắn tại Tiktok #ALmo</i></div>
        )}
      </div>
    );
  }
}

export default LuckyWheel;