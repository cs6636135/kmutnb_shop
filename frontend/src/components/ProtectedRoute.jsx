import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

// ครอบหน้าหลังบ้าน  adminOnly = true หมายถึงหน้านี้ให้เฉพาะแอดมิน
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="p-6 text-center">กำลังตรวจสอบ...</p>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/admin/dashboard" replace />;
  return children;
}
