import React from "react";
const NavBar = () => {



  const menuItems = [
    {
      name: "Search",
      url: "/",
    },
    {
      name: "Add item",
      url: "/add",
    },
    {
      name: "About Us",
      url: "/",
    },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.url}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
<a href="/" className="flex items-center space-x-2">
  <img
    src="/images/Grab_Logo.png" // เปลี่ยนเป็น path ของโลโก้รูปที่เราจะใช้
    alt="Logo"
    className="h-8 w-auto" // ปรับขนาดโลโก้
  />
</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => {
            return (
              <li key={item.name}>
                <a href={item.url}>{item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
      
        
      </div>
    
  );
};

export default NavBar;
