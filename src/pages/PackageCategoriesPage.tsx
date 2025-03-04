import { useParams, Link } from "react-router-dom";
import { Package } from "../types/package.types";
import { categories, packages } from "../services/mockData";
import PackageCard from "../components/packages/PackageCard";
import { useEffect, useState } from "react";

const PackageCategoriesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const category =
    categoryId !== "all"
      ? categories.find((c) => c.id === categoryId)
      : {
          name: "All Packages",
          description: "Browse all our available packages",
        };

  useEffect(() => {
    if (categoryId === "all") {
      setFilteredPackages(packages);
    } else {
      const filtered = packages.filter((pkg) => pkg.category === categoryId);
      setFilteredPackages(filtered);
    }
  }, [categoryId]);

  if (!category) {
    return (
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl font-bold">Category not found</h1>
            <p className="py-4">
              The category you're looking for does not exist.
            </p>
            <Link to="/packages/all" className="btn btn-primary">
              View All Packages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="hero bg-base-200 py-12">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">{category.name}</h1>
            <p className="py-6">{category.description}</p>
          </div>
        </div>
      </div>

      {categoryId === "all" && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Package Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{category.name}</h2>
                  <p className="mb-4">{category.description}</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/packages/${category.id}`}
                      className="btn btn-primary"
                    >
                      View Packages
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">
          {categoryId !== "all"
            ? `${category.name} Packages`
            : "Featured Packages"}
        </h2>
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>No packages found for this category.</span>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link to="/packages/all" className="btn btn-outline">
            View All Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCategoriesPage;
