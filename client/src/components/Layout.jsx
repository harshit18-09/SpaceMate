import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar (desktop + mobile toggle) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <Sidebar />
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Navbar with toggle for mobile */}
        <div className="md:hidden flex items-center bg-gray-900/80 backdrop-blur-md border-b border-gray-700 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-300">
            <Menu size={22} />
          </button>
          <span className="ml-4 font-semibold text-blue-400">SpaceMate</span>
        </div>

        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
