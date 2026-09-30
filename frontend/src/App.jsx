import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Reservation from "./pages/Reservation.jsx";
import ReservationStatus from "./pages/ReservationStatus.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";

// โครงหน้าฝั่งลูกค้า: มีแถบเมนู + เว้นที่ด้านล่างให้แถบเมนูมือถือ
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-4 md:pb-8">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {

  return (
    <Routes>
      {/* ฝั่งลูกค้า ไม่ต้องล็อกอิน */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/status" element={<ReservationStatus />} />
      </Route>

      {/* ฝั่งหลังบ้าน: Admin และ Staff */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute><AdminDashboard /></ProtectedRoute>
      } />
      {/* หน้าที่เหลือทำตามแบบนี้ เช่น
          <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts/></ProtectedRoute>} />
          <Route path="/admin/stock" element={<ProtectedRoute><AdminStock/></ProtectedRoute>} /> */}
    </Routes>
    
  );
}
