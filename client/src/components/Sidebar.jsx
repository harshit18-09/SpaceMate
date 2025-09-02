import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, Users, Map } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/scan/room-manager", label: "Room Manager", icon: <Building2 size={18} /> },
    { to: "/scan/crowd", label: "Crowd Data", icon: <Users size={18} /> },
    { to: "/scan/map", label: "Map", icon: <Map size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900/90 backdrop-blur-md text-gray-200 p-5 border-r border-gray-700 shadow-lg hidden md:flex flex-col">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">SpaceMate</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              location.pathname === link.to
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
