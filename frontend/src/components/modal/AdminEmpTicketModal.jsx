import { useState, useEffect, useRef } from "react";
import { TbTicket } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { updateStatus, sendMessage } from "../../api/TicketApi";

export default function AdminEmpTicketModal({ ticket, isOpen, onClose }) {
  const [status, setStatus] = useState(ticket.status);
  const [messages, setMessages] = useState(ticket.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const modalRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle Status Change
  const handleStatusChange = async (newStatus) => {
    if (confirm(`Are you sure you want to mark this ticket as ${newStatus}?`)) {
      try {
        await updateStatus(ticket._id, newStatus);
        setStatus(newStatus);
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    }
  };

  // Handle Sending Messages
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      console.log("Sending message:", newMessage);
      const messageData = await sendMessage(ticket._id, newMessage);
      setMessages([...messages, messageData]); // Add new message to UI
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!isOpen) return null; // Prevent rendering when closed

  return (
    <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 animate-fade-in"
      >
        <header className="flex justify-between">
        <section>
                <h6 className="font-bold">{ticket?.subject || "Loading..."}</h6>
                <small>Ticket ID: {ticket?._id || "Loading..."}</small>
                <p>{ticket?.user?.name || "User Name"}</p>
              </section>
          <IoClose onClick={onClose} className="text-xl hover:text-red-700 cursor-pointer" />
        </header>

        {/* Status Update (Buttons Instead of Dropdown) */}
        <div className="mt-3 flex gap-2">
          <span className="text-sm font-bold">Status:</span>
          <button
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              status === "Open" ? "bg-blue-200 text-blue-800" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleStatusChange("Open")}
            disabled={status === "Open"}
          >
            Open
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              status === "In Progress" ? "bg-yellow-200 text-orange-600" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleStatusChange("In Progress")}
            disabled={status === "In Progress"}
          >
            In Progress
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              status === "Resolved" ? "bg-green-200 text-green-600" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleStatusChange("Resolved")}
            disabled={status === "Resolved"}
          >
            Resolved
          </button>
        </div>

        {/* Messages Section */}
        <section className="mt-4 p-3 bg-gray-100 rounded-md max-h-40 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index} className="text-gray-700">
                <strong>{msg.sender}:</strong> {msg.message}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No messages yet.</p>
          )}
        </section>

        {/* Reply Input */}
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your response..."
            className="flex-1 p-2 border rounded-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

AdminEmpTicketModal.propTypes = {
  ticket: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    messages: PropTypes.array,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};