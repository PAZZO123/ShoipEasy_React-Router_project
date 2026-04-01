import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded pages
const Home          = lazy(() => import("./pages/Home"));
const Products      = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart          = lazy(() => import("./pages/Cart"));
const Login         = lazy(() => import("./pages/Login"));
const Profile       = lazy(() => import("./pages/Profile"));
const Orders        = lazy(() => import("./pages/Orders"));
const NotFound      = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index             element={<Home />} />
            <Route path="products"   element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart"       element={<Cart />} />
            <Route path="login"      element={<Login />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="orders"  element={<Orders />} />
            </Route>

            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
