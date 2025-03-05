import express from "express"
import { submitApplication } from "../controllers/submitApplication.controller.js";
import { getUserApplication, getAllApplication } from "../controllers/getApplication.controller.js";
import { downloadPdf } from "../controllers/downloadPdf.controller.js";
import { uploadAssessmentCert } from "../controllers/uploadAssessmentCert.controller.js";
import upload from "../controllers/multerConfig.js";
import { updateApplicationStatus } from "../controllers/updateApplicationStatus.controller.js";
import { viewAssessmentCert } from "../controllers/viewAssessment.controller.js";
import { verifyToken } from "../middlewares/auth/auth.verifyAdmin.js";
import { verifyRoles } from "./../middlewares/verifyRoles.js"

const router = express.Router()

// Generate PDF
router.post("/generate-pdf", submitApplication);

// Get Application to normal user
router.get("/get-user-application", verifyToken, getUserApplication);

// Get All application to admin
router.get("/get-application", getAllApplication);

// router.get("/download/:filename", downloadPdf);


// View assessment certificate
router.get("/view-assessment-file/:applicationId", viewAssessmentCert)

//upload file 
router.post("/upload-assessment/:applicationId", upload.single("assessmentCert"), uploadAssessmentCert);

// update status of application
router.put("/update-status/:applicationId", updateApplicationStatus);





export default router;