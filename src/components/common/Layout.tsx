import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine if a nav link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <header className="bg-base-200 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="navbar py-2">
            {/* Logo */}
            <div className="navbar-start">
              <Link to="/" className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1591800730812-b6aea2a71f4a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Omra Korbo Logo"
                  className="h-10 w-10 mr-2 rounded-full object-cover"
                />
                <span className="text-xl font-bold">Omra Korbo</span>
              </Link>

              {/* Mobile menu button */}
              <div className="dropdown lg:hidden">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
                {isMobileMenuOpen && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/" className={isActive("/") ? "active" : ""}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/packages/all"
                        className={isActive("/packages") ? "active" : ""}
                      >
                        Packages
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products"
                        className={isActive("/products") ? "active" : ""}
                      >
                        Products
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-base">
                <li>
                  <Link
                    to="/"
                    className={`${
                      isActive("/") ? "font-bold text-primary" : ""
                    } hover:text-primary-focus`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages/all"
                    className={`${
                      isActive("/packages") ? "font-bold text-primary" : ""
                    } hover:text-primary-focus`}
                  >
                    Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className={`${
                      isActive("/products") ? "font-bold text-primary" : ""
                    } hover:text-primary-focus`}
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right side - Cart, Theme, Profile */}
            <div className="navbar-end flex items-center space-x-2">
              {/* Cart with item count */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {totalItems > 0 && (
                      <span className="badge badge-sm badge-primary indicator-item">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      {totalItems} Items
                    </span>
                    <div className="card-actions">
                      <Link to="/cart" className="btn btn-primary btn-block">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle"
              >
                {theme === "light" ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>

              {/* Profile dropdown */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-10 rounded-full">
                    {isAuthenticated ? (
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.name || "User"
                        )}&background=random`}
                        alt="Profile"
                      />
                    ) : (
                      <div className="bg-primary text-primary-content grid place-items-center h-full w-full rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </label>
                {isProfileOpen && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {isAuthenticated ? (
                      <>
                        <li>
                          <span className="font-semibold">
                            {user?.name || "User"}
                          </span>
                        </li>
                        <li>
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                          <Link to="/orders">My Orders</Link>
                        </li>
                        <li>
                          <Link to="/settings">Settings</Link>
                        </li>
                        <li>
                          <button onClick={() => logout()}>Logout</button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/auth">Sign in</Link>
                        </li>
                        <li>
                          <Link to="/auth?mode=register">Register</Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-neutral text-neutral-content py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Omra Korbo</h3>
              <p>
                We provide premium Hajj and Umrah packages designed for pilgrims
                seeking comfort, convenience, and spiritual fulfillment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/packages/all" className="link link-hover">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="link link-hover">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="link link-hover">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="link link-hover">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <p>123 Pilgrim Street</p>
              <p>Dhaka, Bangladesh</p>
              <p>Email: info@omrakorbo.com</p>
              <p>Phone: +880 123 456 789</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>© {new Date().getFullYear()} Omra Korbo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
