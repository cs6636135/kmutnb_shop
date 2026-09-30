import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ReservationForm from "../components/ReservationForm.jsx";
import { api } from "../services/api.js";

export default function Reservation() {
  const [params] = useSearchParams(); // ได้ product และ location มาจากหน้ารายละเอียดสินค้า
  const productId = params.get("product");
  const locationId = Number(params.get("location"));
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // ผลการจองที่สำเร็จ

  useEffect(() => { if (productId) api.product(productId).then(setProduct).catch(() => setError("ไม่พบสินค้านี้")); }, [productId]);

  async function handleSubmit({ student_id, quantity }) {
    setSubmitting(true); setError("");
    try {
      // Django ส่งกลับ { code, expires_at, ... } หรือ error เช่น "จองค้างครบ 3 รายการแล้ว"
      setResult(await api.reserve({ student_id, product: Number(productId), location: locationId, quantity }));
    } catch (e) {
      setError(e.data?.detail || e.data?.non_field_errors?.[0] || e.message);
    } finally { setSubmitting(false); }
  }

  if (!productId) return <p className="py-10 text-center">กรุณาเลือกสินค้าที่ต้องการจองก่อน <Link to="/products" className="text-brick-600 underline">ไปหน้าสินค้า</Link></p>;
  if (!product) return <p className="py-10 text-center">{error || "กำลังโหลด..."}</p>;

  const stock = product.stocks.find((s) => s.location_id === locationId);

  if (result) return (
    <div className="space-y-3 rounded-2xl bg-white p-5 text-center ring-1 ring-brick-100">
      <p className="text-3xl">✅</p>
      <h1 className="text-lg font-bold">จองสำเร็จ</h1>
      <p className="text-sm">รหัสการจอง</p>
      <p className="rounded-xl bg-brick-100 py-3 text-3xl font-bold tracking-widest text-brick-700">{result.code}</p>
      <p className="text-sm">รับที่ {stock?.location_name} ก่อน {new Date(result.expires_at).toLocaleString("th-TH")}</p>
      <p className="text-sm text-brick-900/70">ชำระเงินที่หน้าร้านตอนรับสินค้า</p>
      <Link to="/status" className="block rounded-xl bg-brick-600 py-3 font-medium text-white">ดูสถานะการจอง</Link>
    </div>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">จองสินค้า</h1>
      <div className="rounded-2xl bg-white p-4 ring-1 ring-brick-100">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-brick-900/70">รับที่ {stock?.location_name} · เหลือ {stock?.quantity} ชิ้น</p>
      </div>
      <ReservationForm maxQty={stock?.quantity ?? 1} onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  );
}
