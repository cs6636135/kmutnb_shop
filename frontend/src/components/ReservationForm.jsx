import { useState } from "react";

const MAX_PER_RESERVATION = 5; // ต้องตรงกับที่ Django จำกัดไว้

// ฟอร์มจอง: กรอกรหัสนักศึกษา + จำนวน  maxQty = จำนวนที่จองได้จริง (ไม่เกิน Stock และไม่เกิน 5)
export default function ReservationForm({ maxQty, onSubmit, submitting, error }) {
  const [studentId, setStudentId] = useState("");
  const [qty, setQty] = useState(1);
  const [localError, setLocalError] = useState("");
  const limit = Math.min(maxQty, MAX_PER_RESERVATION);

  function handleSubmit(e) {
    e.preventDefault();
    // ตรวจเบื้องต้นฝั่งหน้าเว็บ (Django จะตรวจซ้ำอีกรอบเสมอ)
    if (!/^\d{13}$/.test(studentId)) return setLocalError("รหัสนักศึกษาต้องเป็นตัวเลข 13 หลัก");
    setLocalError("");
    onSubmit({ student_id: studentId, quantity: qty });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">รหัสนักศึกษา</span>
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} inputMode="numeric" maxLength={13}
          className="mt-1 w-full rounded-xl border border-brick-200 bg-white px-4 py-3 outline-none focus:border-brick-500 focus:ring-2 focus:ring-brick-200" />
      </label>
      <div>
        <span className="text-sm font-medium">จำนวน (สูงสุด {limit} ชิ้น)</span>
        <div className="mt-1 flex items-center gap-4">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 rounded-full bg-brick-100 text-xl">−</button>
          <span className="w-8 text-center text-lg font-bold">{qty}</span>
          <button type="button" onClick={() => setQty(Math.min(limit, qty + 1))} className="h-11 w-11 rounded-full bg-brick-100 text-xl">+</button>
        </div>
      </div>
      {(localError || error) && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{localError || error}</p>}
      <button disabled={submitting} className="w-full rounded-xl bg-brick-600 py-3 font-bold text-white active:bg-brick-700 disabled:opacity-50">
        {submitting ? "กำลังจอง..." : "ยืนยันการจอง"}
      </button>
    </form>
  );
}
