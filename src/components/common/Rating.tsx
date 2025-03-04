import React from "react";

interface RatingProps {
  value: number;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
  readOnly?: boolean;
  onChange?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = "md",
  readOnly = true,
  onChange,
}) => {
  const sizeClasses = {
    xs: "mask-star-2 w-4 h-4",
    sm: "mask-star-2 w-5 h-5",
    md: "mask-star-2 w-6 h-6",
    lg: "mask-star-2 w-8 h-8",
  };

  const handleRatingClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="rating rating-half">
      {[...Array(max * 2)].map((_, index) => {
        const ratingValue = (index + 1) / 2;
        const filled = ratingValue <= value;
        const halfStar = index % 2 === 0; // Even indices are half stars

        return (
          <input
            key={index}
            type="radio"
            name="rating-10"
            className={`bg-yellow-400 ${sizeClasses[size]} ${
              halfStar ? "mask-half-1" : "mask-half-2"
            } ${filled ? "opacity-100" : "opacity-20"}`}
            checked={value === ratingValue}
            onChange={() => handleRatingClick(ratingValue)}
            disabled={readOnly}
          />
        );
      })}
    </div>
  );
};

export default Rating;
