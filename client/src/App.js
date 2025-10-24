import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Navbar from './pages/Navbar';
import Products from './pages/Products';
import HomeOffers from './pages/HomeOffers';
import Footer from './pages/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import AddProduct from './admin/AddProduct';
import Cart from "./pages/Cart";
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";   
import ThankYou from "./pages/ThankYou";   

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <HomeOffers />
              <Footer />
            </>
          }
        />
        <Route path="/products" element={<Products searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductDetail />} /> 
        <Route path="/about" element={<AboutMe />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<MyOrders />} /> {/* ✅ My Orders route */}
        <Route path="/thank-you" element={<ThankYou />} /> 
      </Routes>
    </Router>
  );
}

export default App;
