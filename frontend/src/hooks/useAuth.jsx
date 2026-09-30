import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(null);

// เก็บว่าใครล็อกอินอยู่: user = { username, role: "admin" | "staff", location }
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem("token"));

  // เปิดเว็บใหม่ ถ้ามี token เก่าอยู่ ให้ถาม Django ว่ายังใช้ได้ไหม
  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    api.me().then(setUser).catch(() => localStorage.removeItem("token")).finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    const data = await api.login({ username, password }); // ได้ { token, user }
    localStorage.setItem("token", data.token);
    setUser(data.user);
  }

  async function logout() {
    try { await api.logout(); } catch { /* ออกจากระบบฝั่งเราต่อให้ Django ตอบผิดพลาด */ }
    localStorage.removeItem("token");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
