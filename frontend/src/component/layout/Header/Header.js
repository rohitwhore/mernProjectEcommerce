import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logo from "../../../images/logo.png";

const Header = () => {
  const [keyword, setKeyword] = useState(""); // State to store search input
  const navigate = useNavigate(); // Hook to navigate between pages

  // Handle search form submission
  const searchHandler = (e) => {
    e.preventDefault(); // Prevent page reload
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`); // Redirect to search results
    } else {
      navigate("/products"); // Redirect to all products if search is empty
    }
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/about" style={linkStyle}>About</Link>
      </div>

      {/* Search Bar & Icons */}
      <div style={iconsContainerStyle}>
        {/* Search Form */}
        <form onSubmit={searchHandler} style={searchFormStyle}>
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={searchInputStyle}
          />
          <button type="submit" style={searchButtonStyle}>
            <FaSearch size={18} />
          </button>
        </form>

        <Link to="/cart">
          <FaShoppingCart size={22} style={iconStyle} />
        </Link>
        <Link to="/login">
          <FaUser size={22} style={iconStyle} />
        </Link>
      </div>
    </nav>
  );
};

// Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "white",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
};

const navLinksStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "rgba(35, 35, 35,0.8)",
  fontSize: "1.2rem",
  fontWeight: "500",
};

const iconsContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const searchFormStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "5px",
  overflow: "hidden",
};

const searchInputStyle = {
  border: "none",
  padding: "5px",
  outline: "none",
  width: "120px",
};

const searchButtonStyle = {
  background: "#eb4034",
  color: "white",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
};

const iconStyle = {
  color: "rgba(35, 35, 35,0.8)",
  cursor: "pointer",
};

export default Header;
