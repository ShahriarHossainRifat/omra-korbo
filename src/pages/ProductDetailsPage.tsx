import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/product.types";
import { products } from "../services/mockData";
import { useCart } from "../context/CartContext";
import LazyImage from "../components/common/LazyImage";
import Breadcrumbs, {
  useGenerateBreadcrumbs,
} from "../components/common/Breadcrumbs";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addProduct } = useCart();
  const navigate = useNavigate();
  const breadcrumbs = useGenerateBreadcrumbs();

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id === productId);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addProduct(product, quantity);
    setAddedToCart(true);

    // Reset the added to cart message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addProduct(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-[60vh]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center bounce-in">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Product not found</h1>
              <p className="py-6">
                The product you're looking for doesn't exist or has been
                removed.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/products")}
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.originalPrice * (1 - product.discountPercentage / 100);

  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="card lg:card-side shadow-xl fade-in">
          <figure className="lg:w-1/2 fade-in-up">
            <LazyImage
              src={product.imageUrl}
              alt={product.name}
              className="object-cover h-full w-full"
            />
          </figure>
          <div
            className="card-body lg:w-1/2 fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="card-title text-3xl">{product.name}</h2>

            <div className="badge badge-primary">{product.category}</div>

            <div className="divider"></div>

            <div
              className="flex items-center mb-4 scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="text-3xl font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </span>

              {product.discountPercentage > 0 && (
                <>
                  <span className="ml-2 text-xl line-through opacity-60">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <div className="badge badge-secondary ml-2 animate-pulse">
                    {product.discountPercentage}% OFF
                  </div>
                </>
              )}
            </div>

            <p className="my-4">{product.description}</p>

            <div className="alert alert-success mt-4" hidden={!product.inStock}>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>In Stock</span>
            </div>

            <div className="alert alert-error mt-4" hidden={product.inStock}>
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Out of Stock</span>
            </div>

            <div
              className="form-control w-full max-w-xs mt-6 fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <select
                className="select select-bordered"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={!product.inStock}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="card-actions justify-end gap-4 mt-6 fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <button
                onClick={handleAddToCart}
                className="btn btn-outline btn-primary flex-1"
                disabled={!product.inStock}
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-primary flex-1"
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {addedToCart && (
        <div className="toast toast-top toast-end fade-in">
          <div className="alert alert-success">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Product added to cart successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
