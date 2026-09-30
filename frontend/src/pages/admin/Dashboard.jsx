import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

// เมนูหลังบ้าน: adminOnly = true จะโชว์เฉพาะแอดมิน
const menu = [
  { to: "/admin/stock", label: "Stock" },
  { to: "/admin/reservations", label: "รายการจอง" },
  { to: "/admin/products", label: "สินค้า", adminOnly: true },
  { to: "/admin/categories", label: "หมวดหมู่", adminOnly: true },
  { to: "/admin/locations", label: "สถานที่จำหน่าย", adminOnly: true },
  { to: "/admin/staff", label: "จัดการ Staff", adminOnly: true },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <header className="flex items-center justify-between rounded-2xl bg-brick-600 p-4 text-white">
        <div>
          <p className="font-bold">แดชบอร์ด</p>
          <p className="text-sm text-brick-100">{user.username} ({user.role === "admin" ? "แอดมิน" : "พนักงาน"})</p>
        </div>
        <button onClick={async () => { await logout(); nav("/admin/login"); }} className="rounded-lg bg-brick-700 px-3 py-2 text-sm">ออกจากระบบ</button>
      </header>

      {/* TODO: เรียก api.dashboard() แล้วแสดงตัวเลขรวมของทุกสถานที่ (Staff ดูได้อย่างเดียว) */}

      <nav className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {menu.filter((m) => !m.adminOnly || user.role === "admin").map((m) => (
          <Link key={m.to} to={m.to} className="rounded-2xl bg-white p-4 text-center font-medium ring-1 ring-brick-100 active:bg-brick-100">{m.label}</Link>
        ))}
      </nav>
    </div>
  );
}
