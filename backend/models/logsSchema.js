import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g., "Webinar Created", "User Approved"
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who performed the action
    //details: { type: String }, // Optional details about the action
    timestamp: { type: Date, default: Date.now }, // Automatically logs the time
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt`
);

export default mongoose.model("Log", logSchema);
