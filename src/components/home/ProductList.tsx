import { Link } from "react-router-dom";
import { products } from "../../services/mockData";

const ProductList = () => {
  // Display only the first 6 products for the homepage
  const displayedProducts = products.slice(0, 6);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Omra Products
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Essential items for your Omra journey
        </p>

        <div className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {displayedProducts.map((product) => {
            const discountedPrice =
              product.originalPrice * (1 - product.discountPercentage / 100);

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-40">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 truncate">
                      {product.name}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <p className="text-sm font-bold text-gray-900">
                        ${discountedPrice.toFixed(2)}
                      </p>
                      {product.discountPercentage > 0 && (
                        <p className="ml-2 text-xs text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
