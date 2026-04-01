# Chapter 12 — React Router v6 Features Applied in ShopEasy

This document maps every React Router v6 concept used in the project to the exact file(s) where it appears, explains *why* it was used, and shows the relevant code snippet.

---

## 1. `<BrowserRouter>` — The History Provider

**File:** `src/main.jsx`

```jsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
</BrowserRouter>
```

`BrowserRouter` wraps the entire tree at the very top level. It creates the HTML5 History API context that every other router hook and component depends on. It must be an ancestor of every `<Routes>`, `<Link>`, `useNavigate`, etc.

**Why here?** Because `AuthContext` and `CartContext` are siblings, not children, of the router — but they wrap `<App />` which contains all the routes. Placing `BrowserRouter` outside them means contexts can freely call `useNavigate` or `useLocation` without worrying about hook order.

---

## 2. `<Routes>` + `<Route>` — Declarative Route Tree

**File:** `src/App.jsx`

```jsx
<Routes>
  <Route element={<AppShell />}>          {/* layout route */}
    <Route index             element={<Home />} />
    <Route path="products"   element={<Products />} />
    <Route path="products/:id" element={<ProductDetail />} />
    <Route path="cart"       element={<Cart />} />
    <Route path="login"      element={<Login />} />

    <Route element={<ProtectedRoute />}>  {/* auth guard */}
      <Route path="profile"  element={<Profile />} />
      <Route path="orders"   element={<Orders />} />
    </Route>

    <Route path="*"          element={<NotFound />} />
  </Route>
</Routes>
```

### Key patterns visible here

| Pattern | What it does |
|---|---|
| **Layout route** (`element={<AppShell />}` with no `path`) | Renders Navbar + Footer around every child route via `<Outlet />` |
| **Index route** (`<Route index …>`) | Matches the parent's exact path (`/`) without adding a segment |
| **Dynamic segment** (`products/:id`) | Captures the product ID as a URL param |
| **Nested auth guard** (`<Route element={<ProtectedRoute />}>`) | Wraps private routes without adding a path segment |
| **Splat / catch-all** (`path="*"`) | Matches anything not matched above → 404 page |

---

## 3. `<Outlet>` — Nested Rendering

**File:** `src/layouts/AppShell.jsx`

```jsx
import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 page-enter">
        <Outlet />   {/* child route renders here */}
      </main>
      <Footer />
    </div>
  );
}
```

`<Outlet />` is the slot where the matched child route's element is injected. Without it, child routes would match in the URL but never render on screen. The same pattern is used inside `ProtectedRoute` to render protected children.

---

## 4. `useParams` — Dynamic URL Segments

**File:** `src/pages/ProductDetail.jsx`

```jsx
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();          // reads :id from "products/:id"
  const product = getProductById(id);  // looks up mock data
  // …
}
```

`useParams()` returns an object whose keys match the `:paramName` placeholders defined in `<Route path="products/:id">`. Navigating to `/products/3` makes `id === "3"`.

---

## 5. `useSearchParams` — Filter & Sort State in the URL

**File:** `src/pages/Products.jsx`

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();

const q        = searchParams.get("q")        ?? "";
const category = searchParams.get("category") ?? "All";
const sort     = searchParams.get("sort")     ?? "featured";

// Updating a single param while preserving the others:
const setParam = (key, value) => {
  setSearchParams((prev) => {
    const next = new URLSearchParams(prev);
    if (!value || value === "All" || value === "featured") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    return next;
  });
};
```

Storing UI state in the URL (rather than `useState`) gives users three superpowers:
- **Shareable URLs** — `/products?category=Footwear&sort=price-asc` sends exactly the same filtered view to anyone.
- **Browser back/forward** — changing a filter becomes a history entry.
- **Deep-linkable from anywhere** — the Home page category pills use `<Link to="/products?category=Apparel">`.

The functional form of `setSearchParams` (passing a callback) is critical: it reads the *current* params so that updating `sort` doesn't accidentally wipe the active `category`.

---

## 6. `useNavigate` — Programmatic Navigation

**File:** `src/pages/Login.jsx` (redirect after login)

```jsx
import { useNavigate, useLocation } from "react-router-dom";

const navigate = useNavigate();
const location = useLocation();
const from     = location.state?.from?.pathname ?? "/";

const handleSubmit = async (e) => {
  e.preventDefault();
  await login(email, password);
  navigate(from, { replace: true });  // go back to where we came from
};
```

**File:** `src/pages/NotFound.jsx` (back button)

```jsx
const navigate = useNavigate();
<button onClick={() => navigate(-1)}>← Go back</button>
```

`useNavigate` is used when navigation is triggered by an event (form submit, button click) rather than a user clicking a link. Passing `-1` to navigate mimics the browser's Back button using the session history stack.

---

## 7. `useLocation` — Reading Current Location + State

**File:** `src/pages/Login.jsx`

```jsx
const location = useLocation();
const from = location.state?.from?.pathname ?? "/";
```

**File:** `src/layouts/AppShell.jsx` (scroll-to-top on route change)

```jsx
const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, [pathname]);
```

`useLocation()` returns the current `{ pathname, search, hash, state }` object. Two uses here:

1. **`state.from`** — when `ProtectedRoute` redirects to `/login`, it passes the original location as state so Login can navigate back after success.
2. **`pathname`** as a `useEffect` dependency — whenever the route changes, scroll the page to the top. Without this, navigating from a scrolled-down product page to the cart would land you mid-page.

---

## 8. `<Navigate>` — Declarative Redirect

**File:** `src/components/ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuth } = useAuth();
  const location   = useLocation();

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}  // pass where we tried to go
        replace                     // don't add to history stack
      />
    );
  }

  return <Outlet />;
}
```

`<Navigate>` is the *component* counterpart of `navigate()`. It's ideal inside render logic — when a condition is evaluated during render and the result should be a redirect, not an event handler. The `replace` prop prevents the login page from being added to history (so "Back" after login doesn't loop back to `/login`).

---

## 9. `<Link>` — Client-Side Navigation

Used in every component and page. Key usages:

```jsx
// Basic navigation
<Link to="/products">Browse products</Link>

