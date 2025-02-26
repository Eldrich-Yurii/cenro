import express from "express"
import { submitApplication } from "../controllers/submitApplication.controller.js";
import { getApplication } from "../controllers/getApplication.controller.js";
import { downloadPdf } from "../controllers/downloadPdf.controller.js";
import { uploadAssessmentCert } from "../controllers/uploadAssessmentCert.controller.js";
import upload from "../controllers/multerConfig.js";



const router = express.Router()

// Generate PDF
router.post("/generate-pdf", submitApplication);

// Get Application to normal user
router.get("/get-application/:userid", getApplication);

// router.get("/download/:filename", downloadPdf);

//upload file 
router.post("/upload-assessment/:applicationId", upload.single("assessmentCert"), uploadAssessmentCert);

export default router;