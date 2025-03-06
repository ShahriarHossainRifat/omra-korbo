import { Suspense } from "react";

interface LazyLoadProps {
  children: React.ReactNode;
}

const Loading = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
  </div>
);

const LazyLoad = ({ children }: LazyLoadProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default LazyLoad;
