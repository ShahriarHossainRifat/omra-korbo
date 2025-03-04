import React, { useState } from "react";
import LazyImage from "./LazyImage";

interface ImageGalleryProps {
  images: string[];
  thumbnailHeight?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  thumbnailHeight = 80,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  const goToPrevModal = () => {
    setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextModal = () => {
    setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation for the modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showModal) return;

      if (e.key === "ArrowRight") {
        goToNextModal();
      } else if (e.key === "ArrowLeft") {
        goToPrevModal();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, images.length]);

  if (!images.length) return null;

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        className="w-full h-96 rounded-lg overflow-hidden cursor-zoom-in mb-2"
        onClick={() => openModal(activeIndex)}
      >
        <LazyImage
          src={images[activeIndex]}
          alt={`Product image ${activeIndex + 1}`}
          className="w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex overflow-x-auto gap-2 pb-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`flex-shrink-0 rounded overflow-hidden transition-all duration-200 ${
                index === activeIndex
                  ? "border-2 border-primary scale-105"
                  : "border border-base-300 opacity-70 hover:opacity-100"
              }`}
              style={{ height: thumbnailHeight, width: thumbnailHeight * 1.5 }}
              onClick={() => handleThumbnailClick(index)}
            >
              <LazyImage
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal gallery */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-4xl z-10"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white"
            onClick={goToPrevModal}
          >
            &#10094;
          </button>

          <div className="w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <LazyImage
              src={images[modalIndex]}
              alt={`Image ${modalIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white"
            onClick={goToNextModal}
          >
            &#10095;
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === modalIndex
                    ? "bg-primary scale-125"
                    : "bg-white opacity-50"
                }`}
                onClick={() => setModalIndex(index)}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
