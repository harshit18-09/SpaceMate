import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="p-4 flex gap-4 border-b">
      <Link to="/">Home</Link>
      {role === 'admin' && <Link to="/admin/rooms">Manage Rooms</Link>}
      {role === 'user' && <Link to="/crowd">View Crowd</Link>}
      {!role && <>
        <Link to="/admin/login">Admin Login</Link>
        <Link to="/user/login">Student Login</Link>
      </>}
      {role && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
