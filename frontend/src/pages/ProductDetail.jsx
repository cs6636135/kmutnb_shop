import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api.js";

// ข้อมูลที่คาดว่า Django ส่งมา:
// { id, name, description, price, image, category_name, can_reserve,
//   stocks: [{ location_id, location_name, quantity }] }
export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { api.product(id).then(setP).catch(() => setError("ไม่พบสินค้านี้")); }, [id]);

  if (error) return <p className="py-10 text-center">{error}</p>;
  if (!p) return <p className="py-10 text-center">กำลังโหลด...</p>;

  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      <div className="aspect-square overflow-hidden rounded-2xl bg-brick-100">
        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-brick-900/60">{p.category_name}</p>
          <h1 className="text-xl font-bold">{p.name}</h1>
          <p className="text-2xl font-bold text-brick-600">{p.price} บาท</p>
          <p className="mt-2 text-sm">{p.description}</p>
        </div>

        <div>
          <h2 className="mb-2 font-bold">จำนวนคงเหลือแต่ละจุดจำหน่าย</h2>
          {!p.can_reserve && <p className="mb-2 rounded-xl bg-gray-100 p-3 text-sm">สินค้านี้ไม่รับจอง ให้ไปซื้อที่หน้าร้านได้เลย</p>}
          <ul className="space-y-2">
            {p.stocks.map((s) => (
              <li key={s.location_id} className="flex items-center justify-between rounded-2xl bg-white p-3 ring-1 ring-brick-100">
                <div>
                  <p className="font-medium">{s.location_name}</p>
                  <p className={`text-sm ${s.quantity > 0 ? "text-green-700" : "text-red-600"}`}>
                    {s.quantity > 0 ? `เหลือ ${s.quantity} ชิ้น` : "สินค้าหมด"}
                  </p>
                </div>
                {p.can_reserve && s.quantity > 0 && (
                  <Link to={`/reservation?product=${p.id}&location=${s.location_id}`}
                    className="rounded-xl bg-brick-600 px-4 py-2 text-sm font-medium text-white active:bg-brick-700">จอง</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
