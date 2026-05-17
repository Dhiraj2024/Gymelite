import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PROGRAMS", path: "/programs" },
    { name: "TRAINERS", path: "/trainers" },
    { name: "TESTIMONIALS", path: "/testimonials" },
    { name: "PRICING", path: "/pricing" },
    { name: "TIPS", path: "/tips" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="bg-dark-secondary border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-3xl">⚡</span>
            <span className="text-xl sm:text-2xl font-black neon-text">GYME</span>
          </Link>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs sm:text-sm text-gray-300 hover:text-primary transition font-medium whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-shrink-0">
            {user ? (
              <>
                <div className="text-gray-400 text-xs sm:text-sm">
                  Welcome, <span className="text-primary">{user.name}</span>
                </div>
                {user.isAdmin && (
                  <Link to="/admin" className="btn-neon text-xs sm:text-sm px-3 py-2">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-outline-neon text-xs sm:text-sm px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline-neon text-xs sm:text-sm px-3 py-2">
                  Login
                </Link>
                <Link to="/signup" className="btn-neon text-xs sm:text-sm px-3 py-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Visible only on mobile and tablet */}
          <div className="lg:hidden flex items-center gap-4">
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="text-primary hover:text-primary/80 text-sm"
                onClick={handleLinkClick}
              >
                Admin
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-primary/80 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Visible only when isOpen is true on mobile */}
      {isOpen && (
        <div className="lg:hidden bg-dark-tertiary border-t border-primary/20 animate-slide-up">
          <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-dark/50 transition rounded-lg font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-700 pt-4 mt-4 space-y-3">
              {user ? (
                <>
                  <div className="px-4 text-gray-400 text-sm">
                    Welcome, <span className="text-primary">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline-neon w-full text-sm py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="btn-outline-neon w-full block text-center text-sm py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleLinkClick}
                    className="btn-neon w-full block text-center text-sm py-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
