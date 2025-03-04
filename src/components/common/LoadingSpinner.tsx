import React from "react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
}) => {
  // Map sizes to class names
  const sizeClasses = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
    xl: "loading-xl",
  };

  // Map colors to class names
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    neutral: "text-neutral",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };

  return (
    <div className="flex justify-center items-center">
      <span
        className={`loading loading-spinner ${sizeClasses[size]} ${
          colorClasses[color as keyof typeof colorClasses] || ""
        }`}
      ></span>
    </div>
  );
};

export default LoadingSpinner;
