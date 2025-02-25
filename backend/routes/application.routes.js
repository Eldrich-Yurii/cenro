import express from "express"
import { submitApplication } from "../controllers/submitApplication.controller.js";
import { getApplication } from "../controllers/getApplication.controller.js";


const router = express.Router()

// Generate PDF
router.post("/generate-pdf", submitApplication);

// Get Application to normal user
router.get("/get-application/:userid", getApplication);

export default router;