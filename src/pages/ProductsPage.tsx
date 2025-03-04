import { products } from "../services/mockData";
import { Product } from "../types/product.types";
import ProductCard from "../components/products/ProductCard";
import ProductCardSkeleton from "../components/products/ProductCardSkeleton";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animateList, setAnimateList] = useState<boolean>(false);

  // Extract unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setAllProducts(products);
      setFilteredProducts(products);
      setIsLoading(false);

      // Trigger animation after a short delay
      setTimeout(() => {
        setAnimateList(true);
      }, 100);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter products when category or search changes
  useEffect(() => {
    // Reset animation when filter changes
    setAnimateList(false);

    let result = allProducts;

    if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm, allProducts]);

  return (
    <div className="container mx-auto px-4 py-16 fade-in">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>

      {/* Search and filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="form-control w-full md:max-w-xs">
          <div className="join">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered join-item w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-square join-item"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="tabs tabs-boxed">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${
                activeCategory === category ? "tab-active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ${
            animateList ? "animate-fade-in" : ""
          }`}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning bounce-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>No products found matching your criteria.</span>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
