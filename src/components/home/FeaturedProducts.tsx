import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaCheck } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { fetchDiscountedProducts, type Product } from "../../services/mockData";
import { useAddToCartAnimation } from "../../hooks/useAddToCartAnimation";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const { isAnimating, triggerAnimation } = useAddToCartAnimation();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: product.image,
        type: "product",
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
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg font-semibold text-sm">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar />
            <span className="text-gray-700 font-medium">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviews})</span>
          </div>
        </div>

        <div className="text-teal-600 text-sm font-medium mb-3">
          {product.category}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <div>
            {product.discountedPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  ${product.price}
                </span>
                <div className="text-xl font-bold text-teal-700">
                  ${product.discountedPrice}
                </div>
              </>
            ) : (
              <div className="text-xl font-bold text-teal-700">
                ${product.price}
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
                } px-3 py-2 rounded-lg transition flex items-center gap-1 border`}
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
              to={`/products/${product.id}`}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchDiscountedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-80 animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            Featured Products
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-teal-600 mx-auto mt-2"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Enhance your spiritual journey with our premium products at special
            discounts
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg inline-block transition font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
