import ticketSchema from "../models/ticketSchema.js";

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    console.log("User:", req.user)
    const { subject, description } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized, token missing or invalid" });
    }

    console.log("Ticket:", req.body)
    const newTicket = await ticketSchema.create({
      userId: req.user.id,
      subject,
      description,
      messages: [{ sender: "user", message: description }],
    });
    console.log(newTicket)
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tickets for the logged-in user
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await ticketSchema
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketSchema.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User/Admin replies to a ticket
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const ticket = await ticketSchema.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.messages.push({
      sender: req.user.role === "admin" ? "admin" : "user",
      message,
    });
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketSchema.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await ticketSchema.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.status = status;
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
