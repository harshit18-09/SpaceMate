import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import RoomManager from './pages/RoomManager';
import CrowdPage from './pages/CrowdPage';
import Navbar from './components/Navbar';
import ScanRoom from './pages/ScanRoom';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <>
      <Navbar role={role} />
      <Routes>
        {/* 🔑 Login Routes */}
        <Route path="/admin/login" element={<AdminLogin setRole={setRole} />} />
        <Route path="/user/login" element={<UserLogin setRole={setRole} />} />

        {/* 🔑 Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            role === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />
          }
        />
        <Route
          path="/room-manager"
          element={
            role === 'admin' ? <RoomManager /> : <Navigate to="/admin/login" />
          }
        />

        {/* 🔑 User Routes */}
        <Route path="/crowd" element={<CrowdPage />} />
        <Route path="/scan/:roomId" element={<ScanRoom />} />

        {/* ❌ Old dashboard route removed */}
      </Routes>
    </>
  );
}

export default App;
