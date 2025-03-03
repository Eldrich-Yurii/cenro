import { useState, useEffect, useRef } from "react";
import { TbTicket } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { getTicketById, sendMessage } from "../../api/TicketApi"; // Import API request
import PropTypes from "prop-types";

export default function UserTicketModal({ ticketId }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState(ticketId || []);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (ticketId) {
      setMessages(ticketId.messages || []);
    }
  }, [ticketId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchTicketDetails = async () => {
    setLoading(true);
    setError(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      setError("Authentication error: No token found");
      setLoading(false);
      return;
    }

    try {
      const data = await getTicketById(ticketId, token);
      setTicket(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // Handle Sending Messages
    const handleSendMessage = async () => {
      if (!newMessage.trim()) return;
      try {
        console.log("Sending message:", newMessage);
        const messageData = await sendMessage(ticketId, newMessage);
        setMessages([...messages, messageData]); // Add new message to UI
        setNewMessage("");
        fetchTicketDetails()
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    };

  const handleOpenModal = () => {
    setIsOpen(true);
    fetchTicketDetails();
  };

  return (
    <div className="z-10">
      {/* Button to open modal */}
      <button
        onClick={handleOpenModal}
        className="border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:underline hover:text-blue-600 transition-all cursor-pointer"
      >
        <TbTicket className="text-lg" />
        View Ticket
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
          >
            <header className="flex justify-between">
              <section>
                <h6 className="font-bold">{ticket?.subject || "Loading..."}</h6>
                <small>Ticket ID: {ticket?._id || "Loading..."}</small>
                <p>{ticket?.user?.name || "User Name"}</p>
              </section>
              <section className="flex items-center">
                <small>{ticket?.createdAt?.split("T")[0] || "Date"}</small>
                <span className={`px-3 py-1 ml-2 text-xs font-bold rounded-lg ${
                  ticket?.status === "Open"
                    ? "bg-blue-200 text-blue-800"
                    : ticket?.status === "In Progress"
                    ? "bg-yellow-200 text-orange-600"
                    : "bg-green-200 text-green-600"
                }`}>
                  {ticket?.status || "Status"}
                </span>
                <IoClose
                  onClick={() => setIsOpen(false)}
                  className="text-xl hover:text-red-700 cursor-pointer ml-4"
                />
              </section>
            </header>

            {/* Ticket Messages */}
            <section className="mt-4 p-3 bg-gray-100 rounded-md max-h-40 overflow-y-auto">
              {loading ? (
                <p>Loading messages...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                ticket?.messages?.map((msg, index) => (
                  <p key={index} className="text-gray-700">
                <strong>{msg.sender}:</strong> {msg.message}
              </p>
                ))
              )}
               <div ref={messagesEndRef}></div>
            </section>

            {/* Message Input */}
            <div className="mt-4 flex justify-end gap-2">
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
      )}
    </div>
  );
};

UserTicketModal.propTypes = {
  ticketId: PropTypes.string.isRequired, // Ensure ticketId is a required string
};