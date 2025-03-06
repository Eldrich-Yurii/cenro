import applicationSchema from "../models/applicationSchema.js";
import { generateFinalCert } from "./generateFinalCert.controller.js";

export const createFinalCert = async (req, res) => {
  try {
    const { applicationId } = req.params;
    //const adminId = req.user.id; // Get admin/employee ID from request

    // Find the application
    const application = await applicationSchema.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    console.log("Found Application:", application);

    if (application.businessCertificatePath) {
      return res
        .status(400)
        .json({ message: "final certificate already generated." });
    }

    // Generate attendance certificate
    const certPath = await generateFinalCert(applicationId);

    // Save the certificate path
    application.businessCertificatePath = certPath;
    await application.save();

    res.status(200).json({
      message: "Certificate generated",
      certPath,
    });
  } catch (err) {
    console.error("Error Generating Business Certificate:", err);
    res
      .status(500)
      .json({
        message: "Error Generating Business Certificate",
        error: err.message,
      });
  }
};
