import React, { useEffect, useMemo, useState } from "react";
import { Book, Files, PanelsTopLeft, Eye, Pencil, Trash2, Plus, RefreshCcw } from "lucide-react";
import SmartStatCards from "../components/SmartStatCards.jsx";
import { booksService } from "../services/Books.service.js";
import { journalsService } from "../services/Journals.service.js";
import { comicsService } from "../services/Comics.service.js";
import { itemsService } from "../services/Item.service.js";
import { confirm, toastERR, toastOK } from "../components/ConfirmDialog.jsx";



const TABS = [
  { key: "books", label: "Books", icon: <Book className="h-4 w-4" /> },
  { key: "journals", label: "Journals", icon: <Files className="h-4 w-4" /> },
  { key: "comics", label: "Comics", icon: <PanelsTopLeft className="h-4 w-4" /> },
];

const STATUS = ["AVAILABLE", "BORROWED", "RESERVED", "MAINTENANCE", "LOST"];
const tab2type = { books: "Book", journals: "Journal", comics: "Comic" };
const svcMap = { books: booksService, journals: journalsService, comics: comicsService };
const typeOptions = ["Book", "Journal", "Comic"];

const Badge = ({ s }) => {
  const c =
    s === "AVAILABLE" ? "badge-success" :
    s === "BORROWED" ? "badge-warning" :
    s === "RESERVED" ? "badge-info" :
    s === "MAINTENANCE" ? "badge-neutral" : "badge-error";
  return <div className={`badge ${c}`}>{s}</div>;
};

function SectionTitle({ children }) {
  return <h4 className="text-sm font-semibold uppercase tracking-wide opacity-70">{children}</h4>;
}

function Field({ label, hint, children, className = "" }) {
  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
      {hint ? <span className="mt-1 text-xs opacity-60">{hint}</span> : null}
    </div>
  );
}

