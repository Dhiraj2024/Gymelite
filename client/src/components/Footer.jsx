import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-secondary border-t border-primary/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold neon-text mb-4">⚡GYME</h3>
            <p className="text-gray-400 text-sm">
              Transform your body and elevate your spirit with our premium fitness programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/programs" className="hover:text-primary transition">Programs</Link></li>
              <li><Link to="/trainers" className="hover:text-primary transition">Trainers</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-primary font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tips" className="hover:text-primary transition">Tips</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-primary font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} GYME Fitness. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
