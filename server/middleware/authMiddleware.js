const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Header la token eduthukkaren
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "❌ Access denied. No token provided" });
    }

    // Format: "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7, authHeader.length).trim()
      : authHeader;

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // User info attach
    req.user = verified;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(400).json({ message: "❌ Invalid Token" });
  }
};

module.exports = authMiddleware;
