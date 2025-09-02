import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">SpaceMate Admin</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="hover:text-blue-300">Dashboard</Link>
        <Link to="/scan/room-manager" className="hover:text-blue-300">Room Manager</Link>
        <Link to="/scan/crowd" className="hover:text-blue-300">Crowd Data</Link>
        <Link to="/scan/map" className="hover:text-blue-300">Map</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
