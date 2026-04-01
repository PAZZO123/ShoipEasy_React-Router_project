import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-100 mb-8">Your profile</h1>

      {/* Avatar + info */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-stone-950 text-xl font-black flex-shrink-0"
          style={{ background: "var(--brand)" }}
        >
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-stone-100 text-lg">{user.name}</p>
          <p className="text-stone-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Info tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <InfoTile label="Member since" value="January 2024" />
        <InfoTile label="Total orders" value="7" />
        <InfoTile label="Loyalty tier" value="Gold" highlight />
        <InfoTile label="Saved addresses" value="2" />
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        <Link to="/orders" className="btn-primary">
          View orders
        </Link>
        <button onClick={logout} className="btn-ghost">
          Sign out
        </button>
      </div>
    </div>
  );
}

function InfoTile({ label, value, highlight }) {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">{label}</p>
      <p
        className={`text-lg font-semibold ${highlight ? "" : "text-stone-100"}`}
        style={highlight ? { color: "var(--brand)" } : {}}
      >
        {value}
      </p>
    </div>
  );
}
