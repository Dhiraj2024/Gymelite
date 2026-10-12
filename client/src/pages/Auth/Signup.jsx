import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    fitnessGoal: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid registration details. Please check your input.");
      } else if (err.response?.status === 409) {
        setError("Email already exists. Try logging in instead.");
      } else {
        setError(err.response?.data?.message || err.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="glass-effect p-8 rounded-lg">
          <h1 className="text-3xl font-bold neon-text text-center mb-8">GYME Sign Up</h1>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                placeholder="Re-enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fitness Goal (Optional)</label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
              >
                <option value="">Select Goal</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Fitness">General Fitness</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-neon font-medium py-3 mt-4 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 hover:underline transition font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
