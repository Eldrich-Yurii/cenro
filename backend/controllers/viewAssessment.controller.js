import applicationSchema from "../models/applicationSchema.js";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const viewAssessmentCert = async (req, res) => {
  try {
    const { applicationId } = req.params;
    // console.log("Received applicationId:", applicationId);

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const application = await applicationSchema.findById(applicationId);
    if (!application || !application.assessmentCert) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileName = application.assessmentCert;
    // const filePath = path.join(__dirname, "uploads", "assessmentCertificates", path.basename(fileName));
    const filePath = path.join(__dirname, "..", "uploads", "officialReceipts", path.basename(fileName));
    // console.log("Expected File Path:", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Assessment file not found" });
    }


    res.sendFile(filePath);
  } catch (err) {
    console.error("Error retrieving assessment:", err);
    res.status(500).json({ message: "Error retrieving assessment", error: err.message });
  }
};