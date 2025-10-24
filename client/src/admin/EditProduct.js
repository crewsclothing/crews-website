import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddProduct.css'; // reuse the same CSS
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // 🔁 Fetch current product
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        const { name, price, image } = res.data;
        setName(name);
        setPrice(price);
        setImage(image);
      })
      .catch(err => {
        console.error(err);
        setMessage('❌ Failed to load product');
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        name, price, image
      });
      setMessage('✅ Product updated successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update product');
    }
  };

  return (
    <div className="add-product-container">
      <h2>✏️ Edit Product</h2>
      {message && <p className="status-msg">{message}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price (e.g. ₹799)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
