import React from "react";
import { NavLink, Link } from "react-router";
import { BookOpen, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Logo  */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center">
            <div className="h-16 md:h-16">
              <img
                src="/images/book_store.avif"
                alt="Book Store"
                className="h-full w-auto object-contain select-none"
                draggable="false"
              />
            </div>
          </Link>
        </div>

        {/* เมนู */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1">
            <li>
              <NavLink to="/" end className="gap-2">
                <BookOpen className="h-4 w-4" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="gap-2">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* เมนูบนมือถือ */}
        <div className="navbar-end md:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost">เมนู</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box shadow mt-3 w-52">
              <li>
                <NavLink to="/" end className="gap-2">
                  <BookOpen className="h-4 w-4" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </NavLink>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
}
