import React from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const goToHistory = () => {
    navigate("/history");
  };

  const goToMenu = () => {
    navigate("/user/userdashboard"); // assuming /menu is your menu route
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-end items-center space-x-4">
      {authUser && (
        <>
          {location.pathname === "/history" ? (
            <button
              onClick={goToMenu}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Back to Menu
            </button>
          ) : (
            <button
              onClick={goToHistory}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              History
            </button>
          )}

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
