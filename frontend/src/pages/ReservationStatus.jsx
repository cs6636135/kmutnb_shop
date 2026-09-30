import { useState } from "react";
import StatusBadge from "../components/StatusBadge.jsx";
import { api, toList } from "../services/api.js";

// ดูอย่างเดียว ไม่มีปุ่มยกเลิก (ยกเลิกได้ที่เจ้าหน้าที่) และไม่แสดงชื่อผู้จอง
export default function ReservationStatus() {
  const [studentId, setStudentId] = useState("");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");

  async function search(e) {
    e.preventDefault();
    if (!/^\d{13}$/.test(studentId)) return setError("รหัสนักศึกษาต้องเป็นตัวเลข 13 หลัก");
    setError("");
    try { setRows(toList(await api.lookup(studentId))); } catch (err) { setError(err.message); }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">ตรวจสอบการจอง</h1>
      <form onSubmit={search} className="flex gap-2">
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} inputMode="numeric" maxLength={13} placeholder="รหัสนักศึกษา"
          className="min-w-0 flex-1 rounded-xl border border-brick-200 bg-white px-4 py-3 outline-none focus:border-brick-500 focus:ring-2 focus:ring-brick-200" />
        <button className="rounded-xl bg-brick-600 px-5 font-medium text-white active:bg-brick-700">ค้นหา</button>
      </form>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {rows && rows.length === 0 && <p className="py-6 text-center text-brick-900/60">ยังไม่มีรายการจองของรหัสนี้</p>}
      <ul className="space-y-3">
        {rows?.map((r) => (
          <li key={r.code} className="space-y-1 rounded-2xl bg-white p-4 ring-1 ring-brick-100">
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-wider text-brick-700">{r.code}</span>
              <StatusBadge status={r.status} />
            </div>
            <p className="text-sm">{r.product_name} × {r.quantity}</p>
            <p className="text-sm text-brick-900/70">รับที่ {r.location_name}</p>
            <p className="text-xs text-brick-900/60">หมดอายุ {new Date(r.expires_at).toLocaleString("th-TH")}</p>
          </li>
        ))}
      </ul>
      {rows?.length > 0 && <p className="text-xs text-brick-900/60">ต้องการยกเลิกการจอง ติดต่อเจ้าหน้าที่ที่จุดจำหน่าย</p>}
    </div>
  );
}
