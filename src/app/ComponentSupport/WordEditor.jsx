import React, { Component, createRef } from 'react';
import Quill from 'quill';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css'; // Giao diện chuẩn

// Bảng HTML mẫu chuẩn kiểu thông số kỹ thuật điện thoại
const DEFAULT_SPEC_TABLE = ``;

class WordEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = createRef();
    this.quill = null;
    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    if (this.editorRef.current) {
      this.quill = new Quill(this.editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        },
        placeholder: 'Bắt đầu soạn thảo văn bản...'
      });

      // Kiểm tra nếu props.content rỗng/không có thì dùng bảng thông số mặc định
      const initialContent = (this.props.content && this.props.content.trim() !== '') 
        ? this.props.content 
        : DEFAULT_SPEC_TABLE;

      // Đưa nội dung vào Quill
      this.quill.root.innerHTML = initialContent;
      
      // Cập nhật state ban đầu
      this.setState({ content: initialContent });
      if (this.props.getDataWord) {
        this.props.getDataWord(initialContent);
      }

      // Lắng nghe sự kiện thay đổi
      this.quill.on('text-change', () => {
        const html = this.quill.root.innerHTML;
        this.setState({ content: html });

        if (this.props.onChange) {
          this.props.onChange(html);
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Sửa lỗi: so sánh prevState với this.state hiện tại
    if (prevState.content !== this.state.content) {
      if (typeof this.props.getDataWord === 'function') {
        this.props.getDataWord(this.state.content);
      }
    }
  }

  handleSave = () => {
    const cleanHTML = DOMPurify.sanitize(this.state.content);
    console.log("HTML an toàn để lưu:", cleanHTML);
    alert("Đã lưu HTML! Kiểm tra Console.");
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "bold" }}></h2> 
        <div style={{ marginBottom: "20px" }}>
          <div ref={this.editorRef} style={{ height: "300px" }} />
        </div>
      </div>
    );
  }
}

export default WordEditor;