import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <Link to="/admin/dashboard" style={{ color: "white", marginRight: "20px" }}>
        Admin Dashboard
      </Link>
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
