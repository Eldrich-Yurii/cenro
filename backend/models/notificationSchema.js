import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["certificate", "application_update", "webinar confirmation"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Defaults to unread
    },
    link: {
      type: String, // Optional: link to a page (e.g., certificate download)
      default: "",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Notification", notificationSchema)