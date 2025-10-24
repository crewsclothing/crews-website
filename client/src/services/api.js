import axios from "axios";

// 🔗 Axios instance with backend base URL from .env
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",  
});

// 🔐 Attach JWT token from localStorage to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Auth Endpoints
export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const getProfile = () => API.get("/user/profile");

// 🛒 Cart Endpoints
export const addToCart = (data) => API.post("/cart/add", data);
export const getCart = () => API.get("/cart");

// 💖 Wishlist Endpoints
export const addToWishlist = (data) => API.post("/wishlist/add", data);
export const removeFromWishlist = (data) => API.post("/wishlist/remove", data);
export const getWishlist = () => API.get("/wishlist");

// 🚀 Export Axios instance in case needed elsewhere
export default API;
