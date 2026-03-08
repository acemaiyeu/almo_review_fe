import React, { useState } from 'react';
import '../../../style/Feedback.css'; // Đường dẫn tới file CSS của bạn
import { createFeedbackProduct } from '../../../services/FeedbackProductService';
import { useDispatch } from 'react-redux';

const Feedback = () => {
  const [formData, setFormData] = useState({
    productInfo: '',
    content: ''
  });
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await  createFeedbackProduct(dispatch, formData);
    
    setSubmitted(true);
    // Reset form sau 3 giây
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ productInfo: '', content: '' });
    }, 3000);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h3>Góp ý sản phẩm mới 🚀</h3>
        <p className="feedback-subtitle">Bạn muốn chúng mình review thêm sản phẩm nào? Hãy để lại tên hoặc link sản phẩm nhé!</p>
        
        {submitted ? (
          <div className="success-message">
            Cảm ơn bạn! Ý kiến đã được gửi đi thành công.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên hoặc Link sản phẩm</label>
              <input
                type="text"
                name="title"
                placeholder="Tên sản phẩm hoặc mã sản phẩm, hoặc link sản phẩm"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Lời nhắn (tùy chọn)</label>
              <textarea
                name="note"
                placeholder="Bạn có yêu cầu gì thêm về cấu hình hay màu sắc không?"
                value={formData.note}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <button type="submit" className="login-button">
              Gửi góp ý
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;