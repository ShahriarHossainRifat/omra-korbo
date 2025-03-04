import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
  overlayColor?: string;
  opacity?: number;
  spinnerSize?: "xs" | "sm" | "md" | "lg";
  spinnerColor?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = "Loading...",
  fullScreen = false,
  overlayColor = "#000000",
  opacity = 0.7,
  spinnerSize = "lg",
  spinnerColor = "primary",
}) => {
  if (!isLoading) return null;

  const overlayStyle: React.CSSProperties = {
    position: fullScreen ? "fixed" : "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    opacity: opacity,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const spinnerSizeClass = `loading-${spinnerSize}`;
  const spinnerColorClass = `text-${spinnerColor}`;

  return (
    <div style={overlayStyle} className="fade-in">
      <div className="bg-base-100 bg-opacity-90 p-6 rounded-lg shadow-lg text-center">
        <span
          className={`loading loading-spinner ${spinnerSizeClass} ${spinnerColorClass} mb-4`}
        ></span>
        {message && <p className="text-base-content font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay;
