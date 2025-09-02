import React, { useState } from "react";
import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
