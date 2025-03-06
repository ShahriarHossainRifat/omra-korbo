import { useState } from "react";

export const useAddToCartAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Animation duration plus a little buffer
  };

  return {
    isAnimating,
    triggerAnimation,
  };
};
