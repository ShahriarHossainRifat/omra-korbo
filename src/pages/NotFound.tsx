import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Omra Korbo</title>
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://illustrations.popsy.co/amber/crashed-error.svg"
              alt="Page not found"
              className="w-64 h-64 mx-auto mb-6"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mb-2"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Oops! The page you're looking for cannot be found.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition inline-block"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
