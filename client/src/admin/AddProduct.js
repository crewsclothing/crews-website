import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageList, setImageList] = useState(''); // ✅ multiple URLs (comma/line separated)
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // parse list → array
    const imagesArray = imageList
      .split(/[\n,]/)
      .map((u) => u.trim())
      .filter(Boolean);

    // fallback: if no imagesArray, at least use single `image`
    const payload = {
      name,
      price,
      image,                 // main image (thumbnail)
      images: imagesArray.length ? imagesArray : (image ? [image] : []),
      category,
      description,
      sizes,
    };

    if (!payload.name || !payload.price || !payload.category || !payload.description || payload.sizes.length === 0 || (!payload.image && payload.images.length === 0)) {
      setMessage('❌ All fields are required (include at least one image)!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', payload);
      setMessage('✅ Product added successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add product');
    }
  };

  return (
    <div className="add-product-container">
      <h2>➕ Add New Product</h2>
      {message && <p className="status-msg">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Price (e.g. ₹799)" value={price} onChange={(e) => setPrice(e.target.value)} />

        <input type="text" placeholder="Main Image URL (thumbnail)" value={image} onChange={(e) => setImage(e.target.value)} />

        <textarea
          placeholder="Additional Image URLs (comma or new line separated)"
          value={imageList}
          onChange={(e) => setImageList(e.target.value)}
          rows={4}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
          <option value="innerwear">Innerwear</option>
        </select>

        <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="size-buttons">
          <p>Select Sizes:</p>
          {allSizes.map((size) => (
            <button
              type="button"
              key={size}
              className={sizes.includes(size) ? 'size-btn selected' : 'size-btn'}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
