import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, products } from "../data/products";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q        = searchParams.get("q")        ?? "";
  const category = searchParams.get("category") ?? "All";
  const sort     = searchParams.get("sort")     ?? "featured";

  // --- helpers ---
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

  // --- derived product list ---
  const filtered = useMemo(() => {
    let list = [...products];

    if (q) {
      const lq = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lq) ||
          p.category.toLowerCase().includes(lq)
      );
    }

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [q, category, sort]);

  const hasFilters = q || category !== "All" || sort !== "featured";

  const clearAll = () => setSearchParams({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-100 mb-1">Products</h1>
        <p className="text-stone-500">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          {q ? ` matching "${q}"` : ""}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setParam("category", cat)}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                category === cat
                  ? "text-stone-950 border-amber-600"
                  : "text-stone-400 border-stone-700 hover:border-stone-500",
              ].join(" ")}
              style={category === cat ? { background: "var(--brand)", borderColor: "var(--brand)" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="input-field sm:w-52"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-stone-500 uppercase tracking-wider">Active filters:</span>
          {q && (
            <FilterTag label={`"${q}"`} onRemove={() => setParam("q", "")} />
          )}
          {category !== "All" && (
            <FilterTag label={category} onRemove={() => setParam("category", "All")} />
          )}
          {sort !== "featured" && (
            <FilterTag
              label={SORT_OPTIONS.find((o) => o.value === sort)?.label ?? sort}
              onRemove={() => setParam("sort", "featured")}
            />
          )}
          <button onClick={clearAll} className="text-xs text-amber-600 hover:text-amber-400 transition-colors ml-2">
            Clear all
          </button>
        </div>
      )}

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold text-stone-300 mb-2">No products found</h3>
          <p className="text-stone-500 mb-6">Try adjusting your filters.</p>
          <button onClick={clearAll} className="btn-primary">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-full px-3 py-1 text-xs text-stone-300">
      {label}
      <button onClick={onRemove} className="text-stone-500 hover:text-stone-200 transition-colors">✕</button>
    </span>
  );
}
