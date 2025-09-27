const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🔁 GET all products
router.get("/", async (req, res) => {
  try {
    const all = await Product.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📂 GET by category
router.get("/category/:cat", async (req, res) => {
  try {
    const category = req.params.cat;
    const items = await Product.find({ category }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Category fetch failed" });
  }
});

// 👁️ GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🧩 GET related products for a product ID
router.get("/:id/related", async (req, res) => {
  try {
    const current = await Product.findById(req.params.id);
    if (!current) return res.status(404).json({ error: "Product not found" });

    const related = await Product.find({
      category: current.category,
      _id: { $ne: current._id },
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(related);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});

// ➕ POST add new product (now supports images)
router.post("/", async (req, res) => {
  try {
    const { name, price, image, images = [], category, description, sizes } = req.body;

    const payload = {
      name,
      price,
      image,
      // if images given use them, else fallback to single image as array
      images: Array.isArray(images) && images.length ? images : (image ? [image] : []),
      category,
      description,
      sizes,
    };

    const newProduct = new Product(payload);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Add product failed:", err);
    res.status(400).json({ error: "Add product failed" });
  }
});

// ✏️ PUT update product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, image, images = [], category, description, sizes } = req.body;

    const update = {
      ...(name && { name }),
      ...(price && { price }),
      ...(image && { image }),
      ...(category && { category }),
      ...(description && { description }),
      ...(sizes && { sizes }),
    };

    if (Array.isArray(images)) update.images = images;

    const updated = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// ❌ DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
