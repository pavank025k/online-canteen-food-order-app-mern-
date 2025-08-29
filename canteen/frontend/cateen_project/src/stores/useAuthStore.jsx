import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstanace } from "../lib/axios";

// Load user from localStorage once on store creation
const localUser = localStorage.getItem("authUser")
  ? JSON.parse(localStorage.getItem("authUser"))
  : null;

// Load cart from localStorage once on store creation
const localCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {};

export const useAuthStore = create((set, get) => ({
  authUser: localUser,
  adminUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAdminLoggingIn: false,
  menudata: [],
  isCheckingAuth: false,
  cart: localCart, // initialize cart from localStorage

  checkAuth: async () => {
    set({ isCheckingAuth: true }); // 👈 start checking
    try {
      const res = await axiosInstanace.get("/auth/check", {
        withCredentials: true, // ✅ ensure cookie is sent
      });
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false }); // 👈 done checking
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstanace.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstanace.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstanace.post("/auth/logout");
      set({ authUser: null, cart: {} });
      localStorage.removeItem("authUser");
      localStorage.removeItem("cart"); // clear cart on logout too
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  addToCart: (itemId, count) =>
    set((state) => {
      const currentCount = state.cart[itemId] || 0;
      const newCart = {
        ...state.cart,
        [itemId]: currentCount + count,
      };
      localStorage.setItem("cart", JSON.stringify(newCart)); // persist cart
      return { cart: newCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: {} });
  },

  adminlogin: async (data) => {
    set({ isAdminLoggingIn: true });
    try {
      const res = await axiosInstanace.post("/admin/login", data);
      set({ adminUser: res.data });
      localStorage.setItem("adminUser", JSON.stringify(res.data));
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
    } finally {
      set({ isAdminLoggingIn: false });
    }
  },

  adminlogout: async () => {
    try {
      await axiosInstanace.post("/admin/logout");
      set({ adminUser: null });
      localStorage.removeItem("adminUser");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin logout failed");
    }
  },
}));
