import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCards";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import Navbar from "../../Authpages/Navbar";
import { userProduct } from "../../stores/useProduct";

function Menu() {
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  const { cart, addToCart } = useAuthStore();
  const { menuGet, products, isLoading } = userProduct();

  useEffect(() => {
    menuGet();
  }, [menuGet]);

  useEffect(() => {
    if (products) setMenuData(products);
  }, [products]);

  const handleAddToCart = (itemId, count) => {
    if (count <= 0) return;
    addToCart(itemId, count);
  };

  const calculateTotal = () => {
    return products.reduce((total, item) => {
      if (!item || !item._id || !item.price) return total;
      const qty = cart[item._id] || 0;
      return total + item.price * qty;
    }, 0);
  };

  const goToTotalPage = () => {
    navigate("/total");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header with total and button */}
        <div className="flex justify-between items-center mb-10 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-700">
            Total: ₹{calculateTotal()}
          </h2>
          <button
            onClick={goToTotalPage}
            className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition duration-200"
          >
            View Total
          </button>
        </div>

        {/* Loader or menu cards */}
        {isLoading ? (
          <p className="text-center text-red-600 text-xl font-semibold mt-20">
            Please wait, loading from database...
          </p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuData.map((item) =>
              item ? (
                <MenuCard
                  key={item._id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ) : null
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Menu;

