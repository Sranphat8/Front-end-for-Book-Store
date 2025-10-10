import React, { useEffect, useMemo, useState } from "react";
import Filters from "../components/Filters.jsx";
import ItemCard from "../components/ItemCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { itemsService } from "../services/Item.service.js";
import { toastERR } from "../components/ConfirmDialog.jsx";
import { booksService } from "../services/Books.service.js";
import { journalsService } from "../services/Journals.service.js";
import { comicsService } from "../services/Comics.service.js";

const DEFAULT_QUERY = { q: "", itemType: "", status: "", category: "", itemId: "" };


export default function Home() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const params = useMemo(() => {
    const p = { page, limit };
    if (query.itemType || query.status || query.category) {
      p.itemType = query.itemType || undefined;
      p.status = query.status || undefined;
      p.category = query.category || undefined;
    }
    return p;
  }, [page, limit, query]);

  const fetchById = async (id, type) => {
    // คืนรายการเดียวในรูปแบบ array เพื่อใช้ร่วมกับ grid/card เดิม
    try {
      if (type === "Book") {
        const res = await booksService.get(id);
        return res?.data ? [res.data] : [];
      }
      if (type === "Journal") {
        const res = await journalsService.details(id);
        return res?.data ? [res.data] : [];
      }
      if (type === "Comic") {
        const res = await comicsService.get(id);
        return res?.data ? [res.data] : [];
      }
      // ถ้าไม่ทราบชนิด: try ลำดับ Book → Journal → Comic
      const tryBook = await booksService.get(id).then(r => r?.data ? [r.data] : []).catch(() => []);
      if (tryBook.length) return tryBook;
      const tryJournal = await journalsService.details(id).then(r => r?.data ? [r.data] : []).catch(() => []);
      if (tryJournal.length) return tryJournal;
      const tryComic = await comicsService.get(id).then(r => r?.data ? [r.data] : []).catch(() => []);
      return tryComic;
    } catch {
      return [];
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      // 1) ถ้ามี itemId → หารายการเดียว
      if (query.itemId?.trim()) {
        const data = await fetchById(query.itemId.trim(), query.itemType || "");
        setItems(data);
        setPagination({ currentPage: 1, totalPages: 1 });
        return;
      }

      // 2) ใช้ search ถ้ามีคำค้น
      if ((query.q || "").trim()) {
        const res = await itemsService.search(query.q.trim(), page, limit);
        setItems(res.data || []);
        setPagination(res.pagination || { currentPage: page, totalPages: 1 });
        return;
      }

      // 3) ใช้ filter ตาม API ถ้ามีเงื่อนไข itemType/status/category
      if (query.itemType || query.status || query.category) {
        const res = await itemsService.filter(params);
        setItems(res.data || []);
        setPagination(res.pagination || { currentPage: page, totalPages: 1 });
        return;
      }

      // 4) ไม่ส่งอะไรเลย  list ทั้งหมด
      const res = await itemsService.list(page, limit);
      setItems(res.data || []);
      setPagination(res.pagination || { currentPage: page, totalPages: 1 });
    } catch (e) {
      toastERR(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    
  }, [page]);

  return (
    <div className="space-y-6">
      {/* hero / carousel */}
      <div className="carousel w-full rounded-2xl overflow-hidden shadow">
        <div id="slide1" className="carousel-item relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]">
          <img src="data:image/jpeg;base64,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" alt="slide 1" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]">
          <img src="../../public/images/slide2.jpg" alt="slide 2" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]">
          <img src="../../public/images/slide3.jpg" alt="slide 3" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]">
          <img src="../../public/images/slide4.jpg" alt="slide 4" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ตัวกรอง</h1>
        <button className="btn btn-outline md:hidden" onClick={() => setOpenFilter(true)}>
          เปิดตัวกรอง
        </button>
      </div>

      <section className="flex flex-col md:flex-row gap-6">
        {/* Filters on desktop */}
        <aside className="hidden md:block w-72 shrink-0">
          <Filters
            value={{ ...query, limit }}
            onChange={(v) => {
              setQuery(v);
              if (v.limit) setLimit(Number(v.limit));
            }}
            onSubmit={() => {
              setPage(1);
              load();
            }}
            loading={loading}
          />
        </aside>

        {/* Result grid */}
        <div className="flex-1">
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton h-64 w-full rounded-2xl" />
                ))
              : items.map((it) => (
                  <ItemCard key={it.itemId} item={it} onView={setActive} />
                ))}
          </section>
          <div className="flex justify-center mt-6">
            <Pagination
              page={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              onPage={setPage}
            />
          </div>
        </div>
      </section>

      {/* Filters modal on mobile */}
      <dialog className={`modal ${openFilter ? "modal-open" : ""}`}>
        <div className="modal-box max-w-md">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpenFilter(false)}
            >
              ✕
            </button>
          </form>
          <Filters
            value={{ ...query, limit }}
            onChange={(v) => {
              setQuery(v);
              if (v.limit) setLimit(Number(v.limit));
            }}
            onSubmit={() => {
              setPage(1);
              load();
              setOpenFilter(false);
            }}
            loading={loading}
          />
        </div>
      </dialog>

      {/* Detail modal */}
      <dialog id="item-detail" className={`modal ${active ? "modal-open" : ""}`}>
        <div className="modal-box w-full max-w-6xl h-[85vh] overflow-y-auto">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setActive(null)}
            >
              ✕
            </button>
          </form>
          {active ? <DetailsView item={active} /> : <div className="text-center py-6">ไม่พบข้อมูล</div>}
        </div>
      </dialog>
    </div>
  );
}

