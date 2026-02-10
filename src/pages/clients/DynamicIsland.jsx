import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetDynamic } from '../../app/features/dynamicIslandSlice'; // Đường dẫn tới file slice của bạn
import '../../style/DynamicIsland.css';

const DynamicIsland = () => {
  const dispatch = useDispatch();
  const { content, notifi } = useSelector((state) => state.dynamic);
  const [isActive, setIsActive] = useState(false);
  const audio = document.getElementById("audio");
  useEffect(() => {
    if (content) {
      setIsActive(true);
      audio.play();
      // Sau 3 giây thì bắt đầu thu nhỏ lại
      const timer = setTimeout(() => {
        setIsActive(false);
        
        // Chờ hiệu ứng CSS thu nhỏ xong (500ms) rồi mới xóa hẳn data trong Redux
        setTimeout(() => {
          dispatch(resetDynamic());
        }, 500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [content, dispatch]);


  return (

    <div className="di-wrapper">
      {/* Chỉ Render CSS class dựa trên biến isActive */}
      <div className={`di-island ${isActive ? 'di-active' : 'di-hidden'}`}>
        {isActive ? (
          <div className="di-content">
            <div className="di-icon-bg">
              {/* <span>{notifi ? '🔔' : '✨'}</span> */}
              <span>'🔔'</span>
            </div>
            <div className="di-text-stack">
              {/* {notifi && <small className="di-title">{notifi}</small>} */}
              <p className="di-text">{content}</p>
            </div>
          </div>
        ) : 
         <div className="di-content">
            <div className="di-text-stack">
              <p className="di-text"><span>Almo Review</span></p>
            </div>
          </div>
          }
      </div>
    </div>
  );
};

export default DynamicIsland;