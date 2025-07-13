import { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({ id: '', level: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    id: Number(form.id),
    level: Number(form.level)
  };

  fetch('http://localhost:5000/api/zones/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      setForm({ id: '', level: '' });
    })
    .catch(err => {
      alert('Failed to update');
      console.error('Error:', err);
    });
};


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
        <label>Zone ID:</label>
        <input
          type="number"
          name="id"
          value={form.id}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <label>New Crowd Level (%):</label>
        <input
          type="number"
          name="level"
          value={form.level}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit">Update Zone</button>
      </form>
    </div>
  );
}
