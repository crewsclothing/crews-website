import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1>📞 Contact Us</h1>
      <p>We'd love to hear from you! Connect with us on your favorite platform.</p>

      <div className="contact-links">

        <a
          href="https://wa.me/919990343478"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn whatsapp"
        >
          💬 WhatsApp
        </a>

        <a
          href="https://www.facebook.com/share/1YaWRURwNt/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn facebook"
        >
          👍 Facebook
        </a>

        <a
          href="https://www.instagram.com/crewsclothings?igsh=MXRnZ2cxcTVrcHIzdg=="
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn instagram"
        >
          📸 Instagram
        </a>

        <a
          href="https://youtube.com/@crewsclothings?si=GjelR64VBskMdo75"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn youtube"
        >
          ▶️ YouTube
        </a>

        <a
          href="crewsclothing@gmail.com"
          className="contact-btn email"
        >
          📧 Email Us
        </a>

      </div>
    </div>
  );
}

export default Contact;
