import MenuHistory from "../models/menuhistory.js";

// Create a new order history (one document per order with multiple products)
export const createHistory = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid request: Missing userId or items." });
    }

    const products = items.map(item => ({
      productId: item.productId,
      productName: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    }));

    const newHistory = new MenuHistory({
      userId,
      products,
      status: "waiting",
      updatedByAdmin: null,
    });

    const savedHistory = await newHistory.save();

    res.status(201).json({
      success: true,
      message: "Order history created",
      history: savedHistory,
    });
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get order history for a specific user (by userId)
export const getUserHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const history = await MenuHistory.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching user history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Admin: Update status of an entire order (ready or delivered)
export const updateHistoryStatus = async (req, res) => {
  try {
    const historyId = req.params.id;
    const { status, adminId } = req.body;

    if (!["ready", "delivered"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedHistory = await MenuHistory.findByIdAndUpdate(
      historyId,
      {
        status,
        updatedByAdmin: adminId || null,
      },
      { new: true }
    );

    if (!updatedHistory) {
      return res.status(404).json({ success: false, message: "Order history not found" });
    }

    res.json({ success: true, history: updatedHistory });
  } catch (error) {
    console.error("Error updating history status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Admin: Get all order histories, with user info populated
export const getAllHistories = async (req, res) => {
  try {
    const allHistory = await MenuHistory.find()
   
      .populate("userId", "email") // adjust fields to your User model
      .sort({ createdAt: -1 });

    res.json({ success: true, history: allHistory });
  } catch (error) {
    console.error("Error fetching all history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a specific order history by id (could add ownership or admin check)
export const deleteHistory = async (req, res) => {
  try {
    const historyId = req.params.id;
    const deleted = await MenuHistory.findByIdAndDelete(historyId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order history not found" });
    }

    res.json({ success: true, message: "Order history deleted" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
