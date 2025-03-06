import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaClock, FaCheck } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { fetchFeaturedPackages, type Package } from "../../services/mockData";
import { useAddToCartAnimation } from "../../hooks/useAddToCartAnimation";

const PackageCard = ({ pkg }: { pkg: Package }) => {
  const dispatch = useDispatch();
  const { isAnimating, triggerAnimation } = useAddToCartAnimation();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        discountedPrice: pkg.discount
          ? pkg.price - (pkg.price * pkg.discount) / 100
          : undefined,
        image: pkg.image,
        type: "package",
      })
    );
    triggerAnimation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        {pkg.discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-lg font-semibold text-sm shadow-lg">
            {pkg.discount}% OFF
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
          <FaStar className="text-amber-400" />
          <span className="font-medium">{pkg.rating}</span>
          <span className="text-sm opacity-80">({pkg.reviews})</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-teal-600 transition-colors">
          {pkg.name}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
          <FaClock />
          <span>{pkg.duration}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-teal-50 text-teal-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {amenity}
            </span>
          ))}
          {pkg.amenities.length > 3 && (
            <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
              +{pkg.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            {pkg.discount ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  ${pkg.price}
                </span>
                <div className="text-2xl font-bold text-teal-700">
                  ${(pkg.price - (pkg.price * pkg.discount) / 100).toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold text-teal-700">
                ${pkg.price}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.9 }}
                className={`${
                  isAnimating
                    ? "bg-green-100 text-green-600 border-green-200"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200"
                } px-3 py-2 rounded-lg transition flex items-center gap-1 border shadow-sm hover:shadow`}
                title="Add to cart"
                disabled={isAnimating}
              >
                <AnimatePresence mode="wait">
                  {isAnimating ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCheck size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bag"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiOutlineShoppingBag size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="text-sm font-medium">
                  {isAnimating ? "Added" : "Add"}
                </span>
              </motion.button>

              {isAnimating && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1.8, 2],
                    opacity: [1, 0.8, 0.5, 0],
                    y: [-10, -20, -30, -40],
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 right-0 w-full h-full flex items-center justify-center text-green-500 pointer-events-none"
                >
                  <HiOutlineShoppingBag size={18} />
                </motion.div>
              )}
            </div>

            <Link
              to={`/packages/${pkg.id}`}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition shadow-sm hover:shadow"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data = await fetchFeaturedPackages();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Packages
          </h2>
          <div className="h-1 w-20 bg-teal-600 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden h-96 animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800"
        >
          Featured Packages
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-2 rounded-full"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
        >
          Discover our carefully selected packages to make your spiritual
          journey comfortable and memorable
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/packages"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg inline-block transition font-semibold"
        >
          View All Packages
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPackages;
