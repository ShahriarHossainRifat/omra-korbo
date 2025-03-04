import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/product.types";
import { useCart } from "../../context/CartContext";
import LazyImage from "../common/LazyImage";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  useCart();
  const discountedPrice =
    product.originalPrice * (1 - product.discountPercentage / 100);

  // Calculate animation delay based on index
  const animationDelay = `${index * 0.1}s`;

  return (
    <div
      className="card bg-base-100 shadow-xl hover-lift fade-in"
      style={{
        animationDelay,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <figure className="px-4 pt-4 overflow-hidden h-48">
        <LazyImage
          src={product.imageUrl}
          alt={product.name}
          className="rounded-xl transition-transform duration-500 hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute top-0 right-0 badge badge-error m-2 p-3">
            Out of Stock
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {product.discountPercentage > 0 && (
            <div className="badge badge-secondary animate-pulse">
              {product.discountPercentage}% OFF
            </div>
          )}
        </h2>
        <p className="text-sm line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm line-through opacity-60">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="badge">{product.category}</div>
        </div>
        <div className="card-actions justify-end mt-2">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-primary btn-sm btn-bounce"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
