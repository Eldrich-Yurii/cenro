import express from "express"
import { verifyToken } from "../middlewares/auth/auth.verifyAdmin.js";
import { getUserProgress } from "../controllers/progress.controller.js";



const router = express.Router()

// Get user progress
router.get("/user-progress", verifyToken, getUserProgress);
// Update user progress
// router.put("/application/:applicationId", verifyToken, updateUserProgress);

export default router;