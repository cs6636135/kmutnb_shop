import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try { await login(f.username, f.password); nav("/admin/dashboard"); }
    catch { setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brick-600 p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6">
        <h1 className="text-center text-xl font-bold text-brick-700">เข้าสู่ระบบหลังบ้าน</h1>
        <input placeholder="ชื่อผู้ใช้" value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })}
          className="w-full rounded-xl border border-brick-200 px-4 py-3 outline-none focus:border-brick-500" />
        <input type="password" placeholder="รหัสผ่าน" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })}
          className="w-full rounded-xl border border-brick-200 px-4 py-3 outline-none focus:border-brick-500" />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button className="w-full rounded-xl bg-brick-600 py-3 font-bold text-white active:bg-brick-700">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
