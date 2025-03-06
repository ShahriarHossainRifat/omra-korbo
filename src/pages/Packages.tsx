import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaClock } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { fetchAllPackages, type Package } from "../services/mockData";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }: { pkg: Package }) => {
  const dispatch = useDispatch();

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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {pkg.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg font-semibold text-sm">
            {pkg.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar />
            <span className="text-gray-700 font-medium">{pkg.rating}</span>
            <span className="text-gray-500 text-sm">({pkg.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
          <FaClock />
          <span>{pkg.duration}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
          {pkg.amenities.length > 3 && (
            <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs">
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
            <button
              onClick={handleAddToCart}
              className="bg-amber-50 hover:bg-amber-100 text-amber-600 px-3 py-2 rounded-lg transition flex items-center gap-1 border border-amber-200"
              title="Add to cart"
            >
              <HiOutlineShoppingBag size={18} />
              <span className="text-sm font-medium">Add</span>
            </button>
            <Link
              to={`/packages/${pkg.id}`}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "recommended",
  });

  useEffect(() => {
    const getPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchAllPackages();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const filteredPackages = packages
    .filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        pkg.description.toLowerCase().includes(filters.search.toLowerCase())
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <>
      <Helmet>
        <title>Umrah Packages | Omra Korbo</title>
        <meta
          name="description"
          content="Explore our wide range of Umrah packages suited for all budgets and preferences."
        />
      </Helmet>

      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Our Umrah Packages
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of carefully designed packages that
              cater to various needs and budgets
            </p>
          </div>

          <div className="mb-8 bg-white rounded-xl shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search packages..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="md:w-48">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-96 animate-pulse"
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
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No packages found
              </h2>
              <p className="text-gray-600">
                We couldn't find any packages matching your search criteria.
              </p>
              <button
                onClick={() =>
                  setFilters({ search: "", sortBy: "recommended" })
                }
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Packages;