function DetailsView({ item }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        let res;
        if (item.itemType === "Book") res = await booksService.get(item.itemId);
        else if (item.itemType === "Journal") res = await journalsService.details(item.itemId);
        else if (item.itemType === "Comic") res = await comicsService.get(item.itemId);
        setDetail(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [item]);

  if (loading) return <div className="text-center p-6">กำลังโหลดข้อมูล...</div>;
  if (!detail) return <div className="text-center p-6">ไม่พบรายละเอียด</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={detail.coverImage}
          alt={detail.title}
          className="w-full sm:w-72 lg:w-80 rounded-xl object-cover shadow"
        />
        <div className="flex-1 space-y-1">
          <h3 className="text-2xl font-bold">{detail.title}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline">{detail.itemType}</span>
            <span className={`badge ${detail.status === "AVAILABLE" ? "badge-success" : "badge-warning"}`}>
              {detail.status}
            </span>
          </div>
          <p className="text-sm opacity-70">{detail.description}</p>
        </div>
      </div>

      <div className="divider">ข้อมูลเพิ่มเติม</div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div><strong>ผู้แต่ง:</strong> {detail.author || "—"}</div>
        <div><strong>หมวดหมู่:</strong> {detail.category || "—"}</div>
        <div><strong>ปีที่พิมพ์:</strong> {detail.publishYear || "—"}</div>
        {detail.isbn && <div><strong>ISBN:</strong> {detail.isbn}</div>}
        {detail.issn && <div><strong>ISSN:</strong> {detail.issn}</div>}
        {detail.volume && <div><strong>Volume:</strong> {detail.volume}</div>}
        {detail.issue && <div><strong>Issue:</strong> {detail.issue}</div>}
        {detail.publicationFrequency && (
          <div><strong>ความถี่การตีพิมพ์:</strong> {detail.publicationFrequency}</div>
        )}
        <div><strong>สำนักพิมพ์:</strong> {detail.publisher || "—"}</div>
        <div><strong>สถานที่จัดเก็บ:</strong> {detail.location || "—"}</div>
        {detail.addedDate && (
          <div><strong>วันที่เพิ่มเข้า:</strong> {new Date(detail.addedDate).toLocaleString("th-TH")}</div>
        )}
      </div>
    </div>
  );
}
