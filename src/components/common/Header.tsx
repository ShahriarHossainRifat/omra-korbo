import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../store/slices/authSlice";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span
              className={`text-amber-500 transition-colors duration-300 ${
                scrolled ? "text-amber-500" : "text-amber-400"
              }`}
            >
              Omra
            </span>
            <span
              className={`transition-colors duration-300 ${
                scrolled ? "text-teal-700" : "text-white"
              }`}
            >
              Korbo
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className={`md:hidden text-2xl transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`relative font-medium transition-colors duration-300 ${
                isActive("/")
                  ? scrolled
                    ? "text-teal-600"
                    : "text-amber-300"
                  : scrolled
                  ? "text-gray-800 hover:text-teal-600"
                  : "text-white hover:text-amber-300"
              } py-1`}
            >
              {isActive("/") && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
                />
              )}
              Home
            </Link>
            <Link
              to="/packages"
              className={`relative font-medium transition-colors duration-300 ${
                isActive("/packages")
                  ? scrolled
                    ? "text-teal-600"
                    : "text-amber-300"
                  : scrolled
                  ? "text-gray-800 hover:text-teal-600"
                  : "text-white hover:text-amber-300"
              } py-1`}
            >
              {isActive("/packages") && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
                />
              )}
              Packages
            </Link>
            <Link
              to="/products"
              className={`relative font-medium transition-colors duration-300 ${
                isActive("/products")
                  ? scrolled
                    ? "text-teal-600"
                    : "text-amber-300"
                  : scrolled
                  ? "text-gray-800 hover:text-teal-600"
                  : "text-white hover:text-amber-300"
              } py-1`}
            >
              {isActive("/products") && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
                />
              )}
              Products
            </Link>
            <Link
              to="/guides"
              className={`relative font-medium transition-colors duration-300 ${
                isActive("/guides")
                  ? scrolled
                    ? "text-teal-600"
                    : "text-amber-300"
                  : scrolled
                  ? "text-gray-800 hover:text-teal-600"
                  : "text-white hover:text-amber-300"
              } py-1`}
            >
              {isActive("/guides") && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
                />
              )}
              Resources
            </Link>
            <Link
              to="/contact"
              className={`relative font-medium transition-colors duration-300 ${
                isActive("/contact")
                  ? scrolled
                    ? "text-teal-600"
                    : "text-amber-300"
                  : scrolled
                  ? "text-gray-800 hover:text-teal-600"
                  : "text-white hover:text-amber-300"
              } py-1`}
            >
              {isActive("/contact") && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
                />
              )}
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span
                  className={`transition-colors duration-300 ${
                    scrolled ? "text-teal-600" : "text-amber-300"
                  }`}
                >
                  Hello, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary py-1.5 px-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`py-1.5 px-4 rounded-lg flex items-center gap-1.5 transition-all ${
                    scrolled
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
                  }`}
                >
                  <FaUser size={14} /> Login
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative">
              <div
                className={`p-2 rounded-full transition-all ${
                  scrolled
                    ? "text-teal-600 hover:bg-teal-50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <FaShoppingCart size={20} />
              </div>
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg border-t border-gray-100"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              to="/"
              className={`py-2 px-3 rounded-lg ${
                isActive("/")
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className={`py-2 px-3 rounded-lg ${
                isActive("/packages")
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Packages
            </Link>
            <Link
              to="/products"
              className={`py-2 px-3 rounded-lg ${
                isActive("/products")
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Products
            </Link>
            <Link
              to="/guides"
              className={`py-2 px-3 rounded-lg ${
                isActive("/guides")
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Resources
            </Link>
            <Link
              to="/contact"
              className={`py-2 px-3 rounded-lg ${
                isActive("/contact")
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className={`py-2 px-3 rounded-lg flex items-center gap-2 ${
                isActive("/cart")
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FaShoppingCart /> Cart ({items.length})
            </Link>

            <div className="border-t border-gray-100 pt-3 mt-1">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-teal-600 font-medium">
                    Hello, {user?.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-center w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Background overlay for transparent header */}
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent -z-10"></div>
      )}
    </header>
  );
};

export default Header;
