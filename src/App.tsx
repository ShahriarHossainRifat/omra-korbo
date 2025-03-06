import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { lazy } from "react";
import { store } from "./store/store";
import MainLayout from "./layouts/MainLayout";
import LazyLoad from "./components/common/LazyLoad";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Packages = lazy(() => import("./pages/Packages"));
const PackageDetail = lazy(() => import("./pages/PackageDetail"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/omra-korbo">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <LazyLoad>
                  <Home />
                </LazyLoad>
              }
            />
            <Route
              path="packages"
              element={
                <LazyLoad>
                  <Packages />
                </LazyLoad>
              }
            />
            <Route
              path="packages/:id"
              element={
                <LazyLoad>
                  <PackageDetail />
                </LazyLoad>
              }
            />
            <Route
              path="products"
              element={
                <LazyLoad>
                  <Products />
                </LazyLoad>
              }
            />
            <Route
              path="products/:id"
              element={
                <LazyLoad>
                  <ProductDetail />
                </LazyLoad>
              }
            />
            <Route
              path="guides"
              element={
                <LazyLoad>
                  <Resources />
                </LazyLoad>
              }
            />
            <Route
              path="contact"
              element={
                <LazyLoad>
                  <Contact />
                </LazyLoad>
              }
            />
            <Route
              path="login"
              element={
                <LazyLoad>
                  <Login />
                </LazyLoad>
              }
            />
            <Route
              path="register"
              element={
                <LazyLoad>
                  <Register />
                </LazyLoad>
              }
            />
            <Route
              path="cart"
              element={
                <LazyLoad>
                  <Cart />
                </LazyLoad>
              }
            />
            <Route
              path="*"
              element={
                <LazyLoad>
                  <NotFound />
                </LazyLoad>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
