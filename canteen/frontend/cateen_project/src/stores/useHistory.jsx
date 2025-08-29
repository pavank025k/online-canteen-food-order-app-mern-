import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const useHistoryStore = create((set, get) => ({
  history: [],
  userHistory: [],
  isLoading: false,

  /**
   * Create order history
   * @param {Object} orderData - Must include userId and items[]
   */
  createOrderHistory: async ({ userId, items }) => {
    if (!userId || !Array.isArray(items) || items.length === 0) {
      toast.error("Invalid order data.");
      return;
    }

    try {
      set({ isLoading: true });
      console.log(userId);
      const response = await axiosInstanace.post("/history/create", {
        userId,
        items,
      });
      toast.success("Order placed successfully!");
      return response.data;
    } catch (error) {
      console.error("Failed to create order history:", error);
      toast.error("Failed to place order");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Admin: Fetch all order histories
   */
  fetchAllHistories: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstanace.get("/history/all");
      console.log(response.data);
      set({ history: response.data.history || [] });
    } catch (error) {
      console.error("Failed to fetch all histories:", error);
      toast.error("Failed to load admin order history");
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Fetch history for a specific user
   * @param {string} userId
   */
  fetchUserHistory: async (userId) => {
    if (!userId) return;
    try {
      set({ isLoading: true });
      const response = await axiosInstanace.get(`/history/user/${userId}`);
      set({ userHistory: response.data.history || [] });
    } catch (error) {
      console.error("Failed to fetch user history:", error);
      set({ userHistory: [] });
      toast.error("Could not load your order history");
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Admin: Update the status of a single order item
   * @param {string} historyId
   * @param {string} status - "ready" or "delivered"
   * @param {string} adminId - Optional
   */
  updateOrderStatus: async (historyId, status, adminId = null) => {
    if (!["ready", "delivered"].includes(status)) {
      toast.error("Invalid status update.");
      return;
    }

    try {
      set({ isLoading: true });
      const response = await axiosInstanace.put(
        `/history/update-status/${historyId}`,
        { status, adminId }
      );

      // Update local state
      set((state) => ({
        history: state.history.map((h) =>
          h._id === historyId ? response.data.history : h
        ),
      }));

      toast.success(`Order marked as ${status}`);
    } catch (error) {
      console.error("Failed to update history status:", error);
      toast.error("Failed to update status");
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Delete an order history item (only allowed for "delivered" ones)
   * @param {string} orderId
   */
  deleteOrder: async (orderId) => {
    if (!orderId) return;

    try {
      set({ isLoading: true });
      await axiosInstanace.delete(`/history/delete/${orderId}`);

      set((state) => ({
        userHistory: state.userHistory.filter((order) => order._id !== orderId),
      }));

      toast.success("Order removed from history");
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order");
    } finally {
      set({ isLoading: false });
    }
  },
}));
