import React from "react";

export default function Pagination({ page, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div className="join justify-center">
      <button className="join-item btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        «
      </button>
      <button className="join-item btn btn-ghost">หน้า {page} / {totalPages}</button>
      <button
        className="join-item btn"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        »
      </button>
    </div>
  );
}
