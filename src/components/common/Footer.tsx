import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-amber-300">Omra</span> Korbo
            </h3>
            <p className="mb-6 text-gray-300">
              Your trusted partner for a spiritual journey to fulfill your
              religious duties with comfort and care.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-amber-300">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-amber-300">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-amber-300" />
                <span className="text-gray-300">
                  123 Islam Road, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-amber-300" />
                <span className="text-gray-300">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-300" />
                <span className="text-gray-300">info@omrakorbo.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-amber-300">
              Newsletter
            </h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on our latest offers and packages.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-teal-800 border border-teal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg transition hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Omra Korbo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
