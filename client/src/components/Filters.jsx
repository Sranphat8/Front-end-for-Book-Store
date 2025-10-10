import React from "react";

export default function Filters({ value, onChange, onSubmit, loading }) {
  const set = (k, v) => onChange({ ...value, [k]: v });

  // ตัวเลือก
  const itemTypes = [
    { label: "หนังสือ (Book)", value: "Book" },
    { label: "วารสาร (Journal)", value: "Journal" },
    { label: "การ์ตูน (Comic)", value: "Comic" },
  ];

  const categories = ["E-book", "นวนิยาย", "นิยายรายตอน", "สารคดี", "ทั่วไป"];

  // สำหรับผู้ใช้ทั่วไป: โชว์เฉพาะสถานะที่เกี่ยว (ให้ยืม / ถูกยืมอยู่)
  const statuses = [
    { label: "พร้อมให้ยืม", value: "AVAILABLE" },
    { label: "ถูกยืมอยู่", value: "BORROWED" },
  ];

  const handleCheckbox = (key, val) => {
    const current = value[key] ? value[key].split(",") : [];
    const newSet = current.includes(val)
      ? current.filter((x) => x !== val)
      : [...current, val];
    set(key, newSet.join(","));
  };

  const handleOnlyAvailable = (checked) => {
    if (checked) {
      set("status", "AVAILABLE");
    } else {
      // เอา AVAILABLE ออก ถ้าเหลือค่าว่างให้เคลียร์
      const arr = (value.status || "").split(",").filter(Boolean).filter((s) => s !== "AVAILABLE");
      set("status", arr.join(","));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-base-100 border rounded-2xl p-4 w-full md:w-72 sticky top-24"
    >
      <h2 className="text-lg font-semibold mb-3">ตั้งค่าการค้นหา</h2>

      {/* ค้นหาด้วยไอดี (รายการเดียวเร็วสุด) */}
      <div className="form-control mb-3">
        <label className="label">
          <span className="label-text">ค้นหาด้วยไอดี (Item ID)</span>
        </label>
        <input
          className="input input-bordered"
          placeholder="เช่น 7f8c1a23..."
          value={value.itemId || ""}
          onChange={(e) => set("itemId", e.target.value.trim())}
        />
        <span className="mt-1 text-xs opacity-60">
          ใส่ไอดีตรงนี้จะค้นหารายการเดียวแบบรวดเร็ว (ถ้ารู้ชนิด เลือกด้านล่างด้วย)
        </span>
      </div>

      {/* ค้นหาทั่วไป */}
      <div className="form-control mb-3">
        <label className="label">
          <span className="label-text">คำค้น (ชื่อ/ผู้แต่ง)</span>
        </label>
        <input
          className="input input-bordered"
          placeholder="พิมพ์ชื่อเรื่อง / ผู้แต่ง / คำค้นหา"
          value={value.q || ""}
          onChange={(e) => set("q", e.target.value)}
        />
      </div>

      {/* จำนวนที่แสดงต่อหน้า */}
      <div className="collapse collapse-arrow border border-base-200 bg-base-100 mb-2 rounded-lg">
        <input type="checkbox" />
        <div className="collapse-title text-md font-medium">จำนวนที่แสดงผล</div>
        <div className="collapse-content">
          <select
            className="select select-bordered w-full"
            value={value.limit || 12}
            onChange={(e) => onChange({ ...value, limit: Number(e.target.value) })}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      {/* หมวดหมู่สินค้า */}
      <div className="collapse collapse-arrow border border-base-200 bg-base-100 mb-2 rounded-lg">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-md font-medium">หมวดหมู่สินค้า</div>
        <div className="collapse-content space-y-1">
          {itemTypes.map((it) => (
            <label key={it.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="itemType"
                className="radio radio-sm"
                value={it.value}
                checked={value.itemType === it.value}
                onChange={(e) => set("itemType", e.target.value)}
              />
              <span>{it.label}</span>
            </label>
          ))}
          <button
            type="button"
            onClick={() => set("itemType", "")}
            className="btn btn-xs btn-ghost mt-1"
          >
            ล้างหมวด
          </button>
        </div>
      </div>

      {/* ประเภทหนังสือ */}
      <div className="collapse collapse-arrow border border-base-200 bg-base-100 mb-2 rounded-lg">
        <input type="checkbox" />
        <div className="collapse-title text-md font-medium">ประเภทหนังสือ</div>
        <div className="collapse-content space-y-1">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={(value.category || "").split(",").includes(cat)}
                onChange={() => handleCheckbox("category", cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* สถานะ */}
      <div className="collapse collapse-arrow border border-base-200 bg-base-100 mb-2 rounded-lg">
        <input type="checkbox" />
        <div className="collapse-title text-md font-medium">สถานะ</div>
        <div className="collapse-content space-y-1">
          {/* toggle แสดงเฉพาะที่ยืมได้ */}
          <label className="flex items-center gap-2 cursor-pointer mb-1">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={(value.status || "").split(",").includes("AVAILABLE")}
              onChange={(e) => handleOnlyAvailable(e.target.checked)}
            />
            <span>แสดงเฉพาะที่ยืมได้</span>
          </label>
          {statuses.map((st) => (
            <label key={st.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={(value.status || "").split(",").includes(st.value)}
                onChange={() => handleCheckbox("status", st.value)}
              />
              <span>{st.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
        {loading ? <span className="loading loading-spinner" /> : "ค้นหา"}
      </button>
    </form>
  );
}
