import { useSelector } from 'react-redux';
import '../../../style/MarqueeText.css';
import { useState, useEffect } from 'react';

const AutoHideNotification = ({ duration = 10 }) => {
  // Lấy message từ store
  const message = useSelector((state) => state.notifi.message);
  const [isVisible, setIsVisible] = useState(false);

  // Mỗi khi message thay đổi (và không rỗng), chúng ta hiện lại thông báo
  useEffect(() => {
    if (message && message.trim() !== "") {
      setIsVisible(true);
    }
  }, [message]); // Theo dõi sự thay đổi của message

  // Nếu không có tin nhắn hoặc đã chạy xong thì không render
  if (!isVisible || !message) return null;

  return (
    <div className="notification-banner">
      <div 
        key={message} // Quan trọng: Reset animation khi nội dung thay đổi
        className="scrolling-text"
        style={{ animationDuration: `${duration}s` }}
        onAnimationEnd={() => setIsVisible(false)}
      >
        {message}
      </div>
    </div>
  );
};

export default AutoHideNotification;