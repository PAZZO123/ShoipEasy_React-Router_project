import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuth }  = useAuth();
  const navigate           = useNavigate();
  const location           = useLocation();

  // Where to go after login — default to home
  const from = location.state?.from?.pathname ?? "/";

  const [email,    setEmail]    = useState("demo@shopeasy.com");
  const [password, setPassword] = useState("demo1234");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  // Already logged in — redirect immediately
  if (isAuth) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-2xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shop<span style={{ color: "var(--brand)" }}>Easy</span>
            </p>
            <h1 className="text-xl font-semibold text-stone-100">Welcome back</h1>
            {from !== "/" && (
              <p className="text-sm text-amber-600 mt-2">
                Sign in to continue to {from}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-950/60 border border-red-800 rounded-xl px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-stone-800/60 rounded-xl px-4 py-3 text-xs text-stone-500 text-center">
            Demo credentials are pre-filled. Just hit <strong className="text-stone-400">Sign in</strong>.
          </div>
        </div>

        <p className="text-center text-sm text-stone-600 mt-5">
          <Link to="/" className="hover:text-stone-400 transition-colors">← Back to shop</Link>
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="w-4 h-4 rounded-full border-2 border-stone-700 border-t-stone-950 inline-block"
      style={{ animation: "spin 0.7s linear infinite" }}
    />
  );
}
