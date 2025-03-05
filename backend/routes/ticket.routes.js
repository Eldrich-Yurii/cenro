import express from "express";
import { createTicket, getAllTickets, getTicketById, getUserTickets, sendMessage, updateTicketStatus } from "../controllers/ticket.controller.js";
import verifyRoles from "./../middlewares/verifyRoles.js"
import { verifyToken } from "./../middlewares/auth/auth.verifyAdmin.js"

const router = express.Router();

// User routes
router.post("/create-ticket", verifyToken, verifyRoles("user"), createTicket);

// get all tickets for specific normal user
router.get("/get-user-ticket",verifyToken, getUserTickets);

// get one ticket
router.get("/get-user-ticket/:id", verifyToken, getTicketById);

// send message 
router.post("/send-message/:id/message", verifyToken, sendMessage);

// Admin routes
router.get("/admin/get-all-ticket", verifyToken, verifyRoles("admin"), getAllTickets);
router.put("/admin/update/:id/status", verifyToken, verifyRoles("admin"), updateTicketStatus);

export default router;