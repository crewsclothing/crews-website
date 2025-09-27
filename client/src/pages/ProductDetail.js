// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import axios from 'axios';
import Footer from './Footer';
import { FaHeart } from "react-icons/fa"; // ❤️ icon import

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const [pincode, setPincode] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const [related, setRelated] = useState([]);

  const [isWishlisted, setIsWishlisted] = useState(false);

  // ✅ Login check
  const requireLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please login to continue.');
      navigate('/login');
      return false;
    }
    return true;
  };

  // ✅ Fetch product detail
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImg(0);
        setSelectedSize(null);

        // ✅ wishlist check
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const exists = wishlist.find((it) => it._id === res.data._id);
        if (exists) setIsWishlisted(true);
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  // ✅ Fetch related
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}/related`)
      .then((res) => setRelated(res.data))
      .catch((err) => console.error("Related fetch error:", err));
  }, [id]);

  // ✅ Pincode checker
  const handleCheckPincode = () => {
    const valid = /^[1-9][0-9]{5}$/.test(pincode);
    if (!valid) {
      setPinMsg('❌ Invalid pincode. Please enter a valid 6-digit pincode.');
      return;
    }
    const last = Number(pincode[pincode.length - 1]);
    setPinMsg(last % 2 === 0
      ? '✅ Delivery available. Estimated delivery: 3–5 days.'
      : '✅ Delivery available. Estimated delivery: 5–7 days.'
    );
  };

  // ✅ Wishlist toggle
  const handleWishlist = () => {
    if (!requireLogin()) return;

    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isWishlisted) {
      wishlist = wishlist.filter((it) => it._id !== product._id);
      setIsWishlisted(false);
    } else {
      wishlist.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images || [],
        image: product.image,
      });
      setIsWishlisted(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated")); 
  };

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!requireLogin()) return;

    if (product?.sizes?.length && !selectedSize) {
      alert("Please select a size");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(
      (it) => it._id === product._id && it.selectedSize === (selectedSize || 'FREE')
    );

    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images || [],
        image: product.image,
        selectedSize: selectedSize || 'FREE',
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  // ✅ Buy Now (🆕 merged logic: single product → checkout)
  const handleBuyNow = () => {
    if (!requireLogin()) return;

    if (product?.sizes?.length && !selectedSize) {
      alert("Please select a size");
      return;
    }

    const tempCart = [
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images || [],
        image: product.image,
        selectedSize: selectedSize || 'FREE',
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(tempCart));
    navigate("/checkout");
  };

  if (!product) return <p>Loading...</p>;

  // ✅ Product Gallery
  const gallery = (product.images && product.images.length > 0)
    ? product.images : (product.image ? [product.image] : []);
  const mainImg = gallery[selectedImg] || product.image;

  return (
    <>
      <div className="product-detail-container">
        {/* LEFT: Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImg} alt={product.name} />
          </div>
          {gallery.length > 1 && (
            <div className="thumbs">
              {gallery.map((src, idx) => (
                <button
                  key={idx}
                  className={`thumb ${idx === selectedImg ? 'active' : ''}`}
                  onClick={() => setSelectedImg(idx)}
                >
                  <img src={src} alt={`${product.name} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Info */}
        <div className="product-info-section">
          <div className="top-row">
            <h2>{product.name}</h2>
            <button 
              className={`heart-btn ${isWishlisted ? 'active' : ''}`} 
              onClick={handleWishlist}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FaHeart />
            </button>
          </div>

          <p className="price">₹{product.price}</p>

          {/* Size Selection */}
          {product.sizes?.length > 0 ? (
            <div className="sizes-wrap">
              <p className="label">Select Size:</p>
              <div className="sizes">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-chip ${selectedSize === s ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="size-info">Available: {product.sizes.join(", ")}</p>
            </div>
          ) : (
            <p className="size">Size: Free Size</p>
          )}

          <p className="description">{product.description || "No description available."}</p>

          {/* Pincode Checker */}
          <div className="pincode-checker">
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
            <button onClick={handleCheckPincode}>Check</button>
          </div>
          {pinMsg && <p className="pin-msg">{pinMsg}</p>}

          {/* Buttons */}
          <div className="product-buttons">
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="related-wrap">
          <h3>Related Products</h3>
          <div className="related-grid">
            {related.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="rel-card"
              >
                <div className="rel-img">
                  <img
                    src={(item.images && item.images[0]) || item.image}
                    alt={item.name}
                  />
                </div>
                <div className="rel-info">
                  <p className="rel-name">{item.name}</p>
                  <p className="rel-price">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProductDetail;
