import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div data-theme="light" className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
