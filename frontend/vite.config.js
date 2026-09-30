import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // ตอนพัฒนา: ทุก request ที่ขึ้นต้นด้วย /api จะถูกส่งต่อไปที่ Django
    // ทำให้ไม่ต้องตั้ง CORS ตอนเทสในเครื่อง
    proxy: { "/api": "http://127.0.0.1:8000" },
  },
});
