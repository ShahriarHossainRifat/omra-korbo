import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { packages } from "../services/mockData";
import { Package } from "../types/package.types";
import ImageCarousel from "../components/common/ImageCarousel";
import Breadcrumbs, {
  useGenerateBreadcrumbs,
} from "../components/common/Breadcrumbs";

// Mock additional images for packages
const getPackageImages = (packageId: string) => {
  const baseImages = [
    "https://images.unsplash.com/photo-1537427232273-219572b1d4c4?q=80&w=2070",
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574",
    "https://images.unsplash.com/photo-1569102775322-5ced58441059?q=80&w=2574",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070",
  ];

  // Add the package's main image first, then the baseImages
  const pkg = packages.find((p) => p.id === packageId);
  return pkg ? [pkg.imageUrl, ...baseImages] : baseImages;
};

const PackageDetailsPage = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [addedToCart, setAddedToCart] = useState(false);
  const { addPackage } = useCart();
  const navigate = useNavigate();
  const breadcrumbs = useGenerateBreadcrumbs();
  const packageImages = packageId
    ? getPackageImages(packageId).filter(
        (img): img is string => img !== undefined
      )
    : [];

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundPackage = packages.find((p) => p.id === packageId);
      setPkg(foundPackage || null);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [packageId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (!pkg) return;
    addPackage(pkg, quantity);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleBookNow = () => {
    if (!pkg) return;
    addPackage(pkg, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-lg">Loading package details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center bounce-in">
            <div>
              <h1 className="text-3xl font-bold">Package not found</h1>
              <p className="py-4">
                The package you're looking for does not exist.
              </p>
              <Link to="/packages/all" className="btn btn-primary">
                Browse Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4 fade-in" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column with images */}
          <div className="lg:col-span-2 fade-in-up">
            <div className="bg-base-200 rounded-box overflow-hidden">
              <ImageCarousel images={packageImages} height="400px" />
            </div>

            <div className="mt-8 mb-4 tabs tabs-boxed">
              <button
                className={`tab ${
                  activeTab === "overview" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`tab ${
                  activeTab === "included" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("included")}
              >
                What's Included
              </button>
              <button
                className={`tab ${
                  activeTab === "not-included" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("not-included")}
              >
                Not Included
              </button>
            </div>

            <div
              className="bg-base-100 p-6 rounded-box shadow-md fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Package Overview
                  </h3>
                  <p className="mb-6">{pkg.description}</p>

                  <h4 className="font-semibold text-lg mb-2">Duration</h4>
                  <div className="flex items-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{pkg.duration} Days</span>
                  </div>

                  <div className="divider"></div>

                  <div className="flex flex-wrap justify-around text-center">
                    <div className="badge badge-lg p-4 m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Top Locations
                    </div>
                    <div className="badge badge-lg p-4 m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Quality Accommodation
                    </div>
                    <div className="badge badge-lg p-4 m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      24/7 Support
                    </div>
                    <div className="badge badge-lg p-4 m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Expert Guidance
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "included" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.included.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center stagger-item stagger-item-appear"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-success"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "not-included" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Not Included</h3>
                  <ul className="space-y-2">
                    {pkg.notIncluded.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center stagger-item stagger-item-appear"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-error"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right column with booking details */}
          <div
            className="lg:col-span-1 fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="card bg-base-100 shadow-xl sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{pkg.name}</h2>
                <div className="flex items-center mb-2">
                  <div className="rating rating-sm mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${pkg.id}-card`}
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
                  <span className="text-sm">
                    {pkg.rating?.toFixed(1)} ({pkg.reviews} reviews)
                  </span>
                </div>

                <div className="text-3xl font-bold text-primary my-4">
                  ${pkg.price.toLocaleString()}
                  <span className="text-sm text-base-content">
                    {" "}
                    / per person
                  </span>
                </div>

                <div className="divider"></div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Number of People</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-base-200 p-4 rounded-box my-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per person</span>
                    <span>${pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>People</span>
                    <span>x {quantity}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(pkg.price * quantity).toLocaleString()}</span>
                  </div>
                </div>

                <div className="card-actions flex-col gap-2 mt-2">
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-outline btn-primary btn-block"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBookNow}
                    className="btn btn-primary btn-block"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {addedToCart && (
        <div className="toast toast-top toast-end">
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
            <span>Package added to cart!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetailsPage;
