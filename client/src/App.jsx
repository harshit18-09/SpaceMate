import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import RoomManager from './pages/RoomManager';
import CrowdPage from './pages/CrowdPage';
import Navbar from './components/Navbar';

function App() {
  const role = localStorage.getItem('role');

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Login Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Protected Admin Page */}
        <Route path="/admin/rooms" element={
          role === 'admin' ? <RoomManager /> : <Navigate to="/admin/login" />
        } />

        {/* Protected User Page */}
        <Route path="/crowd" element={
          role === 'user' ? <CrowdPage /> : <Navigate to="/user/login" />
        } />
      </Routes>
    </>
  );
}

export default App;
