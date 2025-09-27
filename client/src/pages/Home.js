import React from 'react';
import './Home.css';
import tshirt from '../tshirt.webp';
import shirt from '../shirt.webp';
import pant from '../pant.webp';
import logo from '../assets/w-banner.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const bannerImages = [
    "/images/Banner4.jpg",
    "/images/Banner2.jpg",
    "/images/Banner3.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="home-container">

      {/* 🔁 Hero Banner Section */}
      <div className="hero-banner">
        <Slider {...settings}>
          {bannerImages.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Banner ${index}`} className="banner-img" />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🛍️ Featured Products */}
      <section className="products-section">
        <h2 className='hd'>🛍️ Featured Products</h2>
        <div className="product-list">
          <div className="product-card">
            <img src={tshirt} alt="T-Shirt" />
            <h3>Cool T-Shirt</h3>
            <p>₹499</p>
          </div>
          <div className="product-card">
            <img src={shirt} alt="Dress" />
            <h3>Stylish Dress</h3>
            <p>₹999</p>
          </div>
          <div className="product-card">
            <img src={pant} alt="Jeans" />
            <h3>Classic Jeans</h3>
            <p>₹799</p>
          </div>
        </div>
      </section>


      {/* 🌿 Pure Cotton Quality Section */}
      <section className="cotton-quality">
        <div className="cotton-content">
          <img src="/images/cotton.png" alt="Pure Cotton" className="cotton-img" />
          <div className="cotton-text">
            <h2>🌿 100% Pure Cotton</h2>
            <p>
              Experience the comfort of <strong>premium cotton</strong>.
              Our fabrics are <em>soft, breathable, and eco-friendly</em> –
              perfect for every season.
            </p>
            <p>✅ Skin Friendly | ✅ Long Lasting | ✅ Sustainable</p>
          </div>
        </div>
      </section>


      {/* 🔽 New Hero Banner at Bottom
      <div className="cta-banner-container">
        <img src={logo} alt="Contact Us Banner" className="cta-banner" />

        <a
          href="https://wa.me/919990343478"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-whatsapp-btn"
        >
          💬 Chat with us on WhatsApp
        </a>
      </div> */}

      {/* 🔐 Login / Sign Up Buttons Section */}
      <section className="home-auth-buttons">
        <h2 className="hd">🔐 Access Your Account</h2>
        <div className="button-group">
          <a href="/login" className="auth-link-btn">Login</a>
          <a href="/signup" className="auth-link-btn">Sign Up</a>
        </div>
      </section>


      {/* 🏢 Franchise Enquiry Banner (WhatsApp Style) */}
      <section className="franchise-banner">
        <h2>💼 Franchise Enquiry</h2>
        <p>Start your own clothing franchise with us and grow together!</p>
        <a
          href="https://wa.me/919990343478?text=Hi%20I%20am%20interested%20in%20franchise%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="franchise-btn"
        >
          💬 Enquire Now on WhatsApp
        </a>
      </section>


    </div>


  );

}

export default Home;
