import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error);
    } else if (error.request) {
      // Request made but no response
      const networkError = new Error("Network error");
      networkError.code = error.code;
      return Promise.reject(networkError);
    } else {
      // Error in request setup
      return Promise.reject(error);
    }
  }
);

export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
  getAllUsers: () => api.get("/auth/users"), // <-- Ye line add karo
};

export const programAPI = {
  getAll: () => api.get("/programs"),
  getById: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post("/programs", data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
  like: (id) => api.post(`/programs/${id}/like`),
};

export const reviewAPI = {
  add: (data) => api.post("/reviews", data),
  getByProgram: (programId) => api.get(`/reviews/program/${programId}`),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const trainerAPI = {
  getAll: () => api.get("/trainers"),
  getById: (id) => api.get(`/trainers/${id}`),
  create: (data) => api.post("/trainers", data),
  update: (id, data) => api.put(`/trainers/${id}`, data),
  delete: (id) => api.delete(`/trainers/${id}`),
};

export const bookingAPI = {
  create: (data) => api.post("/bookings", data),
  getMyBookings: () => api.get("/bookings/my"),
  getAll: () => api.get("/bookings"),
  updatePayment: (id, data) => api.put(`/bookings/${id}/payment`, data),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export const contactAPI = {
  submit: (data) => api.post("/contact", data),
  getAll: () => api.get("/contact"),
  getById: (id) => api.get(`/contact/${id}`),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const pricingAPI = {
  getAll: () => api.get("/pricing"),
  getById: (id) => api.get(`/pricing/${id}`),
  create: (data) => api.post("/pricing", data),
  update: (id, data) => api.put(`/pricing/${id}`, data),
  delete: (id) => api.delete(`/pricing/${id}`),
};

export default api;
