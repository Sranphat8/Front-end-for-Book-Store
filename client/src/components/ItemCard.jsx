import React from "react";
import { BookOpenText, BookCopy, FileText, Palette, User, Calendar } from "lucide-react";

/** ไอคอนตามชนิด */
const typeIcon = (t) => {
  if (t === "Book") return <BookOpenText className="h-4 w-4" />;
  if (t === "Journal") return <FileText className="h-4 w-4" />;
  return <Palette className="h-4 w-4" />;
};

/** สีริบบิ้นสถานะ */
const statusClass = (s = "AVAILABLE") => {
  switch (s) {
    case "AVAILABLE":
      return "badge-success";
    case "BORROWED":
      return "badge-warning";
    case "RESERVED":
      return "badge-info";
    case "MAINTENANCE":
      return "badge-neutral";
    case "LOST":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export default function ItemCard({ item, onView }) {
  return (
    <div className="group card bg-base-100 border border-base-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* รูปปกแบบแนวตั้ง (3:4 แต่เตี้ยลงนิดหน่อย) */}
      <figure className="relative w-full aspect-[3/3] overflow-hidden bg-base-200">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center opacity-50">
            <BookCopy className="h-8 w-8" />
            <span className="text-xs">ไม่มีภาพปก</span>
          </div>
        )}

        {/* ป้ายสถานะ */}
        <div className="absolute right-2 top-2">
          <div className={`badge ${statusClass(item.status)} text-xs px-2 py-1`}>
            {item.status}
          </div>
        </div>

        {/* ป้ายชนิด */}
        <div className="absolute left-2 top-2">
          <div className="badge badge-outline bg-base-100/80 gap-1 text-xs">
            {typeIcon(item.itemType)}
            <span>{item.itemType}</span>
          </div>
        </div>
      </figure>

      {/* เนื้อหา */}
      <div className="card-body px-3 py-3">
        <h3
          title={item.title}
          className="font-semibold text-sm leading-snug line-clamp-2 hover:underline"
        >
          {item.title}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2 min-h-[2rem]">
          {item.description || "—"}
        </p>

        {/* ผู้แต่ง/ปี */}
        <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
          <div className="flex items-center gap-1 truncate max-w-[70%]">
            <User className="h-3 w-3 shrink-0" />
            <span title={item.author}>{item.author || "—"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>{item.publishYear || "—"}</span>
          </div>
        </div>

        {/* เส้นคั่นบาง */}
        <div className="divider my-2" />

        {/* ส่วนท้าย */}
        <div className="flex justify-between items-center text-[11px] opacity-70">
          <span className="truncate">
            {item.publisher
              ? `สำนักพิมพ์: ${item.publisher}`
              : item.language
              ? `Language: ${item.language}`
              : ""}
          </span>
          <button
            className="btn btn-xs btn-primary"
            onClick={() => onView(item)}
          >
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </div>
  );
}
