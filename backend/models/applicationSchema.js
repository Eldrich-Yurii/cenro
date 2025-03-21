import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the normal user's account
      required: false,
    },
    accountNumber: {
      type: String,
      required: false,
    },
    ownerName: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: false,
    },
    formType: {
      type: String,
      enum: ["New Business Application", "Renewal of Business"], // Only allow these options
      required: false,
    },
    locationAddress: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Default status when the form is submitted
    },
    pdfPath: {
      type: String, // Store the file path where the PDF is generated
      required: false,
    },
    assessmentCert: {
      type: String, // Store the file path of assessment certificate
      required: false,
    },
    inspectionReport: {
      type: String, // Store the file path of inspection report
      required: false,
    },
    preTestPath: {
      type: String, // Store the file path of inspection report
      required: false,
    },
    preTest: {
      type: Boolean, // Store the file path of inspection report
      default: false,
    },
    postTestPath: {
      type: String, // Store the file path of inspection report
      required: false,
    },
    postTest: {
      type: Boolean, // Store the file path of inspection report
      default: false,
    },
    attendance: {
      type: Boolean, // Attended Webinar or not
      default: false,
    },
    certificateOfAttendancePath: {
      type: String, // Store the file path of attendance certificate
    },
    businessCertificatePath: {
      type: String,
    },
    businessCertificateHash: {
      type: String,
    },
    businessCertificate: {
      type: Boolean,
      default: false,
    },
    progressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progress",
    },
    submittedAt: {
      type: Date,
      default: Date.now, // Automatically sets the submission timestamp
    },
  },
  { timestamps: false } // Automatically add createdAt & updatedAt
);

export default mongoose.model("Application", applicationSchema);
