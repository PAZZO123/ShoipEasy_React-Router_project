import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 60% 40%, #c8a97e33, transparent)",
          }}
        />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--brand) 1px, transparent 1px), linear-gradient(90deg, var(--brand) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-2xl">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-amber-600 font-semibold mb-6">
              New Season — 2026 Collection
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6 text-stone-50">
              Wear what{" "}
              <span
                className="italic"
                style={{ color: "var(--brand)" }}
              >
                matters.
              </span>
            </h1>
            <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-lg">
              Curated essentials crafted from natural materials. Designed to last
              a lifetime, not a season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary text-base px-8 py-4">
                Shop the Collection
              </Link>
              <Link to="/products?category=New" className="btn-ghost text-base px-8 py-4">
                What's New
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-stone-500">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-stone-500 to-transparent" />
        </div>
      </section>

      {/* Category pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-stone-500 mb-6">Browse by category</p>
        <div className="flex flex-wrap gap-3">
          {["Apparel", "Footwear", "Accessories", "Home"].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="px-5 py-2.5 rounded-full border border-stone-700 text-sm font-medium text-stone-300 hover:border-amber-600 hover:text-amber-500 transition-all duration-200"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-stone-100">Featured picks</h2>
            <p className="text-stone-500 mt-1">Handpicked favourites from this season</p>
          </div>
          <Link
            to="/products"
            className="text-sm text-amber-600 hover:text-amber-400 transition-colors font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-stone-900 border-y border-stone-800 py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4 text-stone-100">
            Free shipping on orders over $150
          </h2>
          <p className="text-stone-400 mb-8">
            We partner with carbon-neutral couriers to keep your conscience as
            clear as your wardrobe.
          </p>
          <Link to="/products" className="btn-primary px-8 py-4">
            Start shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
