import axios from "axios";

const API = "http://localhost:5000/api/ticket";

// Get user tickets
export const getUserTickets = async (token) => {
  try {
    const response = await axios.get(`${API}/get-user-ticket`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw err.response?.message.data || "Error Retrieving Ticket";
  }
};

// Get a single ticket by ID
export const getTicketById = async (ticketId, token) => {
  try {
    const response = await axios.get(`${API}/get-user-ticket/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw err.response?.message.data || "Error Retrieving Single Ticket";
  }
};

// Create a new ticket
export const createTicket = async (ticketData, token) => {
  if (!token) throw new Error("No token provided");
  try {
    const response = await axios.post(`${API}/create-ticket`, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("RES:", response.data);
    return response.data;
  } catch (err) {
    console.error("Create Ticket API Error:", err.response || err);
    throw err.response?.data || "Error Creating Ticket";
  }
};

// Send a message to a ticket
export const sendMessage = async (ticketId, message, token) => {
  try {
    const response = await axios.post(
      `${API}/send-message/${ticketId}/message`,
      { message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw err.response?.message.data || "Error Sending Message";
  }
};
