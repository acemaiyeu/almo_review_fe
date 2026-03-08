import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ startTime, endTime }) => {
  const [displayData, setDisplayData] = useState({
    status: 'IDLE', // IDLE, COUNTING, RUNNING, EXPIRED
    timeLeft: null
  });

  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date().getTime();
      const start = new Date(startTime.replace(' ', 'T')).getTime();
      const end = new Date(endTime.replace(' ', 'T')).getTime();

      // 1. Đã kết thúc
      if (now > end) {
        return { status: 'EXPIRED', timeLeft: null };
      }

      // 2. Đang diễn ra (Ẩn component)
      if (now >= start && now <= end) {
        return { status: 'RUNNING', timeLeft: null };
      }

      // 3. Đang đếm ngược tới lúc bắt đầu
      const diff = start - now;
      return {
        status: 'COUNTING',
        timeLeft: {
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        }
      };
    };

    // Cập nhật ngay lập tức
    setDisplayData(calculateStatus());

    const timer = setInterval(() => {
      setDisplayData(calculateStatus());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  // Style chủ đạo #f7175a
  const containerStyle = {
    color: '#f7175a',
    fontWeight: 'bold',
    padding: '10px 15px',
    border: '1px solid #f7175a',
    borderRadius: '6px',
    display: 'inline-block',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  // LOGIC HIỂN THỊ
  
  // Nếu đang diễn ra (RUNNING), trả về null để ẩn component
  if (displayData.status === 'RUNNING') {
    return null; 
  }

  // Nếu đã kết thúc
  if (displayData.status === 'EXPIRED') {
    return (
      <div style={{ ...containerStyle, opacity: 0.7, borderColor: '#ccc', color: '#666' }}>
        Sự kiện đã hết hạn
      </div>
    );
  }

  // Nếu đang đếm ngược
  return (
    <div style={containerStyle}>
      Sự kiện sẽ bắt đầu sau{' '}
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {displayData.timeLeft?.hours} giờ {displayData.timeLeft?.minutes} phút {displayData.timeLeft?.seconds} giây
      </span>
    </div>
  );
};

export default CountdownTimer;