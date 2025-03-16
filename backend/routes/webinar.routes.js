import express from "express"
import { createWebinar } from "../controllers/createWebinar.controller.js";
import { getAllWebinar } from "../controllers/getWebinar.controller.js";
import { updateWebinar } from "../controllers/updateWebinar.controller.js";
import { deleteWebinar } from "../controllers/deleteWebinar.controller.js";
import verifyRoles from "./../middlewares/verifyRoles.js"
import { verifyToken } from "./../middlewares/auth/auth.verifyAdmin.js"
import { verifyDesignation } from "./../middlewares/verifyDesignation.js"
import { confirmAttendees } from "../controllers/confirmAttendees.controller.js";

const router = express.Router();

router.post("/create-webinar", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["webinar coordinator"]), createWebinar);

router.post("/webinar-attendance/:id/confirm", verifyToken, confirmAttendees)

router.get("/get-webinar", getAllWebinar);

router.put("/update-webinar/:id", updateWebinar);

router.delete("/delete-webinar/:id", deleteWebinar)
export default router;