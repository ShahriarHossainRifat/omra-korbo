import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css"; // Add a separate CSS file

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = React.useState(10);

  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md bounce-in">
        <h1 className="text-9xl font-bold text-error mb-4">404</h1>
        <div className="relative">
          <div className="h-px w-full bg-base-content opacity-20 absolute top-1/2"></div>
          <div className="relative bg-base-100 inline-block px-4 text-2xl font-bold">
            Page Not Found
          </div>
        </div>

        <p className="my-6">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/packages/all" className="btn btn-outline">
            Browse Packages
          </Link>
        </div>

        <p className="text-sm mt-8 text-base-content/70 fade-in">
          Auto-redirecting in{" "}
          <span className="font-bold text-primary">{countdown}</span> seconds...
        </p>

        {/* Animated compass */}
        <div className="mt-10 flex justify-center">
          <div className="compass-animation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
