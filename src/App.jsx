import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/clients/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/orders" element={<div>Trang lịch sử đơn hàng</div>} />
          <Route path="/search" element={<div>Trang kết quả tìm kiếm</div>} />
          {/* Trang 404 nếu không tìm thấy route */}
          <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
      </div>
    </>
  )
}

export default App
