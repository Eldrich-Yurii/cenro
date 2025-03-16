import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  steps: {
    formSubmitted: { type: Boolean, default: false }, // Form submission
    // receiptUploaded: { type: Boolean, default: false }, // Receipt uploaded
    receiptApproved: { type: Boolean, default: false }, // Receipt approved
    // assessmentUploaded: { type: Boolean, default: false }, // Assessment Certificate uploaded
    // webinarAttended: { type: Boolean, default: false }, // Webinar attended
    attendanceConfirmed: { type: Boolean, default: false }, // Attendance confirmed by admin
    // inspectionPassed: { type: Boolean, default: false }, // Inspection approval
    businessCertificateIssued: { type: Boolean, default: false }, // Final certificate issued
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);
