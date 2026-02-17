import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép lắng nghe IP trong mạng LAN
    port: 5173,
    strictPort: true, // Nếu cổng 5173 bị chiếm, nó sẽ báo lỗi chứ không tự đổi sang cổng khác
    watch: {
      usePolling: true, // Windows 11 đôi khi cần cái này để nhận diện file thay đổi trên ổ đĩa
    }
  }
})