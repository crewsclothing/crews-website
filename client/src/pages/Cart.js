import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login to access your cart.");
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, [navigate]);

  const updateQuantity = (id, size, delta) => {
    const updated = cart.map((item) =>
      item._id === id && item.selectedSize === size
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id, size) => {
    const updated = cart.filter(
      (item) => !(item._id === id && item.selectedSize === size)
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/products">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item._id + item.selectedSize}>
            <img
              src={(item.images && item.images[0]) || item.image}
              alt={item.name}
            />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p>Size: {item.selectedSize}</p>
              <div className="qty-control">
                <button onClick={() => updateQuantity(item._id, item.selectedSize, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.selectedSize, 1)}>+</button>
              </div>
              <button onClick={() => removeItem(item._id, item.selectedSize)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Total: ₹{total}</h3>
      <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;
