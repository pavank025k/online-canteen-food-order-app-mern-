import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../../stores/useAuthStore";
import { userProduct } from "../../stores/useProduct";
import { useHistoryStore } from "../../stores/useHistory";

const Total = () => {
  const navigate = useNavigate();

  const { cart, clearCart, authUser } = useAuthStore();
  const { products, isLoading } = userProduct();
  const { createOrderHistory } = useHistoryStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = authUser?._id;

  // Calculate total
  const total = products?.reduce((acc, item) => {
    const quantity = cart[item._id] || 0;
    return acc + item.price * quantity;
  }, 0);

  const handleBackToMenu = () => navigate("/user/userdashboard");

  const handleOrderPlace = async () => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    const orderedItems = products
      .filter((item) => cart[item._id] > 0)
      .map((item) => ({
        productId: item._id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        quantity: cart[item._id],
      }));

    if (orderedItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createOrderHistory({ userId, items: orderedItems });

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/history");
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Conditional render if cart is empty or products not yet fetched
  if (isLoading)
    return (
      <h2 className="text-center mt-10 text-lg text-gray-700 font-semibold">
        Loading products...
      </h2>
    );

  if (!products || Object.keys(cart).length === 0 || total === 0) {
    return (
      <div className="text-center mt-16 bg-white shadow-lg rounded-xl max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          🛒 Your cart is empty
        </h2>
        <button
          onClick={handleBackToMenu}
          className="mt-6 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium shadow hover:bg-emerald-700 transition"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-extrabold mb-6 text-emerald-700 text-center">
        🧾 Order Summary
      </h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <ul className="mb-6 divide-y divide-gray-200">
        {products.map((item) => {
          const qty = cart[item._id] || 0;
          if (!qty) return null;
          return (
            <li
              key={item._id}
              className="py-3 flex justify-between text-gray-700 text-lg"
            >
              <span>
                {item.name} × {qty}
              </span>
              <span className="font-medium">₹{item.price * qty}</span>
            </li>
          );
        })}
      </ul>

      <div className="text-xl font-bold mb-6 text-right text-gray-800">
        Total: <span className="text-emerald-700">₹{total}</span>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={handleBackToMenu}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
        >
          Back to Menu
        </button>
        <button
          onClick={handleOrderPlace}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 shadow"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Total;
