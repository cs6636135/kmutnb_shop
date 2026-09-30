import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { api, toList } from "../services/api.js";

export default function Products() {
  const [params, setParams] = useSearchParams(); // เก็บคำค้น/หมวดไว้ใน URL กดย้อนกลับแล้วไม่หาย
  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.categories().then((d) => setCategories(toList(d))).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const q = {};
    if (search) q.search = search;
    if (category) q.category = category;
    api.products(q).then((d) => setItems(toList(d))).catch(() => setItems([])).finally(() => setLoading(false));
  }, [search, category]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };

  return (
    <div className="space-y-4">
      <SearchBar initial={search} onSearch={(q) => update("search", q)} />
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {[{ id: "", name: "ทั้งหมด" }, ...categories].map((c) => (
          <button key={c.id} onClick={() => update("category", c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm ${String(c.id) === category ? "bg-brick-600 text-white" : "bg-white ring-1 ring-brick-200"}`}>
            {c.name}
          </button>
        ))}
      </div>
      {loading ? <p className="py-10 text-center">กำลังโหลด...</p>
        : items.length === 0 ? <p className="py-10 text-center text-brick-900/60">ไม่พบสินค้าที่ค้นหา ลองใช้คำอื่นหรือเลือกหมวดหมู่ทั้งหมด</p>
        : <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
