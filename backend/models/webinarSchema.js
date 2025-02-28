import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  webinarLink: {
    type: String,
    required: true,
  },
  attendees: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
      },
      attended: { type: Boolean, default: false }, // Track attendance
      certificateGenerated: { type: Boolean, default: false }, // Track if certificate was issued
    },
  ],
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

export default mongoose.model("Webinar", webinarSchema);