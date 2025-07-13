import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  )
}

export default App
