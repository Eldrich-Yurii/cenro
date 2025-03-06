import applicationSchema from "../models/applicationSchema.js";
import { generateCertAttendance } from "./generatePdfAttendance.controller.js";

export const createAttendanceCert = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const adminId = req.user.id; // Get admin/employee ID from request

    // Find the application
    const application = await applicationSchema.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    console.log("✅ Found Application:", application);

    // Check if the user has already been marked as attended
    if (application.attendance && application.certificateOfAttendancePath) {
      return res.status(400).json({ message: "Attendance already confirmed, certificate already generated." });
    }

    // Mark attendance as confirmed
    application.attendance = true;
    await application.save();
    application.attendanceConfirmedBy = adminId;
    application.attendanceConfirmedAt = new Date();

    // Generate attendance certificate
    const certPath = await generateCertAttendance(applicationId);

    // Save the certificate path
    application.certificateOfAttendancePath = certPath;
    await application.save();

    res.status(200).json({
      message: "Attendance confirmed & Certificate generated",
      certPath,
      confirmedBy: adminId,
      confirmedAt: application.attendanceConfirmedAt,
    });
  } catch (err) {
    console.error("Error confirming attendance:", err);
    res.status(500).json({ message: "Error confirming attendance", error: err.message });
  }
};