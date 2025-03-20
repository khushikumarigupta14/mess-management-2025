// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Mess Management
        </Link>
        <div className="flex space-x-4">
          {role === "admin" && <Link to="/admin">Admin</Link>}
          {role === "manager" && <Link to="/manager">Manager</Link>}
          {role === "user" && <Link to="/user">User</Link>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
