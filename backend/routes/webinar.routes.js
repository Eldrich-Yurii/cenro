import express from "express"
import { createWebinar } from "../controllers/createWebinar.controller.js";
import { getAllWebinar } from "../controllers/getWebinar.controller.js";

const router = express.Router();

router.post("/create-webinar", createWebinar);

router.get("/get-webinar", getAllWebinar);

export default router;