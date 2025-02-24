import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const generatePdf = async ({ userId, businessName, ownerName, formType }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

    // Ensure formType is defined
  const safeFormType = formType ? formType.replace(/\s+/g, "_") : "Unknown"
  const safeBusinessName = businessName ? businessName.replace(/\s+/g, "_") : "Unknown"
  
  // html form template
  const htmlContent = `
    <h2>Application for New Business</h2>
    <p><strong>Business Name:</strong> ${businessName}</p>
    <p><strong>Owner Name:</strong> ${ownerName}</p>
    `;

  await page.setContent(htmlContent);

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  const pdfName = `${userId}-${formattedDate}-${safeBusinessName}_${safeFormType}-form.pdf`;
  const pdfDir = path.join("uploads", "forms");
  const pdfPath = path.join(pdfDir, pdfName);

  // Ensure the directory exists
  if (!fs.existsSync("uploads/forms")) {
    console.log("Creating directory...");
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  // generete pdf
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();

  return pdfPath; // Return the file path
};
