const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// 🔑 Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🧾 Create Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ success: false, message: "Amount required" });

    const options = {
      amount: Math.round(amount * 100), // Rs -> paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("❌ Create order error:", err);
    return res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// ✅ Verify Payment
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const data = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(data)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified" });
    } else {
      return res.status(400).json({ success: false, message: "Signature mismatch" });
    }
  } catch (err) {
    console.error("❌ Verify error:", err);
    return res.status(500).json({ success: false, message: "Verification error" });
  }
});

module.exports = router;
