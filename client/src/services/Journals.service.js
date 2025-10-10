import { api, mapRes } from "./api.js";

export const journalsService = {
  async list({ page = 1, limit = 10, ...filters } = {}) {
    const res = await api.get("/api/journals", { params: { page, limit, ...filters } });
    return mapRes(res);
    // /api/journals (GET) Retrieve a paginated list of journals with optional filtering
  },
  async create(payload) {
    const res = await api.post("/api/journals", payload);
    return mapRes(res);
    // /api/journals (POST) Add a new journal to the collection


  },
  async search(q, page = 1, limit = 10) {
    const res = await api.get("/api/journals/search", { params: { q, page, limit } });
    return mapRes(res);
    // /api/journals/search (GET) Search journals by title, author, description, or ISSN

  },
  async advancedSearch(params = {}) {
    const res = await api.get("/api/journals/advanced-search", { params });
    return mapRes(res);
    // /api/journals/advanced-search (GET) Search journals with multiple filtering options


  },
  async available(page = 1, limit = 10) {
    const res = await api.get("/api/journals/available", { params: { page, limit } });
    return mapRes(res);
    // /api/journals/available (GET) Get all journals with AVAILABLE status

  },
  async statistics() {
    const res = await api.get("/api/journals/statistics");
    return mapRes(res);
    // /api/journals/statistics (GET) Get comprehensive statistics about journals in the collection


  },
  async filter(params = {}) {
    const res = await api.get("/api/journals/filter", { params });
    return mapRes(res);
    // /api/journals/filter (GET) Filter journals using multiple query parameters

  
  },
  async get(id) {
    const res = await api.get(`/api/journals/${id}`);
    return mapRes(res);
    // /api/journals/{id} (GET) Retrieve a specific journal by its unique identifier


  },
  async update(id, payload) {
    const res = await api.put(`/api/journals/${id}`, payload);
    return mapRes(res);
    // /api/journals/{id} (PUT) Update an existing journal's information


  },
  async remove(id) {
    const res = await api.delete(`/api/journals/${id}`);
    return mapRes(res);
    // /api/journals/{id} (DELETE) Soft delete a journal from the collection


  },
  async details(id) {
    const res = await api.get(`/api/journals/${id}/details`);
    return mapRes(res);
    // /api/journals/{id}/details (GET) Get comprehensive details about a specific journal


  },
  async updateStatus(id, status) {
    const res = await api.patch(`/api/journals/${id}/status`, { status });
    return mapRes(res);
    // /api/journals/{id}/status (PATCH) Update only the status of a journal


  },
};
