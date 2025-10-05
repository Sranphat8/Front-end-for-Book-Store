import React from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: "รายการสินค้า", path: "/" },
    { name: "เพิ่มสินค้าใหม่", path: "/add" },
  ];

  return (
    <nav className="bg-white text-gray-800 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Brand */}
      <div className="flex-1">
        <span className="font-bold text-2xl tracking-wide text-gray-900">
          📚 Book Store Admin
        </span>
      </div>

      {/* Links */}
      <div className="flex-none gap-3">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition 
              ${
                location.pathname === link.path
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
              }
            `}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
