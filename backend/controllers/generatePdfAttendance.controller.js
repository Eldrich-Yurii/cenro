import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import applicationSchema from "../models/applicationSchema.js";
import { fileURLToPath } from 'url';

export const generateCertAttendance = async (applicationId) => {
  try {
    console.log("Received applicationId:", applicationId);

    // Find the application in the database
    const application = await applicationSchema.findById(applicationId);
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
          const bpLogoPath = path.resolve(
            __dirname,
            "../../frontend/src/assets/Bagong-Pilipinas.png"
          );
          const msjLogoPath = path.resolve(
            __dirname,
            "../../frontend/src/assets/makabagong-sanjuan-Logo.png"
          );
        
            const cenroLogoData = fs.readFileSync(cenroLogoPath);
            const diwaLogoData = fs.readFileSync(diwaLogoPath);
            const bpLogoData = fs.readFileSync(bpLogoPath);
            const msjLogoData = fs.readFileSync(msjLogoPath)
        
            const cenroLogoBase64 = cenroLogoData.toString("base64");
            const diwaLogoBase64 = diwaLogoData.toString("base64");
            const bpLogoBase64 = bpLogoData.toString("base64");
            const msjLogoBase64 = msjLogoData.toString("base64");
        
            const cenroLogoDataUrl = `data:image/png;base64,${cenroLogoBase64}`;
            const diwaLogoDataUrl = `data:image/png;base64,${diwaLogoBase64}`;
            const bpLogoDataUrl = `data:image/png;base64,${bpLogoBase64}`;
            const msjLogoDataUrl = `data:image/png;base64,${msjLogoBase64}`;

    // HTML Template for Certificate
    const htmlContent = `
    <html>
<head>
<title>Certificate of Participation</title>
<style>
  body {
    font-family: sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }
  .certificate {
    width: 800px;
    margin: 50px auto;
    background-color: white;
    border: 2px solid #ccc;
    padding: 30px;
    position: relative;
    box-sizing: border-box;
  }
  .header {
    margin-bottom: 20px;
  }
  .header img {
    max-width: 100px;
    margin: 0 10px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
    background-color: #8adb9a
;
    padding: 10px;
  }
  .content {
    text-align: center;
    margin-bottom: 30px;
    }
  .description {
    text-align: left;
    margin-bottom: 30px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .content p {
    margin: 10px 0;
  }
  .name {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #32a852
;
  }
  .footer {
    text-align: center;
  }
  .footer p {
    margin: 5px 0;
  }
  .account {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
  }
  .border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .border img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
</style>
</head>
<body>

<div class="certificate">
  <div class="account">ACCOUNT #: <b>${application.accountNumber}</b> </div>
  <div class="header">
    <img src=${bpLogoDataUrl} alt="Bagong Pilipinas Logo">
    <img src=${diwaLogoDataUrl} alt="San Juan Logo">
    <img src=${msjLogoDataUrl} alt="Makabagong San Juan Logo">
    <img src=${cenroLogoDataUrl} alt="CENRO Logo">
    <p>CITY GOVERNMENT OF SAN JUAN</p>
    <p>CITY ENVIRONMENT AND NATURAL RESOURCES OFFICE</p>
  </div>
  <div class="title">CERTIFICATE OF PARTICIPATION</div>
  <div class="content">
    <p>THIS IS TO CERTIFY THAT</p>
    <p class="name">${application.businessName}</p>
    <div class="description">
      <p>Located at <b>${application.locationAddress}</b></p>
    <p>Has successfully participated in the Business Establishment Awareness Webinar.</p>
    <p>This certificate is issued as partial fulfillment of the requirements for the Certificate of Environmental Compliance.</p>
    </div>
  </div>
  <div class="footer">
    <p style=padding-bottom:30px><b>Approved by:</b></p>
    <p>GABRIEL GERARD S. KATIGBAK</p>
    <p>City Environment and Natural Resources Officer</p>
  </div>
</div>

</body>
</html>
    `;

    await page.setContent(htmlContent);

    // Format Date
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    // Generate PDF File Name
    const pdfName = `${application.userId}-${formattedDate}-${safeBusinessName}-${safeAccountNumber}-${safeBusinessAddress}-Attendance-Certificate.pdf`;
    const pdfDir = path.join("uploads", "certOfAttendance");
    const certPath = path.join(pdfDir, pdfName);

    // Ensure the directory exists
    if (!fs.existsSync(pdfDir)) {
      console.log("Creating directory...");
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Generate PDF
    await page.pdf({  
      path: certPath,
      format: "A4",
      margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
      scale: 1, });

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