// Deep link with search params (Home.jsx category pills)
<Link to="/products?category=Apparel">Apparel</Link>

// Dynamic route (ProductCard.jsx)
<Link to={`/products/${product.id}`}>…</Link>

// Cart link in Navbar
<Link to="/cart">…</Link>
```

`<Link>` renders an `<a>` tag but intercepts the click to call the History API, preventing a full page reload. This keeps the SPA fast and the React tree intact (contexts, state, open components all survive navigation).

---

## 10. `<NavLink>` — Active-Aware Link

**File:** `src/components/Navbar.jsx`

```jsx
<NavLink
  to={to}
  className={({ isActive }) =>
    isActive
      ? "text-amber-500 after:w-full"   // active styles
      : "text-stone-300 hover:text-stone-100"
  }
>
  {children}
</NavLink>
```

`<NavLink>` is a specialised `<Link>` that receives an `isActive` boolean (and `isPending`) in its `className` / `style` callback. It's used in the Navbar so the current page's link is visually distinguished — here with an amber text colour and an animated underline.

---

## 11. `lazy` + `<Suspense>` — Code Splitting + Loading Spinner

**File:** `src/App.jsx`

```jsx
import { lazy, Suspense } from "react";

const Home          = lazy(() => import("./pages/Home"));
const Products      = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
// … all other pages

<Suspense fallback={<PageLoader />}>
  <Routes>…</Routes>
</Suspense>
```

`lazy()` wraps a dynamic `import()` so Vite (or any bundler) creates a separate chunk for each page. The browser only downloads a page's JavaScript when the user first navigates to it — crucial for performance in a large e-commerce app.

`<Suspense>` catches the "loading" state of those lazy chunks and renders the fallback (`<PageLoader />` — a Tailwind-animated spinner) until the chunk resolves.

---

## 12. `ErrorBoundary` — Runtime Error Recovery

**File:** `src/components/ErrorBoundary.jsx` · Used in `src/App.jsx`

```jsx
<ErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>…</Routes>
  </Suspense>
</ErrorBoundary>
```

React Router itself doesn't have a built-in error boundary, so we wrap the entire route tree in a class component boundary. If any page throws during render (e.g., a null-ref on corrupted data), the app shows a friendly recovery screen instead of a blank white page.

---

## 13. Redirect-Back-After-Login Flow (end-to-end)

This is the most important multi-file pattern in the project. The full data flow:

```
1.  User visits /profile (not logged in)
          ↓
2.  ProtectedRoute: isAuth === false
    → <Navigate to="/login" state={{ from: location }} replace />
          ↓
3.  Login page mounts:
    const from = location.state?.from?.pathname ?? "/"
    // from === "/profile"
          ↓
4.  User fills in credentials and submits
    → await login(email, password)
    → navigate(from, { replace: true })
          ↓
5.  User lands on /profile, now authenticated ✓
    History stack: [previous pages…, /profile]
    (login page is NOT in the stack due to replace:true)
```

Files involved: `ProtectedRoute.jsx` → `Login.jsx` → `AuthContext.jsx`

---

## 14. URL as Single Source of Truth for Filter State

The Products page never uses `useState` for its filter/sort UI. Everything lives in the URL:

```
/products                              → all products, default sort
/products?category=Footwear            → footwear only
/products?q=leather&sort=price-asc     → search + sort
/products?category=Apparel&sort=rating → combined filters
```

This means:
- Refreshing the page preserves all filters.
- Sharing a URL gives the exact same view.
- The browser Back button undoes filter changes.
- No `useEffect` synchronisation between URL and state is needed — `useSearchParams` *is* the state.

---

## Feature → File Quick Reference

| React Router Feature | File(s) |
|---|---|
| `<BrowserRouter>` | `main.jsx` |
| `<Routes>` / `<Route>` | `App.jsx` |
| Layout route + `<Outlet>` | `App.jsx`, `AppShell.jsx`, `ProtectedRoute.jsx` |
| Index route | `App.jsx` |
| Dynamic segment (`:id`) | `App.jsx`, `ProductDetail.jsx` |
| Catch-all (`path="*"`) | `App.jsx`, `NotFound.jsx` |
| `useParams` | `ProductDetail.jsx` |
| `useSearchParams` | `Products.jsx` |
| `useNavigate` | `Login.jsx`, `NotFound.jsx`, `Navbar.jsx` |
| `useLocation` | `Login.jsx`, `AppShell.jsx`, `ProtectedRoute.jsx` |
| `<Navigate>` | `ProtectedRoute.jsx` |
| `<Link>` | Every page + component |
| `<NavLink>` + `isActive` | `Navbar.jsx` |
| `lazy` + `<Suspense>` | `App.jsx`, `PageLoader.jsx` |
| Route state (`state.from`) | `ProtectedRoute.jsx` → `Login.jsx` |
| `navigate(-1)` (history) | `NotFound.jsx` |
| `replace` on navigate | `Login.jsx`, `ProtectedRoute.jsx` |