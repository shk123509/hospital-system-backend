import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Invalid user in localStorage:", error);
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // refresh navbar
  };

  return (
    <nav
      style={{
        background: "#222",
        color: "white",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ margin: 0 }}>🏥 Hospital Portal</h2>

      <div>
        {user ? (
          <>
            <Link to="/home" style={linkStyle}>
              Home
            </Link>
            <Link to="/about" style={linkStyle}>
              About
            </Link>
            <Link to="/contact" style={linkStyle}>
              Contact Hospital
            </Link>
            <Link to="/profile" style={linkStyle}>
              {user.name ? `Hi, ${user.name}` : "Profile"}
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 12px",
                marginLeft: "10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/signup" style={linkStyle}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  marginRight: "18px",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
