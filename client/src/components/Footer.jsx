import React from "react";

export default function Footer() {
  return (
    <footer className="footer items-center p-4 bg-base-100 text-base-content border-t">
      <div className="container mx-auto px-4 flex justify-between w-full">
        <p>© {new Date().getFullYear()} Book Store</p>
        <p className="opacity-70">Built with React • Tailwind • DaisyUI</p>
      </div>
    </footer>
  );
}
