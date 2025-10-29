import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import logo from '../assets/Logo - 001.jpg';

function Navbar({ searchQuery, setSearchQuery }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setUserEmail(user.email);
    }

    const updateCart = () => {
      const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cartData.length);
    };

    const updateWishlist = () => {
      const wishData = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishCount(wishData.length);
    };

    updateCart();
    updateWishlist();

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserEmail(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* 🔹 Logo */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="CREWS Logo" className="logo-img" />
          <span className="logo-text">CREWS</span>
        </Link>
      </div>

      {/* 🔹 Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>

      {/* 🔹 Right Section */}
      <div className="navbar-right">
        <Link to="#">Help</Link>
        <Link to="/orders">Orders</Link>
        {!userEmail && <Link to="/signup">Sign Up</Link>}
        {!userEmail && <Link to="/login">Log In</Link>}

        {/* 🔍 Search box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* 👤 User Dropdown */}
        <div className="user-dropdown">
          <FaUser
            className="icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <p><strong>User Profile</strong></p>
              {userEmail ? (
                <>
                  <p>Email: {userEmail}</p>
                  <hr />
                  <Link to="/orders">My Orders</Link>
                  <Link to="/wishlist">My Wishlist ❤️</Link>
                  <Link to="/cart">My Cart 🛒</Link>
                  <Link to="/profile">Account Settings</Link>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <p>Please <Link to="/login">Login</Link></p>
              )}
            </div>
          )}
        </div>

        {/* ❤️ Wishlist */}
        <Link to="/wishlist" className="icon-link">
          <FaHeart className="icon" />
          {wishCount > 0 && <span className="badge">{wishCount}</span>}
        </Link>

        {/* 🛒 Cart */}
        <Link to="/cart" className="icon-link">
          <FaShoppingBag className="icon" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </div>

      {/* ✅ Hamburger Menu Button - LAST in HTML */}
      <button 
        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
