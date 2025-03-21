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


//Pre test Upload Configuration
const preTestPath = path.join(__dirname, "../uploads/preTests");
if (!fs.existsSync(preTestPath)) {
  fs.mkdirSync(preTestPath, { recursive: true });
}

const preTestStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/preTests/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `pre-test-${req.user?.userId || "anonymous"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const preTestUpload = multer({
  storage: preTestStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit (example)
});

// Post test Upload Configuration
const postTestPath = path.join(__dirname, "../uploads/postTests");
if (!fs.existsSync(postTestPath)) {
  fs.mkdirSync(postTestPath, { recursive: true });
}

const postTestStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/postTests/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `post-test-${req.user?.userId || "anonymous"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const postTestsUpload = multer({
  storage: postTestStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit (example)
});

export const officialReceipts = officialReceiptsUpload;
export const inspectionReports = inspectionReportsUpload;
export const preTests = preTestUpload;
export const postTests = postTestsUpload;