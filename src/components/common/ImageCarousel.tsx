import React, { useState } from "react";
import LazyImage from "./LazyImage";

interface ImageCarouselProps {
  images: string[];
  height?: string;
  autoplay?: boolean;
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = "400px",
  autoplay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle autoplay
  React.useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="carousel w-full rounded-box" style={{ height }}>
      {images.map((src, index) => (
        <div
          key={index}
          id={`slide${index}`}
          className={`carousel-item relative w-full ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <LazyImage
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full object-cover"
            height={height}
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={goToPrev}
              className="btn btn-circle btn-ghost bg-base-200 bg-opacity-50 hover:bg-opacity-70"
            >
              ❮
            </button>
            <button
              onClick={goToNext}
              className="btn btn-circle btn-ghost bg-base-200 bg-opacity-50 hover:bg-opacity-70"
            >
              ❯
            </button>
          </div>
        </div>
      ))}

      {/* Carousel navigation indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-base-300 opacity-70"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
