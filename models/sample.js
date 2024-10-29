import mongoose, { Schema } from "mongoose";

// Create Schema: defined what the structure of your data look like

const sampleSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true },
);

const Sample = mongoose.models.Sample || mongoose.model("Sample", sampleSchema);

export default Sample;
