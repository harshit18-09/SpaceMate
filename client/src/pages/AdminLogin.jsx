import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setRole }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: form.username.trim(),
        password: form.password.trim()
      });
      if (res.data.role === 'admin') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', 'admin');
        setRole('admin');
        navigate('/admin/dashboard'); // ✅ Redirect updated here
      } else {
        alert('Not an admin!');
      }
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
