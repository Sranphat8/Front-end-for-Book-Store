import axios from "axios";

export const api = axios.create({
  baseURL: "https://bookshop-api-er7t.onrender.com",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 20000,
});


export const mapRes = (res) => res?.data ?? {};

