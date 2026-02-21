// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // Cho phép lắng nghe IP trong mạng LAN
//     port: 5173,
//     open: false,
//     strictPort: true, // Nếu cổng 5173 bị chiếm, nó sẽ báo lỗi chứ không tự đổi sang cổng khác
//     watch: {
//       usePolling: true, // Windows 11 đôi khi cần cái này để nhận diện file thay đổi trên ổ đĩa
//     },
//     headers: {
//       "X-Content-Type-Options": "nosniff",
//       "X-Frame-Options": "SAMEORIGIN",
//       "Content-Security-Policy": 
//         "default-src 'self'; " +
//         // Cho phép chạy script từ chính mình và cho phép inline script (cần thiết cho Vite/React dev)
//         "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
//         // Cho phép tải CSS từ chính mình, từ jsdelivr và cho phép style inline (React-Toastify cần cái này)
//         "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
//         // Cho phép tải Font từ jsdelivr
//         "font-src 'self' https://cdn.jsdelivr.net; " +
//         // Cho phép hiển thị ảnh từ mọi nguồn https (nếu cần) hoặc giới hạn lại 'self'
//         "img-src 'self' data: https:; " +
//         // Cho phép kết nối API đến chính mình và API backend của bạn
//        "connect-src 'self' * ws: http: https: data: blob:;"
//         // "connect-src 'self' https://almobe.io.vn ws://localhost:5173 ;"
//     },
//   },
//   build: {
//     sourcemap: false, // Tắt hoàn toàn bản đồ nguồn
//     minify: 'terser', // Sử dụng terser để nén code cực mạnh
//     terserOptions: {
//       compress: {
//         drop_console: true, // Tự động xóa sạch console.log khi build production
//         drop_debugger: true,
//       },
//     },
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
        "font-src 'self' https://cdn.jsdelivr.net",
        "img-src 'self' data: https:",
        // Cấu hình nới lỏng cho connect-src để fix lỗi blocked:csp local
        "connect-src 'self' * ws: http: https: data: blob:"
      ].join('; ') // Tự động nối các dòng bằng dấu "; " để tránh sai sót
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})