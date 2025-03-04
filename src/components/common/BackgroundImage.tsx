import React, { useEffect, useState, useRef } from "react";

interface BackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  style?: React.CSSProperties;
  fixed?: boolean;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  className = "",
  children,
  overlay = false,
  overlayColor = "#000000",
  overlayOpacity = 0.5,
  style = {},
  fixed = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setLoaded(true);
    };

    img.onerror = () => {
      setError(true);
      console.error(`Failed to load background image: ${src}`);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Use Intersection Observer to only load when in viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => setLoaded(true);
          img.onerror = () => setError(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: fixed ? "fixed" : "scroll",
    backgroundColor: "#f0f0f0", // Placeholder color before the image loads
    ...style,
  };

  if (loaded) {
    containerStyle.backgroundImage = `url(${src})`;
  }

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    opacity: overlayOpacity,
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
  };

  if (error) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{ ...containerStyle, backgroundImage: "none" }}
      >
        {overlay && <div style={overlayStyle}></div>}
        <div style={contentStyle}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {overlay && <div style={overlayStyle}></div>}
      <div style={contentStyle}>{children}</div>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 bg-opacity-70">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default BackgroundImage;
