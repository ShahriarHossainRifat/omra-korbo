import React, { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  blurUp?: boolean;
  width?: string | number;
  height?: string | number;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='%23666666'%3ELoading...%3C/text%3E%3C/svg%3E",
  className = "",
  blurUp = true,
  width,
  height,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate tiny placeholder if using blur-up effect
  useEffect(() => {
    if (!blurUp) return;

    // Create a tiny placeholder for blur-up effect if not provided
    if (placeholderSrc.includes("data:image/svg")) {
      // Create a canvas to generate a tiny blurred version
      const canvas = document.createElement("canvas");
      canvas.width = 20;
      canvas.height = 12;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, 20, 12);
        setCurrentSrc(canvas.toDataURL("image/jpeg", 0.1));
      }
    }
  }, [blurUp, placeholderSrc]);

  // Check if image is already cached
  useEffect(() => {
    const img = new Image();
    img.src = src;

    const handleImageLoad = () => {
      setLoaded(true);
      setCurrentSrc(src);
      if (onLoad) onLoad();
    };

    const handleImageError = () => {
      setError(true);
      console.error(`Failed to load image: ${src}`);
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start loading the actual image when it comes into view
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setLoaded(true);
            setCurrentSrc(src);
            if (onLoad) onLoad();
          };
          img.onerror = () => {
            setError(true);
          };
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src, onLoad]);

  // Create style based on props
  const containerStyle: React.CSSProperties = {
    width: width || "100%",
    height: height || "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: loaded ? "none" : "blur(10px)",
    transition: "filter 0.3s ease-out, opacity 0.3s ease-out",
    opacity: loaded ? 1 : 0.6,
  };

  // Show fallback image if there's an error
  if (error) {
    return (
      <div style={containerStyle} className={className}>
        <div className="flex items-center justify-center w-full h-full bg-base-200">
          <svg
            className="w-12 h-12 text-base-content opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={className}>
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        style={imageStyle}
        loading="lazy"
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
