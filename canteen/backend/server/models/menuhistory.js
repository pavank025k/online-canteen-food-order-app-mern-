import mongoose from "mongoose";

// Subdocument schema for individual products in an order
const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menu",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  }
});

const menuHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser", // Adjust based on your actual user model
      required: true,
    },

    // An array of ordered products
    products: {
      type: [productSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["waiting", "ready", "delivered"],
      default: "waiting",
    },

    updatedByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adminuser",
      default: null,
    },
  },
  { timestamps: true }
);

const MenuHistory = mongoose.model("History", menuHistorySchema);
export default MenuHistory;
