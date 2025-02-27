import express from "express"
import { createWebinar } from "../controllers/createWebinar.controller.js";

const router = express.Router();

router.post("/create-webinar", createWebinar)

export default router;