import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import Layout from "./components/Layout";
import Loader from "./components/ui/Loader";

import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import RoomManager from "./pages/RoomManager";
import CrowdPage from "./pages/CrowdPage";
import ScanRoom from "./pages/ScanRoom";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin setRole={setRole} />} />
          <Route path="/user/login" element={<UserLogin setRole={setRole} />} />

          <Route
            path="/admin/dashboard"
            element={role === "admin" ? <AdminDashboard /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/room-manager"
            element={role === "admin" ? <RoomManager /> : <Navigate to="/admin/login" />}
          />

          <Route path="/crowd" element={<CrowdPage />} />
          <Route path="/scan/:roomId" element={<ScanRoom />} />

          <Route path="*" element={<Navigate to="/user/login" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
