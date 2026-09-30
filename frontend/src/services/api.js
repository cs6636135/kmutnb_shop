// ตัวกลางคุยกับ Django ทั้งหมดอยู่ที่ไฟล์นี้
// ถ้า backend เปลี่ยน URL แก้ที่นี่ที่เดียว
const BASE = "/api"; // ตอน deploy ค่อยเปลี่ยนเป็น URL เต็มของ Django

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // ถ้าล็อกอินอยู่ ให้แนบ token ไปด้วยทุกครั้ง (Django REST Framework TokenAuth)
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.detail || "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    err.status = res.status; // 401 = ยังไม่ล็อกอิน, 403 = ไม่มีสิทธิ์
    err.data = data;
    throw err;
  }
  return data;
}

// ถ้า Django เปิด pagination ข้อมูลจะมาเป็น { results: [...] } ฟังก์ชันนี้ช่วยแกะให้
export const toList = (d) => (Array.isArray(d) ? d : d?.results ?? []);
const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });

export const api = {
  // ฝั่งลูกค้า
  products: (params = {}) => request(`/products/?${new URLSearchParams(params)}`),
  product: (id) => request(`/products/${id}/`),
  categories: () => request("/categories/"),
  locations: () => request("/locations/"),
  reserve: (body) => post("/reservations/", body),
  lookup: (studentId) => request(`/reservations/lookup/?student_id=${studentId}`),
  // ล็อกอิน
  login: (body) => post("/auth/login/", body),
  logout: () => post("/auth/logout/", {}),
  me: () => request("/auth/me/"),
  // หลังบ้าน
  dashboard: () => request("/admin/dashboard/"),
  admin: {
    list: (name, params = "") => request(`/admin/${name}/${params}`),
    create: (name, body) => post(`/admin/${name}/`, body),
    update: (name, id, body) =>
      request(`/admin/${name}/${id}/`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (name, id) => request(`/admin/${name}/${id}/`, { method: "DELETE" }),
    setReservationStatus: (id, status) =>
      request(`/admin/reservations/${id}/status/`, { method: "PATCH", body: JSON.stringify({ status }) }),
  },
};
