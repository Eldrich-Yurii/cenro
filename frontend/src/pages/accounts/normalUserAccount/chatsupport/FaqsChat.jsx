import { getFaqs } from "../../../../api/ChatbotApi";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { TbSend } from "react-icons/tb";
import "./Chatbot.css";
import Fuse from "fuse.js"; // Import Fuse

export default function ChatSupport() {
  const [faqs, setFaqs] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const chatMessagesRef = useRef(null);
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (location.pathname === "/user-account/frequently-asked-questions") {
      getFaqs().then(setFaqs);
      setChatHistory([
        {
          type: "bot",
          message: "Hello! I'm Cendi 😊 How can I assist you today?",
        },
      ]);
    }
  }, []);

  const handleQuestionClick = (faq) => {
    setUserInput(faq.question);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (input.length > 3) {
      const fuse = new Fuse(faqs, { keys: ["question"] });
      const results = fuse.search(input);
      const filteredSuggestions = results.map((result) => result.item);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSendMessage = () => {
    if (isSending || !userInput.trim()) return; // Added check for empty input
    setIsSending(true);

    const fuse = new Fuse(faqs, {
      keys: ["question"],
      threshold: 0.4,
      distance: 1,
      includeScore: true,
    });
    const results = fuse.search(userInput);

    let response;
    if (results.length > 0) {
      response = results[0].item.answer;
    } else {
      response =
        "Sorry, I don't have an answer for that yet. Would you like to create a support ticket? 💡 You can create a support ticket, and a staff member will assist you.";
    }

    setChatHistory((prev) => [
      ...prev,
      { type: "user", message: userInput },
      { type: "bot", message: "Typing..." },
    ]);

    setTimeout(() => {
      setChatHistory((prev) => {
        const updatedChat = [...prev];
        updatedChat[updatedChat.length - 1] = {
          type: "bot",
          message: response,
        };
        return updatedChat;
      });
      setIsSending(false);
    }, 1500);

    setUserInput("");
    setSuggestions([]);
  };

  const handleCreateTicket = () => {
    window.location.href = "/user-account/support-ticket";
  };

  const handleDismissSuggestion = () => {
    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: "Alright! Let me know if you need anything else. 😊",
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isSending) {
      e.preventDefault();
      if (userInput.trim()) {
        handleSendMessage();
      }
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader floated={false} shadow={false}>
        <h2>Ask Cendi for FAQs</h2>
      </CardHeader>
      <CardBody>
        <div className="chat-messages" ref={chatMessagesRef}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "user" ? "user-message" : "bot-message"}
            >
              {msg.type === "bot" && msg.message === "Typing..." ? (
                <span className="typing">Typing</span>
              ) : (
                <>
                  {msg.message}
                  {msg.message.includes(
                    "Would you like to create a support ticket?"
                  ) && (
                    <div className="ticket-suggestion">
                      <div className="pt-4">
                        <button
                          className="ticket-btn"
                          onClick={handleCreateTicket}
                        >
                          🎫 Yes, create a ticket
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={handleDismissSuggestion}
                        >
                          ❌ No, thanks
                        </button>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef}></div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((faq) => (
              <li key={faq._id} onClick={() => handleQuestionClick(faq)}>
                <small>{faq.question}</small>
              </li>
            ))}
          </ul>
        )}
        {isOpen && (
          <div className="faq-list">
            <h4>Common Questions:</h4>
            {faqs.map((faq) => (
              <p
                key={faq._id}
                onClick={() => handleQuestionClick(faq)}
                className="faq-question"
              >
                {faq.question}
              </p>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <input
            className="w-full p-3 rounded-lg"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Use handleKeyDown
            placeholder="Type your question..."
            disabled={isSending}
          />
          <div>
            <button
              className="rounded-lg p-3 border-2 border-blue-800 bg-blue-800 text-2xl text-white hover:bg-blue-900"
              onClick={handleSendMessage}
              disabled={isSending || !userInput.trim()} //Disable when empty
            >
              <TbSend />
            </button>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border-2 border-lime-600 text-lime-600 font-bold p-3 rounded-lg hover:bg-lime-600 hover:text-white"
          >
            FAQs
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}