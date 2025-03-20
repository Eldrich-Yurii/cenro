import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Create __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Official Receipts Upload Configuration
const officialReceiptsPath = path.join(__dirname, "../uploads/officialReceipts");
if (!fs.existsSync(officialReceiptsPath)) {
  fs.mkdirSync(officialReceiptsPath, { recursive: true });
}

const officialReceiptsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/officialReceipts/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.user?.userId || "anonymous"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const officialReceiptsUpload = multer({
  storage: officialReceiptsStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Inspection Reports Upload Configuration
const inspectionReportsPath = path.join(__dirname, "../uploads/inspectionReports");
if (!fs.existsSync(inspectionReportsPath)) {
  fs.mkdirSync(inspectionReportsPath, { recursive: true });
}

const inspectionReportsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/inspectionReports/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `inspection-${req.user?.userId || "anonymous"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const inspectionReportsUpload = multer({
  storage: inspectionReportsStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit (example)
});

export const officialReceipts = officialReceiptsUpload;
export const inspectionReports = inspectionReportsUpload;