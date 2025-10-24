import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100vh", background: "#f9fafb"
    }}>
      <h1 style={{ color: "#16a34a" }}>🎉 Payment Successful!</h1>
      <p>Thank you for your order. We’ll contact you soon.</p>
      <Link to="/products"
        style={{ marginTop: "20px", padding: "10px 20px", background: "#16a34a", color: "#fff", borderRadius: "8px" }}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default ThankYou;
