import React, { useEffect, useRef, ReactNode } from "react";

type AnimationType =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "slide-in"
  | "scale-in"
  | "bounce-in";

interface AnimateOnViewProps {
  children: ReactNode;
  animation: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const AnimateOnView: React.FC<AnimateOnViewProps> = ({
  children,
  animation,
  delay = 0,
  threshold = 0.1,
  className = "",
  once = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    // Don't initially hide the element to prevent layout shifts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimatedRef.current) return;

            // Apply animation class
            setTimeout(() => {
              if (elementRef.current) {
                elementRef.current.classList.add(animation);
                elementRef.current.style.opacity = "1";
                hasAnimatedRef.current = true;
              }
            }, delay);

            if (once) observer.unobserve(entry.target);
          } else if (!once && hasAnimatedRef.current) {
            // Remove animation when out of view if not once
            if (elementRef.current) {
              elementRef.current.classList.remove(animation);
              elementRef.current.style.opacity = "0.3";
              hasAnimatedRef.current = false;
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [animation, delay, threshold, once]);

  return (
    <div
      ref={elementRef}
      className={`${className}`}
      style={{
        willChange: "opacity, transform",
        animationFillMode: "forwards",
        opacity: 0.3, // Start semi-transparent to avoid jarring transitions
      }}
    >
      {children}
    </div>
  );
};

export default AnimateOnView;
