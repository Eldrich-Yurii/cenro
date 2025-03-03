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
export const sendMessage = async (id, message) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // Extract only the token
  console.log("Stored Token:", token);

  try {
    const response = await axios.post(
      `${API}/send-message/${id}/message`,
      { message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw err.response?.message.data || "Error Sending Message";
  }
};


// Admin Get All Ticket
export const getAllTicket = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/get-all-ticket`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data
  } catch (err) {
    throw err.response?.data || "Error Retrieving All Tickets"
  }
}

export const updateStatus = async (ticketId, status) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // Extract only the token
  console.log("Stored Token:", token);

  try {
    const response = await axios.put(
      `${API}/admin/update/${ticketId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || "Error Updating Ticket Status";
  }
};