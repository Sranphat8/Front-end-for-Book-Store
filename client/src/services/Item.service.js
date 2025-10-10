import { api, mapRes } from "./api.js";

export const itemsService = {
  async list(page = 1, limit = 10) {
    const res = await api.get("/api/items", { params: { page, limit } });
    return mapRes(res);
    // /api/items (GET) Retrieve a paginated list of all items (Books, Journals, Comics) in the collection


  },
  async search(q, page = 1, limit = 10) {
    const res = await api.get("/api/items/search", { params: { q, page, limit } });
    return mapRes(res);
    // /api/items/search (GET) Search for items (Books, Journals, Comics) by title, author, or description


  },
  async filter(params = {}) {
    const res = await api.get("/api/items/filter", { params });
    return mapRes(res);
    // /api/items/filter (GET) Filter items across all types using multiple query parameters


  },
  async available(page = 1, limit = 10) {
    const res = await api.get("/api/items/available", { params: { page, limit } });
    return mapRes(res);
    // /api/items/available (GET) Retrieve all items with AVAILABLE status from all types (Books, Journals, Comics)


  },
  async get(type, id) {
    const res = await api.get(`/api/items/${type}/${id}`);
    return mapRes(res);
    // /api/items/{type}/{id} (GET) Retrieve a specific item by its type and unique identifier


  },
  async updateStatus(type, id, status) {
    const res = await api.patch(`/api/items/${type}/${id}/status`, { status });
    return mapRes(res);
    // /api/items/{type}/{id}/status (PATCH) Update the status of any item type using its type and ID


  },
  async statistics() {
    const res = await api.get("/api/items/statistics");
    return mapRes(res);
    // /api/items/statistics (GET) Get comprehensive statistics across all items in the collection


  },
};
