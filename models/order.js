import mongoose, { Schema } from "mongoose";

// Create Schema: defined what the structure of your data look like

const orderSchema = new Schema(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    toMenuLink: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    items: [
      {
        itemName: String,
        itemPhoto: String,
        itemPrice: Number,
        itemQuantity: Number,
        itemDescription: String, // Optional: You can add any other static fields that describe the item
      },
    ],
    contactInfo: {
      customerName: String,
      customerEmail: String,
      customerPhone: String,
    },
    note: String,
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
