export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950">
      {/* Animated ring */}
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full border-4 border-stone-800"
        />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "var(--brand)",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
      <p className="mt-5 text-sm tracking-widest uppercase text-stone-500 font-medium">
        Loading
      </p>
    </div>
  );
}
