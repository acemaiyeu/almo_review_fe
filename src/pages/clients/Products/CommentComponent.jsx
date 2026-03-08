import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCommentsByProduct, postComment } from '../../../services/CommentService';
import '../../../style/CommentComponent.scss';

const CommentComponent = ({ product_id }) => {
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1 });
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    
    // FIX: Thêm các state bị thiếu
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyTarget, setReplyTarget] = useState(null); 

    useEffect(() => {
        if (product_id) loadComments(1, true);
    }, [product_id]);

    const loadComments = async (page = 1, isNew = false) => {
        setLoading(true);
        const res = await getCommentsByProduct(product_id, page);
        if (res && res.data) {
            setComments(isNew ? res.data : (prev) => [...prev, ...res.data]);
            if (res.meta?.pagination) setPagination(res.meta.pagination);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra điều kiện trước khi gửi
        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        const params = {
            product_id,
            content,
            parent_id: replyTarget?.id || null // Gửi kèm ID nếu là đang trả lời
        };

        const res = await postComment(dispatch, params);
        if (res) {
            setContent('');
            setReplyTarget(null);
            loadComments(1, true); // Load lại trang đầu để thấy cmt mới nhất
        }
        setIsSubmitting(false);
    };

    return (
        <div className="dmx-comment-wrapper">
            <h3 className="comment-title">Bình luận về sản phẩm</h3>
            
            <form className="comment-input-section" onSubmit={handleSubmit}>
                {replyTarget && (
                    <div className="reply-info">
                        Đang trả lời <b>{replyTarget.user_name}</b> 
                        <span onClick={() => setReplyTarget(null)}>(Hủy)</span>
                    </div>
                )}
                <textarea 
                    placeholder="Mời bạn để lại bình luận..." 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="btn-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'ĐANG GỬI...' : 'GỬI'}
                    </button>
                </div>
            </form>

            <div className="dmx-comment-list">
                {comments.map(comment => (
                    <div key={comment.id} className="dmx-item">
                        <div className="dmx-header">
                            <span className="name">{comment.user_name}</span>
                            <span className="time">{comment.created_at}</span>
                        </div>
                        
                        <div className="dmx-content">{comment.content}</div>

                        <div className="dmx-footer">
                            <button className="btn-reply" onClick={() => setReplyTarget(comment)}>
                                Trả lời
                            </button>
                        </div>

                        {/* Phản hồi từ Quản trị viên */}
                        {comment.replies?.data?.map(reply => (
                            <div key={reply.id} className="dmx-reply-box">
                                <div className="reply-header">
                                    <span className="admin-name">Bộ phận hỗ trợ</span>
                                    <span className="admin-badge">Quản trị viên</span>
                                </div>
                                <div className="reply-content">
                                    <p>{reply.content}</p>
                                </div>
                                <div className="reply-time">Trả lời lúc {reply.created_at}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {pagination.current_page < pagination.total_pages && (
                <div className="dmx-load-more">
                    <button onClick={() => loadComments(pagination.current_page + 1)} disabled={loading}>
                        {loading ? 'Đang tải...' : `Xem thêm bình luận`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentComponent;