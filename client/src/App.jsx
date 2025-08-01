import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import RoomManager from './pages/RoomManager';
import CrowdPage from './pages/CrowdPage';
import Navbar from './components/Navbar';
import ScanRoom from './pages/ScanRoom';
import AdminDashboard from './components/AdminDashboard';

// Import the new QR scanner page
import QRScanPage from './pages/qrscan';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

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
        <Route
          path="/admin/rooms"
          element={role === 'admin' ? <RoomManager /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/dashboard"
          element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />

        {/* Protected User Route */}
        <Route
          path="/crowd"
          element={role === 'user' ? <CrowdPage /> : <Navigate to="/user/login" />}
        />

        {/* QR Scan Route */}
        <Route path="/scan/:roomId" element={<ScanRoom />} />

        {/* New QR Scanner Camera Route */}
        <Route path="/qrscan" element={<QRScanPage />} />
      </Routes>
    </>
  );
}

export default App;
