import mongoose, { Schema } from "mongoose";

// Create Schema: defined what the structure of your data look like

const menuItemSchema = new Schema(
  {
    photo: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    menuId: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const MenuItem =
  mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
