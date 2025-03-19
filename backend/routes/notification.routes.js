import express from "express"
import { getNotif } from "../controllers/getNotification.controller.js"
import { verifyToken} from "../middlewares/auth/auth.verifyAdmin.js"

const router = express.Router()

router.get("/get-notification", verifyToken, getNotif)

export default router;