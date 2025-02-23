import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
   {
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user", // Reference to the normal user's account
       required: true,
     },
     ownerName: {
      type: String,
      ref: "user",
      required: true
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
     submittedAt: {
       type: Date,
       default: Date.now, // Automatically sets the submission timestamp
     },
   },
   { timestamps: true } // Automatically add createdAt & updatedAt
 );
 
 export default mongoose.model("Application", applicationSchema);