import React from "react";
import { Link } from "react-router-dom";
import { LogOut, Home, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold hover:text-blue-400 transition-colors"
        >
          <Home size={18} />
          Home
        </Link>
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>

      {/* Right Section */}
      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-xl transition-all text-sm shadow-md">
        <LogOut size={16} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
