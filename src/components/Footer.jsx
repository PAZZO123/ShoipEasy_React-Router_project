import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shop<span style={{ color: "var(--brand)" }}>Easy</span>
            </p>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              Thoughtfully curated goods for the discerning everyday.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">Shop</p>
            <ul className="space-y-2">
              {["Products", "Cart", "Orders"].map((label) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">Account</p>
            <ul className="space-y-2">
              {["Login", "Profile"].map((label) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} ShopEasy. All rights reserved.
          </p>
          <p className="text-xs text-stone-700">Built with React Router v6 + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
