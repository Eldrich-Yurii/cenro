import applicationSchema from "../models/applicationSchema.js";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const viewCertOfAttendance = async (req, res) => {
  try {
    const { applicationId } = req.params;
    // console.log("Received applicationId:", applicationId);

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }
    const application = await applicationSchema.findById(applicationId);

    // console.log("CERT PATH:", application.certificateOfAttendancePath)

    if (!application || !application.certificateOfAttendancePath) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileName = application.certificateOfAttendancePath;
    const filePath = path.join(__dirname, "..", "uploads", "certOfAttendance", path.basename(fileName));
    // console.log("Expected File Path:", filePath);
    // console.log("File Exists?", fs.existsSync(filePath));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Certificate file not found" });
    }


    res.sendFile(filePath);
  } catch (err) {
    console.error("Error retrieving assessment:", err);
    res.status(500).json({ message: "Error retrieving assessment", error: err.message });
  }
};