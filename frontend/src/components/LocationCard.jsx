export default function LocationCard({ loc }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-brick-100">
      <p className="font-bold">📍 {loc.name}</p>
      {loc.detail && <p className="mt-1 text-sm text-brick-900/70">{loc.detail}</p>}
    </div>
  );
}
