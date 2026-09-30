import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import LocationCard from "../components/LocationCard.jsx";
import { api, toList } from "../services/api.js";
const API_URL = import.meta.env.VITE_API_URL; // ตัวแปรนี้จะได้ค่าเป็น "http://127.0.0.1:8000" ไว้ใช้เรียก API ของ Django

export default function Home() {
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.categories().then((d) => setCategories(toList(d))).catch(() => {});
    api.locations().then((d) => setLocations(toList(d))).catch(() => {});
  }, []);

  //test api back to front
   const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/test/`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => {
        console.error(error);
      });
   }, []);

  return (
    <div className="space-y-6">
      {/* ภาพมหาวิทยาลัย: วางไฟล์ที่ public/images/campus.jpg (ถ้ายังไม่มี จะเห็นเป็นสีส้มอิฐ) */}
      <section className="-mx-4 -mt-4 bg-brick-700 bg-cover bg-center px-4 pb-8 pt-8 text-white md:mx-0 md:mt-0 md:rounded-2xl"
        style={{ backgroundImage: "linear-gradient(rgba(154,58,25,.82),rgba(154,58,25,.82)), url(/images/campus.jpg)" }}>
        <h1 className="text-2xl font-bold">หาของที่ต้องการ ก่อนเดินไปซื้อ</h1>
        <p className="mb-4 mt-1 text-sm text-brick-100">ดูราคา จำนวนคงเหลือ และจองสินค้าภายในมหาวิทยาลัย</p>
        <SearchBar onSearch={(q) => nav(`/products?search=${encodeURIComponent(q)}`)} />
      </section>

      <section>
        <h2 className="mb-2 font-bold">หมวดหมู่</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.id} to={`/products?category=${c.id}`} className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-brick-200 active:bg-brick-100">{c.name}</Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-bold">จุดจำหน่าย</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {locations.map((l) => <LocationCard key={l.id} loc={l} />)}
        </div>
      </section>

      <Link to="/status" className="block rounded-2xl bg-brick-100 p-4 text-center font-medium text-brick-700">ตรวจสอบสถานะการจองของคุณ</Link>
      เทสๆๆ
      <div>
      {data && (
        <div>
          <p>{data.message}</p>
          <p>{data.status}</p>
        </div>
      )}
    </div>
    </div>
  );
}
