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
          <img src="../../public/images/slide1.jpg" alt="slide 1" className="w-full h-full object-cover object-center" />
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
