import express from "express";
import { createTicket, getAllTickets, getTicketById, getUserTickets, sendMessage, updateTicketStatus } from "../controllers/ticket.controller.js";
import verifyRoles from "./../middlewares/verifyRoles.js"
import { verifyToken } from "./../middlewares/auth/auth.verifyAdmin.js"

const router = express.Router();

// User routes
router.post("/create-ticket", verifyToken, verifyRoles("user"), createTicket);
router.get("/get-user-ticket",verifyToken, getUserTickets);
router.get("/get-user-ticket/:id", verifyToken, getTicketById);
router.post("/send-message/:id/message", verifyToken, sendMessage);

// Admin routes
router.get("/admin/get-all-ticket", verifyToken, verifyRoles("admin"), getAllTickets);
router.put("/admin/update/:id/status", verifyToken, verifyRoles("admin"), updateTicketStatus);

export default router;