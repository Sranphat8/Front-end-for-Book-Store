import React from "react";

export default function StatCards({ stats }) {
  if (!stats) return null;
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="stat bg-base-100 rounded-2xl shadow">
        <div className="stat-title">รวมทั้งหมด</div>
        <div className="stat-value">{stats.total ?? "-"}</div>
      </div>
      <div className="stat bg-base-100 rounded-2xl shadow">
        <div className="stat-title">AVAILABLE</div>
        <div className="stat-value">{stats.byStatus?.AVAILABLE ?? "-"}</div>
      </div>
      <div className="stat bg-base-100 rounded-2xl shadow">
        <div className="stat-title">BORROWED</div>
        <div className="stat-value">{stats.byStatus?.BORROWED ?? "-"}</div>
      </div>
      <div className="stat bg-base-100 rounded-2xl shadow">
        <div className="stat-title">RESERVED</div>
        <div className="stat-value">{stats.byStatus?.RESERVED ?? "-"}</div>
      </div>
    </div>
  );
}
