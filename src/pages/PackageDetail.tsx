import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaClock,
  FaHotel,
  FaPlane,
  FaCarSide,
  FaUtensils,
  FaWifi,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { addToCart } from "../store/slices/cartSlice";
import { packages as allPackages, type Package } from "../services/mockData";

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundPackage = allPackages.find((p) => p.id === id);
      setPkg(foundPackage || null);
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

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Package Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The package you're looking for does not exist or may have been
            removed.
          </p>
          <Link
            to="/packages"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition"
          >
            View All Packages
          </Link>
        </div>
      </div>
    );
  }

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

  const discountedPrice = pkg.discount
    ? pkg.price - (pkg.price * pkg.discount) / 100
    : null;

  return (
    <>
      <Helmet>
        <title>{pkg.name} | Omra Korbo</title>
        <meta name="description" content={pkg.description} />
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
                  to="/packages"
                  className="text-gray-500 hover:text-teal-600"
                >
                  Packages
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li className="text-teal-600 font-medium">{pkg.name}</li>
            </ul>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="relative h-96">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {pkg.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-amber-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                {pkg.limitedOffer && (
                  <div className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    Limited Time Offer - Ends Soon!
                  </div>
                )}
              </div>

              {pkg.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg font-bold">
                  {pkg.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/3"
            >
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Package Description
                </h2>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Package Highlights
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <FaHotel className="text-teal-600 mt-1" />
                    <span className="text-gray-600">
                      Comfortable accommodations close to the Holy Sites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaPlane className="text-teal-600 mt-1" />
                    <span className="text-gray-600">
                      Return flights with convenient timings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCarSide className="text-teal-600 mt-1" />
                    <span className="text-gray-600">
                      Transportation between airports, hotels, and Holy Sites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaUtensils className="text-teal-600 mt-1" />
                    <span className="text-gray-600">
                      Daily breakfast and dinner included
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaWifi className="text-teal-600 mt-1" />
                    <span className="text-gray-600">
                      Free Wi-Fi throughout your stay
                    </span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {pkg.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-teal-50 p-3 rounded-lg"
                    >
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Itinerary Overview
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Day 1-2: Arrival & Settling In
                    </h4>
                    <p className="text-gray-600">
                      Welcome at the airport, transfer to your hotel in Makkah,
                      and orientation.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Day 3-7: Makkah
                    </h4>
                    <p className="text-gray-600">
                      Perform Umrah rituals, visit historical sites, and spend
                      time in prayer at the Grand Mosque.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Day 8-12: Madinah
                    </h4>
                    <p className="text-gray-600">
                      Travel to Madinah, visit the Prophet's Mosque, and explore
                      other significant religious sites.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-700 mb-2">
                      Day 13-14: Return Journey
                    </h4>
                    <p className="text-gray-600">
                      Final prayers, check-out from hotel, transfer to airport,
                      and return flight home.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Hotels
                </h2>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                        alt="Makkah Hotel"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Grand Makkah Hotel
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <FaMapMarkerAlt />
                        <span>500m from Masjid al-Haram</span>
                      </div>
                      <p className="text-gray-600">
                        Luxurious accommodations with stunning views of the Holy
                        Mosque, offering comfort and convenience for your
                        spiritual journey.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <img
                        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
                        alt="Madinah Hotel"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Al-Madinah Plaza
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <FaMapMarkerAlt />
                        <span>300m from Al-Masjid an-Nabawi</span>
                      </div>
                      <p className="text-gray-600">
                        Elegant hotel providing easy access to the Prophet's
                        Mosque, featuring spacious rooms and excellent service
                        to enhance your stay in the holy city.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Booking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/3"
            >
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Book This Package
                </h2>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price per person</span>
                    {discountedPrice ? (
                      <div>
                        <span className="text-gray-400 line-through">
                          ${pkg.price}
                        </span>
                        <span className="text-2xl font-bold text-teal-700 ml-2">
                          ${discountedPrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-teal-700">
                        ${pkg.price}
                      </span>
                    )}
                  </div>

                  {pkg.discount && (
                    <div className="bg-red-50 text-red-600 p-2 rounded-lg text-sm mb-4">
                      Save ${((pkg.price * pkg.discount) / 100).toFixed(2)} per
                      person with our limited time offer!
                    </div>
                  )}
                </div>

                {/* Departure Date */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Departure Date
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">Select a date</option>
                    <option value="2025-04-10">April 10, 2025</option>
                    <option value="2025-05-15">May 15, 2025</option>
                    <option value="2025-06-20">June 20, 2025</option>
                    <option value="2025-07-25">July 25, 2025</option>
                  </select>
                </div>

                {/* Travelers */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Number of Travelers
                  </label>
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
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
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

                {/* Total */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${((discountedPrice || pkg.price) * quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax & Fees</span>
                    <span className="font-medium">
                      $
                      {(
                        (discountedPrice || pkg.price) *
                        quantity *
                        0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-teal-700">
                        $
                        {(
                          (discountedPrice || pkg.price) *
                          quantity *
                          1.1
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    Book Now
                  </button>
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full ${
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

                {/* Contact */}
                <div className="mt-6 text-center text-gray-600 text-sm">
                  Questions about this package?
                  <a
                    href="/contact"
                    className="text-teal-600 hover:text-teal-700 font-medium ml-1"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageDetail;
