import express from "express";
import { createTicket, getAllTickets, getTicketById, getUserTickets, sendMessage, updateTicketStatus } from "../controllers/ticket.controller.js";
import verifyRoles from "./../middlewares/verifyRoles.js"
import { verifyToken } from "./../middlewares/auth/auth.verifyAdmin.js"
import verifyDesignation from "../middlewares/verifyDesignation.js";

const router = express.Router();

// User routes
router.post("/create-ticket", verifyToken, verifyRoles("user"), createTicket);

// get all tickets for specific normal user
router.get("/get-user-ticket",verifyToken, verifyRoles("user"),  getUserTickets);

// get one ticket
router.get("/get-user-ticket/:id", verifyToken, verifyRoles("user"),  getTicketById);

// send message 
router.post("/send-message/:id/message", verifyToken, verifyRoles("user"), sendMessage);

// Admin routes
router.get("/admin/get-all-ticket", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["admin", "chat support"]), getAllTickets);
router.put("/admin/update/:id/status", verifyToken, verifyRoles(["admin", "employee"]), verifyDesignation(["admin", "chat support"]), updateTicketStatus);

export default router;