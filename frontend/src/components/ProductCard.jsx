import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <Link to={`/products/${p.id}`} className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brick-100 active:scale-[.99]">
      <div className="aspect-square bg-brick-100">
        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover" />}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 min-h-10 text-sm font-medium">{p.name}</p>
        <p className="mt-1 text-lg font-bold text-brick-600">{p.price} บาท</p>
        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${p.can_reserve ? "bg-brick-100 text-brick-700" : "bg-gray-100 text-gray-500"}`}>
          {p.can_reserve ? "รับจอง" : "ไม่รับจอง"}
        </span>
      </div>
    </Link>
  );
}
