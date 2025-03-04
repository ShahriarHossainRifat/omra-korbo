import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="px-4 pt-4">
        <div className="h-48 w-full rounded-xl skeleton-pulse"></div>
      </div>
      <div className="card-body">
        <div className="h-6 w-2/3 skeleton-pulse rounded-md mb-2"></div>
        <div className="space-y-2">
          <div className="h-4 w-full skeleton-pulse rounded-md"></div>
          <div className="h-4 w-5/6 skeleton-pulse rounded-md"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-16 skeleton-pulse rounded-md"></div>
          <div className="h-4 w-20 skeleton-pulse rounded-md"></div>
        </div>
        <div className="card-actions justify-end mt-4">
          <div className="h-8 w-28 skeleton-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
