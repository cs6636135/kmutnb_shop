import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/", label: "หน้าแรก", icon: "🏠" },
  { to: "/products", label: "สินค้า", icon: "🛍️" },
  { to: "/status", label: "ตรวจสอบการจอง", icon: "🧾" },
];

export default function Navbar() {
  return (
    <>
      {/* แถบบน: โลโก้ + ชื่อ (บนจอใหญ่มีเมนูอยู่ตรงนี้ด้วย) */}
      <header className="sticky top-0 z-20 bg-brick-600 text-white shadow">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            {/* วางไฟล์โลโก้มหาวิทยาลัยที่ public/images/kmutnb-logo.png */}
            <img src="/images/kmutnb-logo.png" alt="โลโก้ มจพ." className="h-9 w-9 rounded-full bg-white object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")} />
            <span className="text-lg font-bold leading-tight">KMUTNB Shop</span>
          </Link>
          <nav className="ml-auto hidden gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) => `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-brick-700" : "hover:bg-brick-500"}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* แถบล่างสำหรับมือถือ: กดง่ายด้วยนิ้วโป้ง */}
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-brick-200 bg-white md:hidden">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"}
            className={({ isActive }) => `flex flex-col items-center py-2 text-xs ${isActive ? "font-bold text-brick-600" : "text-brick-900/60"}`}>
            <span className="text-xl">{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
