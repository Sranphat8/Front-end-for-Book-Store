import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard.jsx";
import AddItem from "../pages/AddItem.jsx";
import EditItem from "../pages/EditItem.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:type/:id" element={<EditItem />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
