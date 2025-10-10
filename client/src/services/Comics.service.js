import { api, mapRes } from "./api.js";
export const comicsService = {
  async list({ page = 1, limit = 10, ...filters } = {}) {
    const res = await api.get("/api/comics", { params: { page, limit, ...filters } });
    return mapRes(res);
    // /api/comics  (GET) Retrieve a paginated list of comics with optional filtering


  },
  async create(payload) {
    const res = await api.post("/api/comics", payload);
    return mapRes(res);
    // /api/comics (POST) Add a new comic to the collection


  },
  async search(q, page = 1, limit = 10) {
    const res = await api.get("/api/comics/search", { params: { q, page, limit } });
    return mapRes(res);
    // /api/comics/search (GET) Search comics by title, author, series, or description


  },
  async advancedSearch(params = {}) {
    const res = await api.get("/api/comics/advanced-search", { params });
    return mapRes(res);
    // /api/comics/advanced-search (GET) Search comics with multiple filtering options


  },
  async available(page = 1, limit = 10) {
    const res = await api.get("/api/comics/available", { params: { page, limit } });
    return mapRes(res);
    // /api/comics/available (GET) Get all comics with AVAILABLE status


  },
  async statistics() {
    const res = await api.get("/api/comics/statistics");
    return mapRes(res);
    // /api/comics/statistics (GET) Get comprehensive statistics about comics in the collection


  },
  async filter(params = {}) {
    const res = await api.get("/api/comics/filter", { params });
    return mapRes(res);
    // /api/comics/filter (GET) Filter comics using multiple query parameters


  },
  async get(id) {
    const res = await api.get(`/api/comics/${id}`);
    return mapRes(res);
    // /api/comics/{id}  (GET) Retrieve a specific comic by its unique identifier


  },
  async update(id, payload) {
    const res = await api.put(`/api/comics/${id}`, payload);
    return mapRes(res);
    // /api/comics/{id} (PUT) Update an existing comic's information


  },
  async remove(id) {
    const res = await api.delete(`/api/comics/${id}`);
    return mapRes(res);
    //  /api/comics/{id} (DELETE) Soft delete a comic from the collection


  },
  async updateStatus(id, status) {
    const res = await api.patch(`/api/comics/${id}/status`, { status });
    return mapRes(res);
    // /api/comics/{id}/status (PATCH) Update only the status of a comic


  },
};