import { useState } from "react";

// ช่องค้นหา: พิมพ์แล้วกด Enter หรือปุ่มค้นหา จะเรียก onSearch(คำที่พิมพ์)
export default function SearchBar({ onSearch, initial = "" }) {
  const [text, setText] = useState(initial);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(text.trim()); }} className="flex gap-2">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="ค้นหาสินค้า เช่น สมุด เสื้อช็อป"
        className="min-w-0 flex-1 rounded-xl border border-brick-200 bg-white px-4 py-3 outline-none focus:border-brick-500 focus:ring-2 focus:ring-brick-200" />
      <button className="rounded-xl bg-brick-600 px-5 font-medium text-white active:bg-brick-700">ค้นหา</button>
    </form>
  );
}
