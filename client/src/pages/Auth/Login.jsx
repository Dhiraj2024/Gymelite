import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      // Handle different types of errors
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 404) {
        setError("User not found. Please sign up first");
      } else if (err.response?.status >= 500) {
        setError("Server error. Please try again in a moment");
      } else if (err.code === "ECONNREFUSED") {
        setError("Cannot connect to server. Please check if the server is running");
      } else if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please check your connection and try again");
      } else if (!err.response) {
        setError("Network error. Please check your connection");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="glass-effect p-8 rounded-lg">
          <h1 className="text-3xl font-bold neon-text text-center mb-2">GYME Login</h1>
          <p className="text-gray-400 text-center text-sm mb-8">Welcome back! Sign in to your account</p>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6 text-sm animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={`w-full bg-dark-tertiary border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition ${
                  validationErrors.email 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-primary/30 focus:border-primary"
                }`}
                placeholder="your@email.com"
              />
              {validationErrors.email && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={`w-full bg-dark-tertiary border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition ${
                  validationErrors.password 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-primary/30 focus:border-primary"
                }`}
                placeholder="••••••••"
              />
              {validationErrors.password && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-neon font-medium py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 hover:underline transition font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
