import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// JWT attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const getProfile = () => API.get("/user/profile");

// Cart
export const addToCart = (data) => API.post("/cart/add", data);
export const getCart = () => API.get("/cart");

// Wishlist
export const addToWishlist = (data) => API.post("/wishlist/add", data);
export const removeFromWishlist = (data) => API.post("/wishlist/remove", data);
export const getWishlist = () => API.get("/wishlist");

export default API;
