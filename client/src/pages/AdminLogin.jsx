import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const AdminLogin = ({ setRole }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: form.username.trim(),
        password: form.password.trim(),
      });

      const role = res.data.user.role;
      if (role === "admin") {
        localStorage.setItem("token", res.data.token || "");
        localStorage.setItem("role", role);
        setRole(role);
        navigate("/admin/dashboard");
      } else {
        alert("Not an admin!");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
