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
        required: false,
      },
      applicationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: false,
      }],
      confirmedAt: {
        type: Date,
        default: Date.now()
        
      }
    //   attended: { type: Boolean, default: false }, // Track attendance
    //   certificateGenerated: { type: Boolean, default: false }, // Track if certificate was issued
     },
  ],
  maxAttendees: {
    type: Number,
    default: 130,
  },
},
{ timestamps: true } // Automatically add createdAt & updatedAt

);

export default mongoose.model("Webinar", webinarSchema);