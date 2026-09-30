# KMUTNB Shop (Frontend)

## เริ่มใช้งาน
    npm install
    npm run dev          # เปิด http://localhost:5173 (ต้องเปิด Django ที่พอร์ต 8000 ไว้ด้วย)

## รูปที่ต้องวางเอง (public/images/)
- kmutnb-logo.png  โลโก้มหาวิทยาลัย
- campus.jpg       ภาพมหาวิทยาลัย (ใช้เป็นพื้นหลังหน้าแรก)

## สิ่งที่ Django ต้องทำให้ตรงกับหน้าบ้าน
- ล็อกอิน: POST /api/auth/login/ -> { token, user: { username, role, location } }
- ใช้ TokenAuthentication: หน้าบ้านส่ง header  Authorization: Token <token>
- product detail ต้องมี stocks: [{ location_id, location_name, quantity }]
- reservation ต้องมี code, status, product_name, location_name, quantity, expires_at
- status: PENDING / COMPLETED / CANCELLED / EXPIRED
- ตอน deploy จริง (ไม่ใช้ proxy) ให้ติดตั้ง django-cors-headers แล้วอนุญาต URL ของหน้าบ้าน
