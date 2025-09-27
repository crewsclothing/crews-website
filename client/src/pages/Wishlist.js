// src/pages/Wishlist.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  // remove from wishlist
  const handleRemove = (id) => {
    let updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // 🔔 update Navbar count
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty 💔</h2>
        <Link to="/products" className="go-shopping">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist ❤️</h2>
      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item._id}>
            <Link to={`/product/${item._id}`} className="wishlist-link">
              <img
                src={(item.images && item.images[0]) || item.image}
                alt={item.name}
              />
              <p className="wish-name">{item.name}</p>
              <p className="wish-price">₹{item.price}</p>
            </Link>
            <button
              className="remove-btn"
              onClick={() => handleRemove(item._id)}
            >
              <FaTrash /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
