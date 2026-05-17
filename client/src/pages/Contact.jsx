import { useState } from "react";
import { contactAPI } from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await contactAPI.submit(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Get In Touch</span>
        </h1>
        <p className="text-center text-gray-400 mb-16">Have questions? We'd love to hear from you</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-dark">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-primary mb-2">Location</h3>
              <p className="text-gray-400">123 Fitness Street, Gym City, GC 12345</p>
            </div>
            <div className="card-dark">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-primary mb-2">Phone</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div className="card-dark">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-primary mb-2">Email</h3>
              <p className="text-gray-400">info@gyme.com</p>
            </div>
            <div className="card-dark">
              <div className="text-4xl mb-4">🕐</div>
              <h3 className="text-xl font-bold text-primary mb-2">Hours</h3>
              <p className="text-gray-400">Mon - Sun: 6:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
            {success && (
              <div className="bg-green-900/20 border border-green-500 text-green-400 p-4 rounded-lg mb-6">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary h-40"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-neon w-full">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
