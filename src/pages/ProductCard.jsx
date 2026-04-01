import { Link } from "react-router-dom";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-3 h-3 ${n <= Math.round(rating) ? "text-amber-400" : "text-stone-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-stone-500 ml-1">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { id, name, category, price, rating, image, badge } = product;

  return (
    <Link to={`/products/${id}`} className="card group block">
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-800">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-stone-950"
                style={{ background: "var(--brand)" }}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{category}</p>
        <h3 className="font-semibold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug mb-2">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <StarRating rating={rating} />
          <span className="font-bold text-stone-100">${price}</span>
        </div>
      </div>
    </Link>
  );
}
