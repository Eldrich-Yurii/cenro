import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import applicationSchema from "../models/applicationSchema.js";
import crypto from "crypto";
import QRCode from "qrcode";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

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

      const safeOwnerName = application.ownerName
      ? application.ownerName.replace(/\s+/g, "_")
      : "Unknown";

      const safeAccountNumber = application.accountNumber
      ? application.accountNumber.replace(/\s+/g, "_")
      : "Unknown";

      const safeBusinessAddress = application.locationAddress
      ? application.locationAddress.replace(/\s+/g, "_")
      : "Unknown";

      // Get the directory of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Convert PNGs to Data URLs
    const cenroLogoPath = path.resolve(
      __dirname,
      "../../frontend/src/assets/CENRO-LOGO-ORIG.png"
    );
    const diwaLogoPath = path.resolve(
      __dirname,
      "../../frontend/src/assets/SanJuanCity-Seal.png"
    );
  
      const cenroLogoData = fs.readFileSync(cenroLogoPath);
      const diwaLogoData = fs.readFileSync(diwaLogoPath);
  
      const cenroLogoBase64 = cenroLogoData.toString("base64");
      const diwaLogoBase64 = diwaLogoData.toString("base64");
  
      const cenroLogoDataUrl = `data:image/png;base64,${cenroLogoBase64}`;
      const diwaLogoDataUrl = `data:image/png;base64,${diwaLogoBase64}`;
  

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
    <!DOCTYPE html>
<html>
<head>
<title>Certificate of Environmental Compliance</title>
<style>
body {
    font-family: sans-serif;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
}
.container {
    width: 900px;
    background-color: white;
    padding: 30px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.header {
    text-align: center;
}
.header img {
    max-width: 100px;
    margin-bottom: 10px;
}
.header h2 {
    margin: 5px 0;
}
.header p {
    margin: 5px 0;
}
.section {
    margin-top: 20px;
}
.section h3 {
    margin-bottom: 10px;
}
.section p {
    margin: 5px 0;
}
.section table {
    width: 100%;
    border-collapse: collapse;
}
.section table td {
    padding: 8px;
    border: 1px solid #ddd;
}
.footer {
    margin-top: 30px;
    text-align: center;
    font-style: italic;
    color: #555;
}
.qr-code {
    text-align: left;
    margin-top: 20px;
}

.approved-by {
    text-align: center;
    margin-top: 20px;
}
.qr-code img {
    max-width: 100px;
}
.logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo-container img {
    max-width: 100px;
}
.mark {
  background-color: green;
  color: white;
}
.acc-number {
  color: green;
}
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="logo-container">
            <img src=${diwaLogoDataUrl} alt="Left Logo">
            <img src=${cenroLogoDataUrl} alt="Right Logo">
        </div>
        <h2><mark class="mark">CERTIFICATE OF ENVIRONMENTAL COMPLIANCE</mark></h2>
        <h3 class="acc-number">${application.accountNumber}</h3>
        
    </div>

    <div class="section">
        <p2>Pursuant to Section 1, Chapter X: Certificate of Environmental Compliance of the City Ordinance Number 73 Series of 2018, otherwise known as the San Juan City Environment Code, this certificate is hereby granted to <b>${application.ownerName}</b>.</p2>
        <table>
            <tr>
                <td>${application.ownerName}</td>
            </tr>
            <tr>
                <td>${application.locationAddress}</td>
     
            </tr>
            <tr>
                <td>${application.businessName}</td>
            </tr>
        </table>
    </div>
    <div class="section">
        <h5>Important Reminders</h5>
        <p>1. The proponent shall ALWAYS allow the entry of CENRO duly authorized representative(s) to conduct random inspection within its premises at any time within the validity of this certificate.</p>
<p>2. The Environmental Compliance fee (EPP Fee) may be subject to annual adjustment.</p>
    </div>


    <div class="qr-code">
        <img src="${qrCodeDataUrl}" alt="QR Code">

    </div>
 <div class="approved-by">
        <p> Approved by: </p>
<p><p>
<h4>GABRIEL GERARD S. KATIGBAK</h4>
<p>Department Head<p>
<p2>City Environment and Natural Resources Office</p2>

    </div>
    <div class="footer">
        <p>This certificate is valid only if the QR code is verifiable.</p>
    </div>
</div>
</body>
</html>
    `;

    await page.setContent(htmlContent);

    // Format Date
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    // Generate PDF File Name
    const pdfName = `${application.userId}-${formattedDate}-${safeBusinessName}-${safeOwnerName}-${safeAccountNumber}-Final-Certificate.pdf`;
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
