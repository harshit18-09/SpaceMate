import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import Navbar from './components/Navbar'
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
