import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🚀 Fetch products on load
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // 🗑️ Delete product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          setProducts(prev => prev.filter(item => item._id !== id));
        })
        .catch(err => console.error('Delete error:', err));
    }
  };

  return (
    <div className="dashboard-container">
      <h2>🧥 Admin Dashboard</h2>
      <button className="add-btn" onClick={() => navigate('/admin/add')}>
        ➕ Add New Product
      </button>

      <table>
        <thead>
          <tr>
            <th>🖼️ Image</th>
            <th>📛 Name</th>
            <th>💰 Price</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="4">No products found.</td></tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td><img src={product.image} alt={product.name} width="60" /></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => navigate(`/admin/edit/${product._id}`)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">🗑️ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
