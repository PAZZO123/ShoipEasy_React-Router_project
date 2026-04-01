import { Link } from "react-router-dom";

const MOCK_ORDERS = [
  {
    id: "ORD-4821",
    date: "March 22, 2026",
    status: "Delivered",
    total: 187,
    items: [
      { name: "Merino Wool Crewneck", qty: 1, price: 129, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=120&q=70" },
      { name: "Slim Leather Wallet",  qty: 1, price: 65,  image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=120&q=70" },
    ],
  },
  {
    id: "ORD-3904",
    date: "February 8, 2026",
    status: "Delivered",
    total: 245,
    items: [
      { name: "Leather Derby Shoe", qty: 1, price: 245, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=70" },
    ],
  },
  {
    id: "ORD-3107",
    date: "December 14, 2025",
    status: "Delivered",
    total: 174,
    items: [
      { name: "Canvas Tote Bag",      qty: 2, price: 58, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=120&q=70" },
      { name: "Ceramic Pour-Over Set",qty: 1, price: 76, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&q=70" },
    ],
  },
];

const STATUS_STYLES = {
  Delivered:  "bg-green-950 text-green-400 border-green-900",
  Shipped:    "bg-blue-950  text-blue-400  border-blue-900",
  Processing: "bg-amber-950 text-amber-400 border-amber-900",
  Cancelled:  "bg-red-950   text-red-400   border-red-900",
};

export default function Orders() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Order history</h1>
          <p className="text-stone-500 mt-1">{MOCK_ORDERS.length} orders</p>
        </div>
        <Link to="/products" className="btn-ghost text-sm px-4 py-2">
          Shop again
        </Link>
      </div>

      <div className="space-y-5">
        {MOCK_ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const statusClass = STATUS_STYLES[order.status] ?? "bg-stone-800 text-stone-400 border-stone-700";

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-stone-800">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-semibold text-stone-300">{order.id}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-stone-500">
          <span>{order.date}</span>
          <span className="font-semibold text-stone-200">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-stone-800/60">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-xl object-cover bg-stone-800 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-200 truncate">{item.name}</p>
              <p className="text-xs text-stone-500 mt-0.5">Qty: {item.qty}</p>
            </div>
            <span className="text-sm font-semibold text-stone-300 whitespace-nowrap">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
