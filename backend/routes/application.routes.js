import express from "express"
import { submitApplication } from "../controllers/submitApplication.controller.js";
import { getUserApplication, getAllApplication } from "../controllers/getApplication.controller.js";
import { downloadPdf } from "../controllers/downloadPdf.controller.js";
import { uploadAssessmentCert } from "../controllers/uploadAssessmentCert.controller.js";
import { officialReceipts, inspectionReports } from "../controllers/multerConfig.js";
import { updateApplicationStatus } from "../controllers/updateApplicationStatus.controller.js";
import { viewAssessmentCert } from "../controllers/viewAssessment.controller.js";
import { verifyToken } from "../middlewares/auth/auth.verifyAdmin.js";
import { verifyRoles } from "./../middlewares/verifyRoles.js"
import { createAttendanceCert } from "../controllers/createAttendanceCert.controller.js";
import { viewCertOfAttendance } from "../controllers/viewCertOfAttendance.controller.js"
import { getPendingAttendanceCert } from "../controllers/getPendingAttendanceCert.controller.js";
import { createFinalCert } from "../controllers/createFinalCert.controller.js";
import { verifyCert } from "../controllers/verifyCert.controller.js";
import { viewFinalCert } from "../controllers/viewFinalCert.controller.js";
import { getPendingFinalCert } from "../controllers/getPendingFinalCert.controller.js";
import verifyDesignation from "../middlewares/verifyDesignation.js";
import { uploadInspectionReport } from "../controllers/uploadInspectionReport.js";



const router = express.Router()

// Generate PDF
router.post("/generate-pdf", submitApplication);

// Generate certificate of Attendance
router.post("/generate-certificate/:applicationId", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["admin", "webinar coordinator"]), createAttendanceCert)

// Generate certificate of Environmental Compliance
router.post("/generate-final-certificate/:applicationId", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["admin", "inspector"]), createFinalCert)

// Get Application to normal user
router.get("/get-user-application", verifyToken, getUserApplication);

// Get All application to admin
router.get("/get-application", getAllApplication);

// Get application that is initially approved for webinar schedule
router.get("/pending-webinar-users", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["admin", "webinar coordinator"]), getPendingAttendanceCert)

// Get application that is attended in webinar for final certificate
router.get("/pending-final-certificate-users", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["admin", "inspector"]), getPendingFinalCert)

// View assessment certificate for admin/employee
router.get("/view-assessment-file/:applicationId", viewAssessmentCert)

// View certificate of attendance for normal user
router.get("/view-certificate-of-attendance/:applicationId", viewCertOfAttendance)

// View Final certificate for normal user
router.get("/view-final-certificate/:applicationId", viewFinalCert)

//upload file 
router.post("/upload-assessment/:applicationId", officialReceipts.single("assessmentCert"), uploadAssessmentCert);

//upload file 
router.post("/upload-report/:applicationId", inspectionReports.single("inspectionReport"), uploadInspectionReport);

// update status of application
router.put("/update-status/:applicationId", updateApplicationStatus);

// verify Final Certificate for verification
router.get("/verify-certificate", verifyCert)



export default router;