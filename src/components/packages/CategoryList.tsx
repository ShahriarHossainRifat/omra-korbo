// Package components
import { Link } from "react-router-dom";
import { categories } from "../../services/mockData";

const CategoryList = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Package Categories
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Choose the right Omra package that suits your needs and budget
        </p>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white overflow-hidden shadow-lg rounded-lg"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {category.description}
                </p>
                <div className="mt-6">
                  <Link
                    to={`/packages/${category.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Packages
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
