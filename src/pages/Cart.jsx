import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, setQty, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <p className="text-7xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold text-stone-100 mb-3">Your cart is empty</h2>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">Browse products</Link>
      </div>
    );
  }

  const shipping = totalPrice >= 150 ? 0 : 12;
  const total    = totalPrice + shipping;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Shopping cart</h1>
          <p className="text-stone-500 mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-stone-500 hover:text-red-400 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQtyChange={(qty) => setQty(item.id, qty)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-stone-100 mb-5">Order summary</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-stone-400">Subtotal</span>
                <span className="text-stone-200 font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Shipping</span>
                <span className={shipping === 0 ? "text-green-400 font-medium" : "text-stone-200 font-medium"}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-stone-500">
                  Add ${(150 - totalPrice).toFixed(2)} more for free shipping.
                </p>
              )}
            </div>

            <div className="border-t border-stone-800 pt-4 mb-6 flex justify-between">
              <span className="font-semibold text-stone-100">Total</span>
              <span className="font-bold text-xl text-stone-100">${total.toFixed(2)}</span>
            </div>

            <button className="w-full btn-primary py-4 text-base">
              Checkout
            </button>
            <Link to="/products" className="block text-center text-sm text-stone-500 hover:text-stone-300 mt-3 transition-colors">
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="flex gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-4">
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-xl bg-stone-800"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2 mb-1">
          <Link
            to={`/products/${item.id}`}
            className="font-semibold text-stone-100 hover:text-amber-400 transition-colors truncate"
          >
            {item.name}
          </Link>
          <span className="font-bold text-stone-100 whitespace-nowrap">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>

        <div className="flex gap-3 text-xs text-stone-500 mb-3">
          {item.color && <span>{item.color}</span>}
          {item.size && item.size !== "One Size" && <span>Size: {item.size}</span>}
          <span className="text-stone-600">${item.price} each</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Qty stepper */}
          <div className="flex items-center border border-stone-700 rounded-lg overflow-hidden">
            <button
              onClick={() => onQtyChange(item.qty - 1)}
              disabled={item.qty <= 1}
              className="w-8 h-8 flex items-center justify-center text-stone-300 hover:bg-stone-800 transition-colors disabled:opacity-30"
            >
              −
            </button>
            <span className="w-8 text-center text-sm text-stone-100 font-medium">{item.qty}</span>
            <button
              onClick={() => onQtyChange(item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-stone-300 hover:bg-stone-800 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={onRemove}
            className="text-xs text-stone-600 hover:text-red-400 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
