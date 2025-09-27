import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setSuccess("✅ Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Network/Server error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>📝 Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        {error && <p className="message error-msg">❌ {error}</p>}
        {success && <p className="message success-msg">{success}</p>}
      </form>
    </div>
  );
}

export default Signup;
