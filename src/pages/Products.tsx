import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { fetchAllProducts, type Product } from "../services/mockData";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

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
            <button
              onClick={handleAddToCart}
              className="bg-amber-50 hover:bg-amber-100 text-amber-600 px-3 py-2 rounded-lg transition flex items-center gap-1 border border-amber-200"
              title="Add to cart"
            >
              <HiOutlineShoppingBag size={18} />
              <span className="text-sm font-medium">Add</span>
            </button>
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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortBy: "recommended",
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const filteredProducts = products
    .filter(
      (product) =>
        (filters.category === "" || product.category === filters.category) &&
        (product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search.toLowerCase()))
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low-high":
          return (
            (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
          );
        case "price-high-low":
          return (
            (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
          );
        default: // recommended
          return b.discount ? 1 : -1;
      }
    });

  return (
    <>
      <Helmet>
        <title>Umrah Products | Omra Korbo</title>
        <meta
          name="description"
          content="Shop for quality Umrah-related products at great prices."
        />
      </Helmet>

      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Umrah Products
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your spiritual journey with our carefully selected
              products
            </p>
          </div>

          <div className="mb-8 bg-white rounded-xl shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="md:w-48">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={filters.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-80 animate-pulse"
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No products found
              </h2>
              <p className="text-gray-600">
                We couldn't find any products matching your search criteria.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    sortBy: "recommended",
                  })
                }
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
