// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import RoomManager from './pages/RoomManager';
import CrowdPage from './pages/CrowdPage';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  // Keep state in sync with localStorage (for direct reloads or external changes)
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [role]);

  return (
    <>
      <Navbar role={role} setRole={setRole} />
      <Routes>
        {/* Public Login Routes */}
        <Route path="/admin/login" element={<AdminLogin setRole={setRole} />} />
        <Route path="/user/login" element={<UserLogin setRole={setRole} />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/rooms" element={
          role === 'admin' ? <RoomManager /> : <Navigate to="/admin/login" />
        } />
        <Route path="/admin/dashboard" element={
          role === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />
        } />

        {/* Protected User Route */}
        <Route path="/crowd" element={
          role === 'user' ? <CrowdPage /> : <Navigate to="/user/login" />
        } />
      </Routes>
    </>
  );
}

export default App;
