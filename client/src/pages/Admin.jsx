import React from "react";
import Layout from "../components/Layout";
import Dashboard from "./Dashboard";

const Admin = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <Dashboard />
    </Layout>
  );
};

export default Admin;
