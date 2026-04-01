import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById, getRelated } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { addItem }  = useCart();
  const product      = getProductById(id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "");
  const [selectedSize,  setSelectedSize]  = useState(product?.sizes?.[0]  ?? "");
  const [qty,           setQty]           = useState(1);
  const [added,         setAdded]         = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-6xl mb-4">🪣</p>
        <h2 className="text-2xl font-bold text-stone-100 mb-2">Product not found</h2>
        <p className="text-stone-500 mb-6">It may have been removed or the URL is wrong.</p>
        <button onClick={() => navigate("/products")} className="btn-primary">
          Browse products
        </button>
      </div>
    );
  }

  const related = getRelated(id, 3);

  const handleAddToCart = () => {
    addItem({
      id:    product.id,
      name:  product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size:  selectedSize,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link to="/" className="hover:text-stone-300 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-stone-300 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-stone-300">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-stone-900 aspect-square lg:aspect-auto lg:min-h-[480px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-amber-600 mb-2">
            {product.category}
          </span>
          {product.badge && (
            <span className="inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full text-stone-950 mb-3"
                  style={{ background: "var(--brand)" }}>
              {product.badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-5">
            <StarRow rating={product.rating} />
            <span className="text-sm text-stone-500">({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-stone-100 mb-6">${product.price}</p>

          <p className="text-stone-400 leading-relaxed mb-8">{product.description}</p>

          {/* Color selector */}
          {product.colors.length > 1 && (
            <div className="mb-6">
              <p className="text-sm text-stone-400 mb-3">
                Colour: <span className="text-stone-100 font-medium">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={[
                      "px-4 py-2 rounded-full text-sm border transition-all",
                      selectedColor === c
                        ? "border-amber-600 text-stone-100"
                        : "border-stone-700 text-stone-400 hover:border-stone-500",
                    ].join(" ")}
                    style={selectedColor === c ? { background: "rgba(200,169,126,.15)" } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes.length > 1 && (
            <div className="mb-8">
              <p className="text-sm text-stone-400 mb-3">
                Size: <span className="text-stone-100 font-medium">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={[
                      "w-12 h-10 rounded-lg text-sm font-medium border transition-all",
                      selectedSize === s
                        ? "border-amber-600 text-stone-100"
                        : "border-stone-700 text-stone-400 hover:border-stone-500",
                    ].join(" ")}
                    style={selectedSize === s ? { background: "rgba(200,169,126,.15)" } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-stone-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="w-11 h-12 flex items-center justify-center text-stone-300 hover:bg-stone-800 transition-colors text-lg"
              >
                −
              </button>
              <span className="w-10 text-center text-stone-100 font-semibold">{qty}</span>
              <button
                onClick={() => setQty((v) => v + 1)}
                className="w-11 h-12 flex items-center justify-center text-stone-300 hover:bg-stone-800 transition-colors text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary text-base py-3.5 transition-all"
              style={added ? { background: "#4ade80", color: "#052e16" } : {}}
            >
              {added ? "✓ Added to cart" : "Add to cart"}
            </button>
          </div>

          <Link
            to="/cart"
            className="mt-3 text-center text-sm text-stone-500 hover:text-stone-300 transition-colors"
          >
            View cart →
          </Link>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-stone-100 mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= Math.round(rating) ? "text-amber-400" : "text-stone-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
