import React, { useState, useRef, useEffect } from "react";
import LazyImage from "./LazyImage";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: string | number;
  width?: string | number;
  className?: string;
}

const ImageCompare: React.FC<ImageCompareProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  height = "400px",
  width = "100%",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    let clientX: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const clampedPosition = Math.min(Math.max(position, 0), 100);

    setSliderPosition(clampedPosition);
  };

  // Add and remove event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);
    document.addEventListener("touchend", handleMouseUpGlobal);

    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
      document.removeEventListener("touchend", handleMouseUpGlobal);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height, width }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* After image (full width) */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full"
        />
        {/* After label */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
          {afterLabel}
        </div>
      </div>

      {/* Before image (partial width based on slider) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <LazyImage
          src={beforeImage}
          alt={beforeLabel}
          className="absolute top-0 left-0 w-full h-full"
          width={width}
        />
        {/* Before label */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
          {beforeLabel}
        </div>
      </div>

      {/* Slider control */}
      <div
        className="absolute inset-y-0"
        style={{ left: `calc(${sliderPosition}% - 1px)` }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-white"></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-move hover:scale-110 transition-transform"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h8m0 0l-4-4m4 4l-4 4m-4 6h8m0 0l-4-4m4 4l-4 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ImageCompare;
