import React from "react";
import { Layers, PieChart, Hash } from "lucide-react";

/** แปลงชื่อ key เป็นหัวข้ออ่านง่าย */
const pretty = (k = "") =>
  k
    .replace(/^by/i, "By ")
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

/** การ์ดเดี่ยวแสดงตัวเลข */
function StatCard({ title, value, icon }) {
  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body py-4 px-5">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">{title}</div>
          <div className="opacity-50">{icon || <Hash className="h-4 w-4" />}</div>
        </div>
        <div className="text-2xl font-bold">{value ?? "—"}</div>
      </div>
    </div>
  );
}

/** กล่องหัวข้อ+กริดการ์ด */
function StatGroup({ title, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <PieChart className="h-4 w-4 opacity-60" />
        <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">{title}</h3>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
}

/** แตก Object เป็นการ์ดย่อย (เช่น byStatus, byType, …) */
const renderObjectStats = (obj = {}) =>
  Object.entries(obj).map(([k, v]) => (
    <StatCard key={k} title={pretty(k)} value={typeof v === "number" ? v : JSON.stringify(v)} />
  ));

/** เรนเดอร์สถิติแบบอัตโนมัติจาก payload */
function AutoStats({ payload = {}, titlePrefix = "" }) {
  if (!payload || typeof payload !== "object" || !Object.keys(payload).length) {
    return null;
  }

  const numeric = Object.entries(payload).filter(
    ([, v]) => typeof v === "number"
  );
  const objects = Object.entries(payload).filter(
    ([, v]) => v && typeof v === "object" && !Array.isArray(v)
  );

  return (
    <div className="space-y-4">
      {/* Numeric (เช่น total, booksCount ฯลฯ) */}
      {numeric.length > 0 && (
        <StatGroup title={`${titlePrefix}Summary`}>
          {numeric.map(([k, v]) => (
            <StatCard
              key={k}
              title={pretty(k)}
              value={v}
              icon={<Layers className="h-4 w-4 opacity-60" />}
            />
          ))}
        </StatGroup>
      )}

      {/* Objects (เช่น byStatus, byType, byLanguage, …) */}
      {objects.map(([k, v]) => (
        <StatGroup key={k} title={`${titlePrefix}${pretty(k)}`}>
          {renderObjectStats(v)}
        </StatGroup>
      ))}
    </div>
  );
}

export default function SmartStatCards({ statsAll = {}, statsSpec = {} }) {
  // หมายเหตุ:
  // - ถ้า API มี key ใด ๆ เพิ่มเข้ามา เช่น byLanguage, byYear, byCategoryTop
  //   คอมโพเนนต์นี้จะโชว์ให้ทันทีโดยไม่ต้องแตะโค้ดอีก
  return (
    <div className="grid gap-6">
      <AutoStats payload={statsAll} titlePrefix="All · " />
      <AutoStats payload={statsSpec} titlePrefix="Current Tab · " />
    </div>
  );
}