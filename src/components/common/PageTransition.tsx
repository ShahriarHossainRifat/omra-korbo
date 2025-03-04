import React, { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Simplify the component to ensure it works without causing blank screens
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Just render the children without transitions for now to fix the blank screen
  return <>{children}</>;
};

export default PageTransition;
