import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import applicationSchema from "../models/applicationSchema.js";
import crypto from "crypto";
import QRCode from "qrcode";
import dotenv from "dotenv";

dotenv.config();

export const generateFinalCert = async (applicationId) => {
  try {
    console.log("Received applicationId:", applicationId);

    // Find the application in the database
    const application = await applicationSchema.findById(applicationId);
    console.log("Fetched application:", application);

    if (!application) {
      throw new Error("Application not found");
    }

    if (!application.attendance) {
      // Check attendance, not certificateOfAttendancePath
      throw new Error("User has not attended the webinar");
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Ensure businessName is defined
    const safeBusinessName = application.businessName
      ? application.businessName.replace(/\s+/g, "_")
      : "Unknown";

    // Generate Unique Hash for Certificate
    const certificateHash = crypto
      .createHash("sha256")
      .update(applicationId + Date.now())
      .digest("hex");

    // const BASE_URL =
    //   process.env.NODE_ENV === "production"
    //     ? "https://cenro-verification.com"
    //     : "http://localhost:5000";

    const BASE_URL =
      process.env.NODE_ENV === "production"
        ? "https://cenro-verification.com"
        : `http://${process.env.LOCAL_IP_ADDRESS || "localhost"}:5000`;

    const verificationURL = `${BASE_URL}/api/application/verify-certificate?hash=${certificateHash}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationURL);

    // HTML Template for Certificate
    const htmlContent = `
    <html>
    <style>
    .cert {
    text-align: center;
    border: 1px solid #000;
    padding: 16px;
    }
    </style>
    <div class="cert">
    <h2>CERTIFICATE OF ENVIRONMENTAL COMPLIANCE</h2>
    <p>THIS IS TO CERTIFY</p>
    <p>${application.businessName}</p>
    <p>THAT THEY COMPLIED WITH ALL THE REQUIREMENTS TO RUN THEIR BUSINESS</p>
    <div>
    <img src="${qrCodeDataUrl}" width="150" />
    </div>
    </div>
    </html>
    `;

    await page.setContent(htmlContent);

    // Format Date
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    // Generate PDF File Name
    const pdfName = `${application.userId}-${formattedDate}-${safeBusinessName}-Final-Certificate.pdf`;
    const pdfDir = path.join("uploads", "certOfEnvComp");
    const finalCertPath = path.join(pdfDir, pdfName);

    // Ensure the directory exists
    if (!fs.existsSync(pdfDir)) {
      console.log("Creating directory...");
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Generate PDF
    await page.pdf({ path: finalCertPath, format: "A4" });

    await browser.close();

    const formattedCerthPath = finalCertPath.replace(/\\/g, "/");

    // Update the application with the certificate path
    application.businessCertificatePath = formattedCerthPath;
    application.businessCertificateHash = certificateHash;
    await application.save();

    console.log("Certificate generated successfully:", formattedCerthPath);

    return finalCertPath; // Return the file path
  } catch (err) {
    console.error("Error generating certificate:", err.message);
    throw new Error(err.message); // Ensure the error is properly thrown
  }
};
