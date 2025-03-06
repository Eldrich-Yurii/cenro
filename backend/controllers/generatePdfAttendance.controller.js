import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import Application from "../models/applicationSchema.js";

export const generateCertAttendance = async (applicationId) => {
  try {
    console.log("Received applicationId:", applicationId);

    // Find the application in the database
    const application = await Application.findById(applicationId);
    console.log("Fetched application:", application);

    if (!application) {
      throw new Error("Application not found");
    }

    if (!application.attendance) {  // Check attendance, not certificateOfAttendancePath
      throw new Error("User has not attended the webinar");
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Ensure businessName is defined
    const safeBusinessName = application.businessName
      ? application.businessName.replace(/\s+/g, "_")
      : "Unknown";

    // HTML Template for Certificate
    const htmlContent = `
      <h2>CERTIFICATE OF ATTENDANCE</h2>
      <p>THIS IS TO CERTIFY</p>
      <p>${application.businessName}</p>
      <p>THANK YOU FOR PARTICIPATING SHEESH</p>
    `;

    await page.setContent(htmlContent);

    // Format Date
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    // Generate PDF File Name
    const pdfName = `${application.userId}-${formattedDate}-${safeBusinessName}-Attendance-Certificate.pdf`;
    const pdfDir = path.join("uploads", "certOfAttendance");
    const certPath = path.join(pdfDir, pdfName);

    // Ensure the directory exists
    if (!fs.existsSync(pdfDir)) {
      console.log("Creating directory...");
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Generate PDF
    await page.pdf({ path: certPath, format: "A4" });

    await browser.close();

    const formattedCerthPath = certPath.replace(/\\/g, "/");

    // Update the application with the certificate path
    application.certificateOfAttendancePath = formattedCerthPath
    await application.save();

    console.log("Certificate generated successfully:", formattedCerthPath);

    return certPath; // Return the file path
  } catch (err) {
    console.error("Error generating certificate:", err.message);
    throw new Error(err.message); // Ensure the error is properly thrown
  }
};