// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">🧥 CREWS Clothing</div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-contact">
          <p>📞 +91 9990343478</p>
          <p>✉️ crewsclothing@gmail.com</p>
        </div>

        <div className="footer-social">
          <a href="https://wa.me/919990343478" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://www.instagram.com/crewsclothings?igsh=MXRnZ2cxcTVrcHIzdg==" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Crews Clothing. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
