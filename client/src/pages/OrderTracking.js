import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrderTracking() {
  const { id } = useParams(); // orderId from URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${id}`)
      .then((res) => {
        if (res.data.success) {
          setOrder(res.data.order);
        }
      })
      .catch((err) => console.error("❌ Fetch order error:", err));
  }, [id]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Order Tracking</h2>
      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment:</strong> {order.paymentStatus}</p>
      <p><strong>Method:</strong> {order.paymentMethod}</p>

      <h3>🛍️ Items</h3>
      <ul>
        {order.items.map((item, i) => (
          <li key={i}>
            {item.name} (x{item.quantity}) – ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>👤 Customer</h3>
      <p>{order.customer?.name}</p>
      <p>{order.customer?.email}</p>
      <p>{order.customer?.phone}</p>
      <p>{order.customer?.address}</p>
    </div>
  );
}

export default OrderTracking;
