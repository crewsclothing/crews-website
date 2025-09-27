const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },      // main/thumbnail image
    images: { type: [String], default: [] },       // ✅ multiple images
    category: { type: String, required: true },
    description: { type: String, required: true },
    sizes: { type: [String], required: true },     // e.g. ["S","M","L"]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
