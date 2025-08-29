import React, { useEffect } from "react";
import Navbar from "../../Authpages/Navbar";
import { useAuthStore } from "../../stores/useAuthStore";
import { useHistoryStore } from "../../stores/useHistory";
import toast from "react-hot-toast";

function OrderHistory() {
  const user = useAuthStore((state) => state.authUser);
  const { userHistory, fetchUserHistory, loading, deleteOrder } =
    useHistoryStore();

  useEffect(() => {
    if (user?._id) {
      fetchUserHistory(user._id).catch((err) => {
        console.error("Failed to fetch user history:", err);
        toast.error("Failed to load order history.");
      });
    }
  }, [fetchUserHistory, user?._id]);

  const handleDelete = (orderId, status) => {
    if (status !== "delivered") {
      toast.error("You can only delete delivered orders.");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to remove this order from your history?"
      )
    ) {
      deleteOrder(orderId);
    }
  };

  if (!user?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Please log in to view your history.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-extrabold mb-6 text-emerald-800">
          My Order History
        </h2>

        {loading && (
          <p className="text-center text-emerald-700">Loading your orders...</p>
        )}

        {!loading && userHistory?.length === 0 && (
          <p className="text-center text-emerald-700">No past orders found.</p>
        )}

        <div className="space-y-8">
          {userHistory
            ?.slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-emerald-800">
                    Order Placed:{" "}
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full text-white ${
                      order.status === "delivered"
                        ? "bg-green-600"
                        : order.status === "ready"
                        ? "bg-yellow-600"
                        : "bg-blue-600"
                    }`}
                  >
                    Status: {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(order.products || []).map((product) => (
                    <div
                      key={product.productId}
                      className="flex border rounded-xl p-4 bg-emerald-50"
                    >
                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/150?text=No+Image"
                        }
                        alt={product.productName || "Product Image"}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-emerald-800">
                            {product.productName}
                          </h4>
                          <p className="text-emerald-700">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-emerald-700">
                            Price: ₹{product.price} each
                          </p>
                        </div>
                        <p className="text-emerald-800 font-semibold">
                          Total: ₹{product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(order.products || []).length === 0 && (
                    <p className="text-emerald-600 col-span-full">
                      No products found for this order.
                    </p>
                  )}
                </div>

                <p className="text-xl font-bold mt-4 text-right text-emerald-800">
                  Order Total: ₹
                  {(order.products || []).reduce(
                    (sum, product) => sum + product.price * product.quantity,
                    0
                  )}
                </p>

                {order.status === "delivered" && (
                  <button
                    onClick={() => handleDelete(order._id, order.status)}
                    className="mt-6 w-full bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete Order"}
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;

