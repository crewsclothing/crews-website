const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🛒 POST → Save Order
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;

    // ✅ ensure customer.email lowercase
    if (orderData.customer?.email) {
      orderData.customer.email = orderData.customer.email.toLowerCase();
    }

    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ success: true, message: "Order saved", order });
  } catch (err) {
    console.error("❌ Order save error:", err);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

// 👤 GET → User Orders by Email
router.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const orders = await Order.find({ "customer.email": email }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ Fetch user orders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
});

module.exports = router;
