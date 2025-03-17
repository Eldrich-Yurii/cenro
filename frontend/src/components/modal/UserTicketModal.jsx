import { useState, useEffect, useRef } from "react";
import { TbSend, TbTicket } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { updateStatus, sendMessage } from "../../api/TicketApi";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

export default function UserTicketModal({ ticket, isOpen, onClose }) {
  const [status, setStatus] = useState(ticket.status);
  const [messages, setMessages] = useState(ticket.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const modalRef = useRef(null);


  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (ticket) {
      setMessages(ticket.messages || []);
    }
  }, [ticket]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

// send chat using enter
const handleKeyPress = (e) => {
  if (e.key === "Enter" && !e.shiftKey) { 
    e.preventDefault(); // Prevents new line in input field
    handleSendMessage(); // Send the message
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

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <Card
        ref={modalRef}
        className="flex justify-between bg-white rounded-lg shadow-lg h-[32rem] w-[48rem] transform transition-transform duration-300 animate-fade-in"
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="flex justify-between items-start flex-shrink-0 rounded-none"
        >
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
              </section>

          <IoClose onClick={onClose} className="text-xl hover:text-red-700 cursor-pointer" />
          </CardHeader>

        {/* Messages Section */}
        <CardBody className="border-b border-t mt-2 h-full p-0">
        <div className="mt-4 p-3 bg-white h-[19rem] rounded-md overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div 
            key={index} 
            className={msg.sender === "user" 
              ? "text-white mb-8" 
              : "text-gray-900 mb-8"
              }
            >
              <div className="text-gray-400 flex justify-self-center">
                <small>{formatDateTime(msg.timestamp)}</small>
              </div>
              <div
                className={
                  msg.sender === "user"
                    ? "text-white bg-sky-700 ml-16 p-3 rounded-lg w-fit flex justify-self-end gap-2"
                    : "text-gray-900 bg-gray-100 mr-16 p-3 rounded-lg w-fit"
                }
              >
                <strong>{msg.sender}:</strong> {msg.message}
              </div>
            </div>
                 ))
          ) : (
            <p className="text-gray-500">No messages yet.</p>
          )}
           <div ref={messagesEndRef}></div>
        </div>
        </CardBody>
        

        {/* Reply Input */}
        <CardFooter className="flex">
          <input
            type="text"
            placeholder={ticket.status === "Resolved" ? "This is now resolved." : "Type your response..."}
            className="flex-1 p-2 border rounded-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={ticket.status === "Resolved"}
          />
          <button onClick={handleSendMessage} 
          className={`ml-2 px-4 py-2 rounded-lg ${ticket.status === "Resolved" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          disabled={ticket.status === "Resolved"}>
            Send
          </button>
          </CardFooter>
        
      </Card>
      </div>
  );
}

UserTicketModal.propTypes = {
  ticket: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    messages: PropTypes.array,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};