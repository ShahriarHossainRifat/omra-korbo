import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-teal-900 to-emerald-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1565019011521-b0575cbb57c9"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-teal-900 to-emerald-800 opacity-70"></div>

      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md"
        >
          Begin Your Sacred Journey Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto"
        >
          Take the first step toward a spiritually enriching experience with our
          expert guidance and support.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            to="/packages"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold transition text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Packages
          </Link>
          <Link
            to="/contact"
            className="bg-white hover:bg-gray-100 text-teal-800 px-8 py-4 rounded-lg font-semibold transition text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
