  import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user.email.toLowerCase()}`
        );
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Loading orders...</p>;
  if (!orders.length) return <p style={{ textAlign: "center" }}>📭 No orders found</p>;

  return (
    <div className="my-orders" style={{ padding: "20px" }}>
      <h2>🛍️ My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", marginBottom: "20px" }}>
          <h3>Order ID: {order.orderId}</h3>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment:</strong> {order.paymentStatus} ({order.paymentMethod})</p>
          <p><strong>Total:</strong> ₹{order.totals?.grandTotal}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.quantity} x ₹{item.price} ({item.selectedSize})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
