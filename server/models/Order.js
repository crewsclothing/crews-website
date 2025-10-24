const mongoose = require("mongoose");

// 🛍️ Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: String,
    phone: String,
    email: { type: String, lowercase: true }, // ✅ always lowercase
    address: String,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      selectedSize: String,
      images: [String],
    },
  ],
  totals: {
    total: Number,
    delivery: Number,
    grandTotal: Number,
  },
  paymentMethod: String,
  paymentStatus: { type: String, default: "Pending" },
  razorpayId: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
