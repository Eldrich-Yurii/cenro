import express from "express"
import { createWebinar } from "../controllers/createWebinar.controller.js";
import { getAllWebinar } from "../controllers/getWebinar.controller.js";
import { updateWebinar } from "../controllers/updateWebinar.controller.js";
import { deleteWebinar } from "../controllers/deleteWebinar.controller.js";

const router = express.Router();

router.post("/create-webinar", createWebinar);

router.get("/get-webinar", getAllWebinar);

router.put("/update-webinar/:id", updateWebinar);

router.delete("/delete-webinar/:id", deleteWebinar)
export default router;