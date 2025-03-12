import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the normal user's account
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    formType: {
      type: String,
      enum: ["New Business Application", "Renewal of Business"], // Only allow these options
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Default status when the form is submitted
    },
    pdfPath: {
      type: String, // Store the file path where the PDF is generated
      required: true,
    },
    assessmentCert: {
      type: String, // Store the file path of assessment certificate
      required: false,
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
    //  attendanceConfirmedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user", // Reference to the admin/employee who confirmed
    // },
    // attendanceConfirmedAt: {
    //   type: Date,
    // },
    progressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progress",
    },
    submittedAt: {
      type: Date,
      default: Date.now, // Automatically sets the submission timestamp
    },
  },
  { timestamps: true } // Automatically add createdAt & updatedAt
);

export default mongoose.model("Application", applicationSchema);
