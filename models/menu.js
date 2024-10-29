import mongoose, { Schema } from "mongoose";

// Create Schema for DB Collection

const menuSchema = new Schema(
  {
    uniqueMenuId: {
      type: String, // Used as unique path for this menu
      trim: true,
      required: true,
      unique: true,
    },
    avatar: String,
    title: {
      type: String,
      minLength: 1,
      maxLength: 300,
    },
    intro: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
      },
    ],
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem", // Reference to the MenuItem model
      },
    ],
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
