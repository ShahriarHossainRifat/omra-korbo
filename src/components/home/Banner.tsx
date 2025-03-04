// Home components
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { packages } from "../../services/mockData";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredPackages = packages.filter((pkg) => pkg.featured);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredPackages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredPackages.length]);

  if (featuredPackages.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 h-[500px]">
      {featuredPackages.map((pkg, index) => (
        <div
          key={pkg.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${pkg.imageUrl})`,
            }}
          >
            <div className="h-full bg-black bg-opacity-40 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {pkg.name}
                </h1>
                <p className="mt-6 text-xl max-w-3xl">{pkg.description}</p>
                <div className="mt-10">
                  <Link
                    to={`/package/${pkg.id}`}
                    className="inline-block bg-green-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-green-700"
                  >
                    View Package
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {featuredPackages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
