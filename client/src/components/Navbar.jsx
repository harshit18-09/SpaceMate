import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/admin/dashboard" className="hover:text-blue-300">
          Admin Dashboard
        </Link>
        <Link to="/" className="hover:text-blue-300">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
