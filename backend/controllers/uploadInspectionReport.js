import applicationSchema from "../models/applicationSchema.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadInspectionReport = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const filename = req.file.filename; // Get filename from Multer

    const filePath = path.join("/uploads/inspectionReports/", filename); // Construct full path

    // Update the application document with the file path
    const updatedApplication = await applicationSchema.findByIdAndUpdate(
      applicationId,
      { inspectionReport: filePath },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Inspection report uploaded successfully", filePath: filePath });
  } catch (error) {
    console.error("Error uploading inspection report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};