import { ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/common/Layout";
import PageTransition from "./components/common/PageTransition";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import PackageCategoriesPage from "./pages/PackageCategoriesPage";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

// Fixed ProtectedRoute to preserve location for redirect after login
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to auth page but remember where we wanted to go
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <div className="app">
      <PageTransition>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />

          <Route
            path="/packages/:categoryId"
            element={
              <Layout>
                <PackageCategoriesPage />
              </Layout>
            }
          />

          <Route
            path="/package/:packageId"
            element={
              <Layout>
                <PackageDetailsPage />
              </Layout>
            }
          />

          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />

          <Route
            path="/product/:productId"
            element={
              <Layout>
                <ProductDetailsPage />
              </Layout>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Layout>
                  <CartPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </PageTransition>
    </div>
  );
};

export default App;
