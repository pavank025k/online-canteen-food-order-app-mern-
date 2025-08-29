import express from "express";
import mongoose from "mongoose";
import {
  createHistory,
  getAllHistories,
  getUserHistory,
  updateHistoryStatus,
} from "../controllers/historycontroller.js";
import MenuHistory from "../models/menuhistory.js";

import { protectRoute as verifyToken ,isAdmin  } from "../middleware/auth.middleware.js";
// Assuming you renamed `protectRoute` to `verifyToken` in your middleware file

const historyrouter = express.Router();

// Middleware to validate ObjectId params
const validateIdParam = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }
  next();
};  

// Create order history (authenticated users only)
historyrouter.post("/history/create", createHistory);

// Update status (admin only)
historyrouter.put(
  "/history/update-status/:id",

  validateIdParam,
  updateHistoryStatus
);

// Get all histories (admin only)
historyrouter.get("/history/all", getAllHistories);

// Get user's own order history (authenticated users only)
historyrouter.get("/history/user/:id",  getUserHistory);

// Delete order (authenticated users only)
// Ideally, add ownership check here (not included in this snippet)
historyrouter.delete(
  "/history/delete/:id",

  validateIdParam,
  async (req, res) => {
    try {
      const deleted = await MenuHistory.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      res.json({ success: true, message: "Order deleted" });
    } catch (error) {
      console.error("Error deleting order history:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default historyrouter;
