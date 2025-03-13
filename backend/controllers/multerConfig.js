import multer from "multer"
import path from "path"
import fs from "fs"

import { fileURLToPath } from "url";

// Create __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../uploads/assessmentCertificates");

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/assessmentCertificates/"); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.user?.userId || "anonymous"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// File filter (optional, restrict to PDFs)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, false);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;