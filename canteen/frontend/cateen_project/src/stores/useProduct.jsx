import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const userProduct = create((set, get) => ({
  products: [],
  isLoading: false,
  menuGet: async () => {
    set({ isLoading: true });
    try {
      const jj = await axiosInstanace.get("/menus/menu/get");

      set({ products: jj.data, isLoading: false });
    } catch (err) {
      console.log(err);
      toast.error("there is no items");
    }
  },
  menuAddProduct: async (products) => {
    try {
      console.log(products);
      const res = await axiosInstanace.post("/menus/menu/add", products);
      toast.success("Product added successfully");
      set({ products: [...get().products, res.data] });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Add failed");
    }
  },

  menuUpdateProduct: async (id, update) => {
    try {
      const res = await axiosInstanace.put(`/menus/menu/update/${id}`, update);
      toast.success("Update successful");
      set({
        products: get().products.map((p) => (p._id === id ? res.data : p)),
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  },
  menuDeleteProduct: async (id) => {
    try {
      console.log(id);
      await axiosInstanace.delete(`/menus/menu/delete/${id}`);
      toast.success("Delete successful");
      set({ products: get().products.filter((p) => p._id !== id) });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  },
}));
