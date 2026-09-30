// ป้ายสถานะการจอง (ค่าต้องตรงกับที่ Django ส่งมา)
const map = {
  PENDING: ["รอรับสินค้า", "bg-yellow-100 text-yellow-800"],
  COMPLETED: ["รับสินค้าแล้ว", "bg-green-100 text-green-800"],
  CANCELLED: ["ยกเลิก", "bg-gray-200 text-gray-700"],
  EXPIRED: ["หมดอายุ", "bg-red-100 text-red-700"],
};

export default function StatusBadge({ status }) {
  const [label, color] = map[status] ?? [status, "bg-gray-100 text-gray-700"];
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${color}`}>{label}</span>;
}
