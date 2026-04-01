import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-16">
      {/* Large decorative 404 */}
      <div className="relative mb-6 select-none">
        <span
          className="text-[12rem] sm:text-[16rem] font-black leading-none text-stone-800 block"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </span>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,169,126,0.15), transparent)",
          }}
        />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-3 -mt-6">
        Page not found
      </h1>
      <p className="text-stone-400 max-w-md mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={() => navigate(-1)} className="btn-ghost">
          ← Go back
        </button>
        <Link to="/" className="btn-primary">
          Return home
        </Link>
        <Link to="/products" className="btn-ghost">
          Browse products
        </Link>
      </div>
    </div>
  );
}
