import React from "react";
import { Link } from "react-router-dom";
import { Package } from "../../types/package.types";
import LazyImage from "../common/LazyImage";

interface PackageCardProps {
  pkg: Package;
  index?: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, index = 0 }) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.1}s`;

  return (
    <div
      className="card bg-base-100 shadow-xl hover-lift slide-in"
      style={{
        animationDelay,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <figure className="relative overflow-hidden" style={{ height: "200px" }}>
        <LazyImage
          src={pkg.imageUrl || "https://placehold.co/600x400?text=Package"}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {pkg.featured && (
          <div className="absolute top-0 right-0 badge badge-secondary m-2 p-3 animate-pulse">
            Featured
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pkg.name}</h2>
        <p className="line-clamp-2">{pkg.description}</p>

        {/* Rating display */}
        {pkg.rating && (
          <div className="flex items-center mt-2">
            <div className="rating rating-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${pkg.id}`}
                  className={`mask mask-star-2 ${
                    star <= Math.floor(pkg.rating || 0)
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                  checked={star === Math.round(pkg.rating || 0)}
                  readOnly
                />
              ))}
            </div>
            <span className="text-sm ml-2">
              {pkg.rating.toFixed(1)} ({pkg.reviews} reviews)
            </span>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="badge badge-outline">{pkg.duration} Days</div>
          <div className="text-xl font-bold text-primary">
            ${pkg.price.toLocaleString()}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/package/${pkg.id}`}
            className="btn btn-primary btn-sm btn-bounce"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