function TypeFields({ type, form, setForm }) {
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  if (type === "Book") {
    return (
      <>
        <SectionTitle>Book specific</SectionTitle>
        <div className="grid md:grid-cols-3 gap-3">
          <Field label="ISBN">
            <input
              className="input input-bordered input-sm"
              value={form.isbn || ""}
              onChange={(e) => set("isbn", e.target.value)}
              placeholder="เช่น 978-6-1612-3456-7"
            />
          </Field>
          <Field label="Publisher">
            <input
              className="input input-bordered input-sm"
              value={form.publisher || ""}
              onChange={(e) => set("publisher", e.target.value)}
              placeholder="เช่น Amarin / Developer Press"
            />
          </Field>
          <Field label="Language">
            <input
              className="input input-bordered input-sm"
              value={form.language || ""}
              onChange={(e) => set("language", e.target.value)}
              placeholder="เช่น Thai / English"
            />
          </Field>
          <Field label="Edition">
            <input
              className="input input-bordered input-sm"
              value={form.edition || ""}
              onChange={(e) => set("edition", e.target.value)}
              placeholder="เช่น 2nd Edition"
            />
          </Field>
          <Field label="Page Count">
            <input
              type="number"
              className="input input-bordered input-sm"
              value={form.pageCount || ""}
              onChange={(e) => set("pageCount", +e.target.value || "")}
              placeholder="เช่น 320"
            />
          </Field>
          <Field label="Genre">
            <input
              className="input input-bordered input-sm"
              value={form.genre || ""}
              onChange={(e) => set("genre", e.target.value)}
              placeholder="เช่น Programming / Mindset"
            />
          </Field>
        </div>
      </>
    );
  }

  if (type === "Journal") {
    return (
      <>
        <SectionTitle>Journal specific</SectionTitle>
        <div className="grid md:grid-cols-3 gap-3">
          <Field label="ISSN">
            <input
              className="input input-bordered input-sm"
              value={form.issn || ""}
              onChange={(e) => set("issn", e.target.value)}
              placeholder="เช่น 1234-5678"
            />
          </Field>
          <Field label="Volume">
            <input
              className="input input-bordered input-sm"
              value={form.volume || ""}
              onChange={(e) => set("volume", e.target.value)}
              placeholder="เช่น Vol. 12"
            />
          </Field>
          <Field label="Issue">
            <input
              className="input input-bordered input-sm"
              value={form.issue || ""}
              onChange={(e) => set("issue", e.target.value)}
              placeholder="เช่น Issue 3"
            />
          </Field>
          <Field label="Publication Frequency">
            <select
              className="select select-bordered select-sm"
              value={form.publicationFrequency || ""}
              onChange={(e) => set("publicationFrequency", e.target.value)}
            >
              <option value="">— เลือกความถี่ —</option>
              <option>DAILY</option><option>WEEKLY</option><option>MONTHLY</option><option>QUARTERLY</option>
              <option>BIANNUALLY</option><option>ANNUALLY</option><option>IRREGULAR</option>
            </select>
          </Field>
          <Field label="Publisher">
            <input
              className="input input-bordered input-sm"
              value={form.publisher || ""}
              onChange={(e) => set("publisher", e.target.value)}
              placeholder="เช่น Academic Press"
            />
          </Field>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionTitle>Comic specific</SectionTitle>
      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Series">
          <input
            className="input input-bordered input-sm"
            value={form.series || ""}
            onChange={(e) => set("series", e.target.value)}
            placeholder="เช่น One Piece"
          />
        </Field>
        <Field label="Volume Number">
          <input
            type="number"
            className="input input-bordered input-sm"
            value={form.volumeNumber || ""}
            onChange={(e) => set("volumeNumber", +e.target.value || "")}
            placeholder="เช่น 1"
          />
        </Field>
        <Field label="Illustrator">
          <input
            className="input input-bordered input-sm"
            value={form.illustrator || ""}
            onChange={(e) => set("illustrator", e.target.value)}
            placeholder="เช่น Eiichiro Oda"
          />
        </Field>
        <Field label="Color Type">
          <select
            className="select select-bordered select-sm"
            value={form.colorType || ""}
            onChange={(e) => set("colorType", e.target.value)}
          >
            <option value="">— เลือกชนิดสี —</option>
            <option>FULL_COLOR</option>
            <option>BLACK_WHITE</option>
          </select>
        </Field>
        <Field label="Target Age">
          <select
            className="select select-bordered select-sm"
            value={form.targetAge || ""}
            onChange={(e) => set("targetAge", e.target.value)}
          >
            <option value="">— เลือกช่วงอายุ —</option>
            <option>ALL_AGES</option><option>CHILDREN</option><option>TEEN</option>
            <option>YOUNG_ADULT</option><option>ADULT</option><option>MATURE</option>
          </select>
        </Field>
      </div>
    </>
  );
}

function ItemForm({ mode, form, setForm, type, setType, onSubmit, onCancel, showStatus }) {
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left: preview */}
      <aside className="lg:col-span-1">
        <div className="card bg-base-100 border border-base-200">
          <div className="card-body gap-3">
            <SectionTitle>Cover preview</SectionTitle>
            <div className="rounded-xl overflow-hidden bg-base-200 aspect-[3/4]">
              {form.coverImage ? (
                <img src={form.coverImage} alt="cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-50 text-sm">No cover</div>
              )}
            </div>
            <Field label="Cover image URL" hint="ลิงก์รูปแนวตั้งจะสวยสุด">
              <input
                className="input input-bordered input-sm"
                value={form.coverImage || ""}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="เช่น https://example.com/cover.jpg"
              />
            </Field>
            <Field label="Location" hint="ที่จัดเก็บบนชั้น/ตู้">
              <input
                className="input input-bordered input-sm"
                value={form.location || ""}
                onChange={(e) => set("location", e.target.value)}
                placeholder="เช่น A1-B2-C3"
              />
            </Field>
          </div>
        </div>
      </aside>

      {/* Right: form */}
      <section className="lg:col-span-2 space-y-6">
        <div className="card bg-base-100 border border-base-200">
          <div className="card-body">
            <SectionTitle>Basic info</SectionTitle>
            <div className="grid md:grid-cols-3 gap-3">
              <Field label="ชนิด">
                <select
                  className="select select-bordered select-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={mode === "edit"}
                >
                  {typeOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="ชื่อเรื่อง">
                <input
                  className="input input-bordered input-sm"
                  value={form.title || ""}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="เช่น Atomic Habits"
                  required
                />
              </Field>
              <Field label="ผู้แต่ง/ผู้จัดทำ">
                <input
                  className="input input-bordered input-sm"
                  value={form.author || ""}
                  onChange={(e) => set("author", e.target.value)}
                  placeholder="เช่น James Clear"
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <Field label="หมวด/ประเภท">
                <input
                  className="input input-bordered input-sm"
                  value={form.category || ""}
                  onChange={(e) => set("category", e.target.value)}
                  placeholder="เช่น Mindset, Self-Help"
                />
              </Field>
              <Field label="ปีที่พิมพ์">
                <input
                  type="number"
                  className="input input-bordered input-sm"
                  value={form.publishYear || ""}
                  onChange={(e) => set("publishYear", +e.target.value || "")}
                  placeholder="เช่น 2024"
                />
              </Field>
              {showStatus && (
                <Field label="สถานะ">
                  <select
                    className="select select-bordered select-sm"
                    value={form.status || "AVAILABLE"}
                    onChange={(e) => set("status", e.target.value)}
                  >
                    {STATUS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-200">
          <div className="card-body">
            <TypeFields type={type} form={form} setForm={setForm} />
          </div>
        </div>

        <div className="card bg-base-100 border border-base-200">
          <div className="card-body">
            <SectionTitle>Description</SectionTitle>
            <textarea
              className="textarea textarea-bordered"
              rows={5}
              value={form.description || ""}
              onChange={(e) => set("description", e.target.value)}
              placeholder="สรุปสั้น ๆ ว่าเล่มนี้เกี่ยวกับอะไร จุดเด่น/ประโยชน์ที่ผู้อ่านจะได้ ฯลฯ"
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="lg:col-span-3">
        <div className="border-t pt-4 flex justify-end gap-2 sticky bottom-0 bg-base-100/80 backdrop-blur-md py-3 rounded-b-xl">
          <button className="btn btn-ghost" onClick={onCancel}>ยกเลิก</button>
          <button className="btn btn-primary" onClick={onSubmit}>
            {mode === "add" ? "เพิ่มข้อมูล" : "บันทึกการแก้ไข"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("books");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [stats, setStats] = useState(null);

  const [q, setQ] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fType, setFType] = useState("");

  const [detail, setDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState("Book");
  const [addForm, setAddForm] = useState({});

  const [showEdit, setShowEdit] = useState(false);
  const [editType, setEditType] = useState("Book");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  

  const svc = useMemo(() => svcMap[tab], [tab]);

  const loadStats = async () => {
  try {
    const all = await itemsService.statistics(); // รวมทุกชนิด
    const spec =
      tab === "books"
        ? await booksService.statistics()
        : tab === "journals"
        ? await journalsService.statistics()
        : await comicsService.statistics();

    //เก็บ raw payload ทั้งหมด (เผื่อ API เพิ่ม key ใหม่ในอนาคต)
    setStats({
      all: all?.data ?? {},
      spec: spec?.data ?? {},
    });
  } catch (e) {
    setStats({ all: {}, spec: {} });
    toastERR(e?.response?.data?.message || e.message || "ดึงสถิติไม่สำเร็จ");
  }
};

  const loadRows = async () => {
    setLoading(true);
    try {
      let res;
      const base = { page, limit };
      if (q?.trim()) {
        res = await itemsService.search(q, page, limit);
      } else if (fStatus || fType) {
        res = await itemsService.filter({ ...base, status: fStatus || undefined, itemType: fType || undefined });
      } else {
        res = await svc.list(base);
      }
      setRows(res.data || []);
      setPagination(res.pagination || { currentPage: page, totalPages: 1 });
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
    loadStats();
  }, [tab, page, limit]); // eslint-disable-line

  const onView = async (row) => {
    try {
      if (row.itemType === "Journal") {
        const res = await journalsService.details(row.itemId);
        setDetail(res.data || row);
      } else if (row.itemType === "Book") {
        const res = await booksService.get(row.itemId);
        setDetail(res.data || row);
      } else {
        const res = await comicsService.get(row.itemId);
        setDetail(res.data || row);
      }
      setShowDetail(true);
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    }
  };

  const onDelete = async (id) => {
    if (!(await confirm("ยืนยันลบข้อมูลนี้?"))) return;
    try {
      await svc.remove(id);
      toastOK("ลบแล้ว");
      loadRows();
      loadStats();
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    }
  };

  const onUpdateStatusQuick = async (row, status) => {
    try {
      await itemsService.updateStatus(row.itemType, row.itemId, status);
      toastOK("อัปเดตสถานะสำเร็จ");
      if (showDetail) await onView(row);
      loadRows();
      loadStats();
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    }
  };

  const openAdd = () => {
    setAddType(tab2type[tab] || "Book");
    setAddForm({ status: "AVAILABLE" });
    setShowAdd(true);
  };

  const submitAdd = async () => {
    try {
      const payload = { ...addForm };
      if (!payload.title) return toastERR("กรุณากรอกชื่อเรื่อง");
      const svcTarget = addType === "Book" ? booksService : addType === "Journal" ? journalsService : comicsService;
      await svcTarget.create(payload);
      toastOK("เพิ่มข้อมูลสำเร็จ");
      setShowAdd(false);
      loadRows();
      loadStats();
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    }
  };

  const openEdit = async (row) => {
    setShowEdit(true);
    setEditLoading(true);
    setEditType(row.itemType);
    setEditId(row.itemId);
    try {
      let res;
      if (row.itemType === "Journal") res = await journalsService.details(row.itemId);
      else if (row.itemType === "Book") res = await booksService.get(row.itemId);
      else res = await comicsService.get(row.itemId);
      setEditForm(res?.data || row);
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
      setShowEdit(false);
    } finally {
      setEditLoading(false);
    }
  };

  const submitEdit = async () => {
    try {
      const payload = { ...editForm };
      const svcTarget = editType === "Book" ? booksService : editType === "Journal" ? journalsService : comicsService;
      await svcTarget.update(editId, payload);
      if (payload.status) await itemsService.updateStatus(editType, editId, payload.status);
      toastOK("อัปเดตสำเร็จ");
      setShowEdit(false);
      setEditId(null);
      loadRows();
      loadStats();
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* header with tabs + add */}
      <div className="card bg-base-100 shadow">
        <div className="card-body py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="tabs tabs-boxed p-1">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`tab ${tab === t.key ? "tab-active" : ""} gap-2`}
                  onClick={() => {
                    setTab(t.key);
                    setPage(1);
                    setQ(""); setFStatus(""); setFType("");
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <button className="btn btn-accent gap-2" onClick={openAdd}>
              <Plus className="h-4 w-4" /> เพิ่มข้อมูล
            </button>
          </div>
        </div>
      </div>

      <SmartStatCards statsAll={stats?.all} statsSpec={stats?.spec} />

      {/* filters */}
      <div className="card bg-base-100 shadow">
        <div className="card-body grid md:grid-cols-5 gap-3 items-end">
          <div className="form-control md:col-span-2">
            <label className="label">ค้นหา</label>
            <input
              className="input input-bordered"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="พิมพ์ชื่อเรื่อง / ผู้แต่ง / คำค้นหา"
            />
          </div>
          <div className="form-control">
            <label className="label">ประเภท</label>
            <select className="select select-bordered" value={fType} onChange={(e) => setFType(e.target.value)}>
              <option value="">— ทุกชนิด —</option>
              <option value="Book">Book</option>
              <option value="Journal">Journal</option>
              <option value="Comic">Comic</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">สถานะ</label>
            <select className="select select-bordered" value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
              <option value="">— ทุกสถานะ —</option>
              {STATUS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => { setPage(1); loadRows(); }}>ค้นหา</button>
            <button className="btn" onClick={() => { setQ(""); setFStatus(""); setFType(""); setPage(1); loadRows(); }}>รีเซ็ต</button>
            <button className="btn btn-ghost" onClick={() => { loadRows(); loadStats(); }}>
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="card-title">
              รายการ {TABS.find((x) => x.key === tab).label}
              <span className="opacity-60 text-sm ml-2">(หน้า {pagination.currentPage || 1}/{pagination.totalPages || 1})</span>
            </h2>
            <div className="join">
              <select className="select select-bordered join-item" value={limit} onChange={(e) => { setLimit(+e.target.value); setPage(1); }}>
                {[10, 20, 30, 50].map((n) => <option key={n} value={n}>{n}/หน้า</option>)}
              </select>
              <button className="btn join-item" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>ก่อนหน้า</button>
              <button className="btn join-item" onClick={() => setPage((p) => p + 1)} disabled={pagination.totalPages && page >= pagination.totalPages}>ถัดไป</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ชื่อเรื่อง</th>
                  <th>ผู้แต่ง/ผู้จัดทำ</th>
                  <th>ปี</th>
                  <th>สถานะ</th>
                  <th className="text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5}><div className="flex justify-center"><span className="loading loading-dots loading-lg" /></div></td></tr>
                ) : rows.length ? (
                  rows.map((r) => (
                    <tr key={r.itemId} className="hover">
                      <td className="font-medium">{r.title}</td>
                      <td>{r.author || "—"}</td>
                      <td>{r.publishYear || "—"}</td>
                      <td className="space-x-2">
                        <Badge s={r.status} />
                        <select
                          className="select select-xs select-bordered"
                          defaultValue=""
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v) onUpdateStatusQuick(r, v);
                            e.target.value = "";
                          }}
                        >
                          <option value="" disabled>เปลี่ยนเป็น…</option>
                          {STATUS.map((s) => <option key={s} value={s} disabled={s === r.status}>{s}</option>)}
                        </select>
                      </td>
                      <td className="text-right space-x-2">
                        <button className="btn btn-xs" onClick={() => onView(r)}><Eye className="h-3.5 w-3.5" /> ดู</button>
                        <button className="btn btn-xs btn-primary" onClick={() => openEdit(r)}><Pencil className="h-3.5 w-3.5" /> แก้ไข</button>
                        <button className="btn btn-xs btn-error" onClick={() => onDelete(r.itemId)}><Trash2 className="h-3.5 w-3.5" /> ลบ</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="text-center opacity-70">ไม่มีข้อมูล</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* view modal */}
      <dialog className={`modal ${showDetail ? "modal-open" : ""}`}>
        <div className="modal-box w-full max-w-6xl h-[85vh] overflow-y-auto">
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setShowDetail(false)}>✕</button></form>
          {!detail ? (
            <div className="py-10 text-center opacity-60">ไม่มีข้อมูล</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="aspect-[3/4] bg-base-200 rounded-xl overflow-hidden">
                  {detail.coverImage ? <img src={detail.coverImage} alt={detail.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-50">No cover</div>}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-2xl font-bold">{detail.title}</h3>
                <div className="flex gap-2"><div className="badge badge-outline">{detail.itemType}</div><Badge s={detail.status} /></div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {Object.entries(detail).map(([k, v]) => {
                    if (["itemId","title","status","itemType","coverImage"].includes(k)) return null;
                    return (
                      <div key={k} className="p-2 rounded bg-base-200/50">
                        <div className="text-xs opacity-60">{k}</div>
                        <div className="font-medium whitespace-pre-wrap break-words">{String(v ?? "—")}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* add modal */}
      <dialog className={`modal ${showAdd ? "modal-open" : ""}`}>
        <div className="modal-box w-full max-w-6xl p-0">
          <div className="px-6 py-4 border-b sticky top-0 bg-base-100 z-10 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">เพิ่มรายการใหม่</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setShowAdd(false)}>✕</button>
              </form>
            </div>
          </div>
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <ItemForm mode="add" type={addType} setType={setAddType} form={addForm} setForm={setAddForm} showStatus={true} onSubmit={submitAdd} onCancel={() => setShowAdd(false)} />
          </div>
        </div>
      </dialog>

      {/* edit modal */}
      <dialog className={`modal ${showEdit ? "modal-open" : ""}`}>
        <div className="modal-box w-full max-w-6xl p-0">
          <div className="px-6 py-4 border-b sticky top-0 bg-base-100 z-10 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">แก้ไขข้อมูล</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setShowEdit(false)}>✕</button>
              </form>
            </div>
          </div>
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {editLoading ? (
              <div className="py-10 text-center"><span className="loading loading-dots loading-lg" /></div>
            ) : (
              <ItemForm mode="edit" type={editType} setType={() => {}} form={editForm} setForm={setEditForm} showStatus={true} onSubmit={submitEdit} onCancel={() => setShowEdit(false)} />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
