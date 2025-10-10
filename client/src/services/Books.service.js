import { api, mapRes } from "./api.js";

export const booksService = {
  async list({ page = 1, limit = 10, ...filters } = {}) {
    const res = await api.get("/api/books", { params: { page, limit, ...filters } });
    return mapRes(res);
    // /api/books (GET) Retrieve a paginated list of books with optional filtering by status, category, author, etc.
  },
  async create(payload) {
    const res = await api.post("/api/books", payload);
    return mapRes(res);
    //  /api/books (POST) Add a new book to the collection
  },
  async search(q, page = 1, limit = 10) {
    const res = await api.get("/api/books/search", { params: { q, page, limit } });
    return mapRes(res);
    // /api/books/search (GET) Search books by title, author, description, or ISBN
  },
  async statistics() {
    const res = await api.get("/api/books/statistics");
    return mapRes(res);
    // /api/books/statistics (GET) Get comprehensive statistics about books in the collection
  },
  async filter(params = {}) {
    const res = await api.get("/api/books/filter", { params });
    return mapRes(res);
    // /api/books/filter (GET) Filter books using multiple query parameters
  },
  async get(id) {
    const res = await api.get(`/api/books/${id}`);
    return mapRes(res);
    // /api/books/{id} (GET) Retrieve a specific book by its unique identifier
  },
  async update(id, payload) {
    const res = await api.put(`/api/books/${id}`, payload);
    return mapRes(res);
    // /api/books/{id} (PUT) Update an existing book's information
  },
  async remove(id) {
    const res = await api.delete(`/api/books/${id}`);
    return mapRes(res);
    // /api/books/{id} (DELETE) Soft delete a book from the collection (marks as deleted but keeps record)


  },
};