import React, { useEffect, useState } from 'react';
import './Products.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Products({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  // ✅ Search filter
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Category filters
  const shirts = filteredProducts.filter(p => p.category === 'shirt');
  const pants = filteredProducts.filter(p => p.category === 'pants');
  const innerwears = filteredProducts.filter(p => p.category === 'innerwear');

  const addToCart = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please Login / Signup before adding to cart");
      navigate("/login");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      ...item,
      quantity: 1,
      selectedSize: item.sizes ? item.sizes[0] : "Free Size",
    };

    const alreadyInCart = existingCart.find(
      (cartItem) =>
        cartItem._id === newItem._id && cartItem.selectedSize === newItem.selectedSize
    );

    let updatedCart;
    if (alreadyInCart) {
      updatedCart = existingCart.map((cartItem) =>
        cartItem._id === newItem._id && cartItem.selectedSize === newItem.selectedSize
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...existingCart, newItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${item.name} added to cart 🛒`);
  };

  return (
    <div className="products-container">
      <h1 className="section-title">🧥 Shirts</h1>
      <div className="product-grid">
        {shirts.map((item) => (
          <div key={item._id} className="product-card">
            <Link to={`/product/${item._id}`} className="product-card-link">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
            </Link>
            <button className="cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h1 className="section-title">👖 Pants</h1>
      <div className="product-grid">
        {pants.map((item) => (
          <div key={item._id} className="product-card">
            <Link to={`/product/${item._id}`} className="product-card-link">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
            </Link>
            <button className="cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h1 className="section-title">🩲 Innerwear</h1>
      <div className="product-grid">
        {innerwears.map((item) => (
          <div key={item._id} className="product-card">
            <Link to={`/product/${item._id}`} className="product-card-link">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
            </Link>
            <button className="cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
