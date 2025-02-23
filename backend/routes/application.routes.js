import express from "express"
import { submitApplication } from "../controllers/submitApplication.controller.js";


const router = express.Router()

// Generate PDF
router.post("/generate-pdf", submitApplication);

export default router;