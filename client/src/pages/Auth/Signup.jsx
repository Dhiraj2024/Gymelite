import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address: "",
    passport: null,
    fitnessGoal: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passportPreview, setPassportPreview] = useState(null);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, passport: reader.result }));
        setPassportPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await signup(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <div className="glass-effect p-8 rounded-lg">
          <h1 className="text-3xl font-bold neon-text text-center mb-8">GYME Sign Up</h1>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                placeholder="Your Name"
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
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                placeholder="Your Address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Passport Photo</label>
              <input
                type="file"
                name="passport"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
              />
              {passportPreview && (
                <div className="mt-2 rounded-lg overflow-hidden h-24 w-24">
                  <img src={passportPreview} alt="Passport Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fitness Goal</label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
              >
                <option value="">Select Goal</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Fitness">General Fitness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
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
                className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-neon font-medium mt-6"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
