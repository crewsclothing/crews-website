// src/pages/Checkout.js
import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "ONLINE", // ✅ default ONLINE
  });

  const adminPhone = "916379112645"; // ✅ your whatsapp number

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // Totals
  const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const delivery = total > 999 || total === 0 ? 0 : 49;
  const grandTotal = total + delivery;

  // Input handler
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // ✅ COD click handler
  const handleCODClick = (e) => {
    e.preventDefault();
    alert("COD is not available. Please choose Online Payment.");
  };

  // Validate form
  const validate = () => {
    if (!form.name.trim()) return "Enter your name";
    if (!/^\d{10}$/.test(form.phone)) return "Enter valid 10-digit phone";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter valid email";
    if (!form.address.trim()) return "Enter address";
    if (!form.city.trim()) return "Enter city";
    if (!/^[1-9][0-9]{5}$/.test(form.pincode))
      return "Enter valid 6-digit pincode";
    if (cart.length === 0) return "Your cart is empty";
    return null;
  };

  // Save order
  const saveOrder = async (paymentStatus, razorpayId = null) => {
    const orderId = "ORD" + Date.now();

    const order = {
      orderId,
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: `${form.address}, ${form.city} - ${form.pincode}`,
      },
      items: cart,
      totals: { total, delivery, grandTotal },
      paymentMethod: form.paymentMethod,
      paymentStatus,
      razorpayId,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Save to backend
    await axios.post("http://localhost:5000/api/orders", order);

    // WhatsApp notify admin
    const msg = `🛍️ New Order!\n\nOrder ID: ${orderId}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nTotal: ₹${grandTotal}\nAddress: ${form.address}, ${form.city} - ${form.pincode}`;
    const whatsappURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(whatsappURL, "_blank");

    // Clear cart & redirect
    localStorage.removeItem("cart");
    navigate("/thank-you", { state: { orderId } });
  };

  // Place order
  const placeOrder = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    if (form.paymentMethod === "COD") {
      alert("COD is not available. Please choose Online Payment.");
      return;
    }

    try {
      // create razorpay order
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: grandTotal,
        }
      );

      if (!data?.success) throw new Error("Order create failed");

      const { order, key } = data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "CREWS Clothing",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              await saveOrder("Paid", response.razorpay_payment_id);
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            alert("Payment verification error");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          address: `${form.address}, ${form.city} - ${form.pincode}`,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed. Try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/products" className="btn-link">
          Continue Shopping
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="checkout-grid">
          {/* Left Form */}
          <form className="checkout-form" onSubmit={placeOrder}>
            <h3>Shipping Details</h3>
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={onChange} />
            <div className="row-2">
              <div>
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} />
              </div>
              <div>
                <label>Email</label>
                <input name="email" value={form.email} onChange={onChange} />
              </div>
            </div>
            <label>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
            />
            <div className="row-2">
              <div>
                <label>City</label>
                <input name="city" value={form.city} onChange={onChange} />
              </div>
              <div>
                <label>Pincode</label>
                <input name="pincode" value={form.pincode} onChange={onChange} />
              </div>
            </div>
            <label>Payment Method</label>
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === "COD"}
                  onChange={handleCODClick} // 🚫 show popup instead of selecting
                />{" "}
                COD
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={form.paymentMethod === "ONLINE"}
                  onChange={onChange}
                />{" "}
                Online
              </label>
            </div>
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>

          {/* Right Summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cart.map((it) => (
              <div key={it._id + it.selectedSize} className="item">
                <img src={it.images?.[0] || it.image} alt={it.name} />
                <div>
                  <p>{it.name}</p>
                  <p>Size: {it.selectedSize}</p>
                  <p>Qty: {it.quantity}</p>
                </div>
                <div>₹{it.price * it.quantity}</div>
              </div>
            ))}
            <div className="totals">
              <div>
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
              </div>
              <div className="grand">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
