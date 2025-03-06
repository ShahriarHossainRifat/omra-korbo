import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { addToCart } from "../store/slices/cartSlice";
import { products as allProducts, type Product } from "../services/mockData";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Additional product images (simulated)
  const productImages = [
    { id: 0, url: product?.image || "" },
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?flip=true",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80",
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = allProducts.find((p) => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="h-96 bg-white rounded-xl shadow-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for does not exist or may have been
            removed.
          </p>
          <Link
            to="/products"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }

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

    // Show animation
    setAddedToCart(true);

    // Reset after animation
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Omra Korbo</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs mb-6">
            <ul className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-500 hover:text-teal-600"
                >
                  Products
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li className="text-teal-600 font-medium">{product.name}</li>
            </ul>
          </div>

          {/* Product Details */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                <img
                  src={productImages[selectedImage].url}
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              <div className="flex gap-2">
                {productImages.map((img, index) => (
                  <div
                    key={img.id}
                    className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index
                        ? "border-teal-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-2">
                  <span className="text-teal-600 font-medium">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>

                <div className="mb-6">
                  {product.discountedPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-teal-700">
                        ${product.discountedPrice}
                      </span>
                      <span className="text-gray-500 line-through text-xl">
                        ${product.price}
                      </span>
                      <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md">
                        {product.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-teal-700">
                      ${product.price}
                    </span>
                  )}
                </div>

                <div className="border-t border-b py-6 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <FaCheck className="text-teal-600" />
                      <span className="text-gray-700">
                        Premium quality materials
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheck className="text-teal-600" />
                      <span className="text-gray-700">
                        Designed for comfort and durability
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheck className="text-teal-600" />
                      <span className="text-gray-700">
                        Perfect for your spiritual journey
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 font-medium w-24">
                      Quantity:
                    </span>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
                        className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-20 py-2 border-y border-gray-300 text-center"
                      />
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium w-24">
                      In Stock:
                    </span>
                    <span className="text-green-600 font-medium">
                      Yes (50+ items)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 ${
                      addedToCart
                        ? "bg-green-100 text-green-600 border-green-200"
                        : "bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200"
                    } font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border`}
                    disabled={addedToCart}
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          <FaCheck size={20} />
                          <span>Added to Cart</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="bag"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          <HiOutlineShoppingBag size={20} />
                          <span>Add to Cart</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <FaTruck className="text-teal-600" />
                    <span className="text-gray-700 text-sm">
                      Free shipping worldwide
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUndo className="text-teal-600" />
                    <span className="text-gray-700 text-sm">
                      30-day easy returns
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-teal-600" />
                    <span className="text-gray-700 text-sm">
                      2-year warranty
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-xl shadow-md mb-12">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Product Description
              </h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-700 mb-4">
                Our {product.name} is designed with the pilgrim's needs in mind.
                It combines functionality, comfort, and durability to enhance
                your spiritual journey. Made from premium materials, it's built
                to last and provide exceptional value.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you're performing Umrah for the first time or are a
                seasoned pilgrim, this product will be an essential companion
                that meets all your requirements during the sacred journey.
              </p>

              <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
                Key Features
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Crafted from high-quality materials for durability</li>
                <li>Lightweight and easy to carry during your travels</li>
                <li>
                  Thoughtfully designed for the specific needs of pilgrims
                </li>
                <li>Versatile and practical for various situations</li>
                <li>Aesthetically pleasing with elegant design elements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
