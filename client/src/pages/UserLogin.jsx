import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      if (res.data.role === 'user') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', 'user');
        navigate('/crowd');
      } else {
        alert('Not a student!');
      }
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default UserLogin;
