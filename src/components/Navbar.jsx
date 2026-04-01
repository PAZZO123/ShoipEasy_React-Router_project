import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full",
          isActive ? "text-amber-500 after:w-full" : "text-stone-300 hover:text-stone-100",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { totalItems }    = useCart();
  const { isAuth, logout } = useAuth();
  const navigate           = useNavigate();
  const [open, setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-lg"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <span className="text-xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shop<span style={{ color: "var(--brand)" }}>Easy</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
          {isAuth && <NavItem to="/orders">Orders</NavItem>}
          {isAuth && <NavItem to="/profile">Profile</NavItem>}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
            >
              Sign out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
            >
              Sign in
            </NavLink>
          )}
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-stone-800 transition-colors">
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-stone-950"
                    style={{ background: "var(--brand)" }}>
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile — cart + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" onClick={close} className="relative p-2">
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-stone-950"
                    style={{ background: "var(--brand)" }}>
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg hover:bg-stone-800 transition-colors"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        style={{ background: "rgba(12,10,9,0.97)", backdropFilter: "blur(12px)" }}
      >
        <div className="px-6 py-5 flex flex-col gap-5 border-t border-stone-800">
          <NavItem to="/"         onClick={close}>Home</NavItem>
          <NavItem to="/products" onClick={close}>Products</NavItem>
          {isAuth && <NavItem to="/orders"  onClick={close}>Orders</NavItem>}
          {isAuth && <NavItem to="/profile" onClick={close}>Profile</NavItem>}
          <hr className="border-stone-800" />
          {isAuth ? (
            <button onClick={handleLogout} className="text-sm text-left text-stone-400 hover:text-stone-100">
              Sign out
            </button>
          ) : (
            <NavItem to="/login" onClick={close}>Sign in</NavItem>
          )}
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg className="w-5 h-5 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5 text-stone-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-stone-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
