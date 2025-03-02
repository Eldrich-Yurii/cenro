import { getFaqs } from "../../../../api/ChatbotApi"
import { useEffect, useState } from "react"
import {TbMessage, TbSend } from "react-icons/tb"


export default function ChatSupport() {

  const [faqs, setFaqs] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/user-account/frequently-asked-questions") {
      getFaqs().then(setFaqs);
      setChatHistory([{ type: "bot", message: "Hello! I'm Cendi 😊 How can I assist you today?" }]);
    }
  }, []);

  const handleQuestionClick = (faq) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "user", message: faq.question },
      { type: "bot", message: "Typing..." }, // Show "Typing..." first
    ]);

    setTimeout(() => {
      setChatHistory((prev) => {
        const updatedChat = [...prev];
        updatedChat[updatedChat.length - 1] = {
          type: "bot",
          message: faq.answer,
        }; // Replace "Typing..." with the answer
        return updatedChat;
      });
    }, 1500); // Delay for 1.5 seconds

    setUserInput("");
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (input.length > 0) {
      const filteredSuggestions = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSendMessage = () => {
    const matchedFaq = faqs.find(
      (faq) => faq.question.toLowerCase() === userInput.toLowerCase()
    );

    setChatHistory((prev) => [
      ...prev,
      { type: "user", message: userInput },
      { type: "bot", message: "Typing..." }, // Show "Typing..." first
    ]);

    setTimeout(() => {
      setChatHistory((prev) => {
        const updatedChat = [...prev];
        updatedChat[updatedChat.length - 1] = {
          type: "bot",
          message: matchedFaq
            ? matchedFaq.answer
            : "Sorry, I don't have an answer for that yet.",
        };
        return updatedChat;
      });
    }, 1500); // Delay for 1.5 seconds

    setUserInput("");
    setSuggestions([]);
  };

    return (
      <div className="h-screen bg-yellow-200">
      <h2>Ask Cendi for FAQs</h2>
      <div className="chat-messages">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={msg.type === "user" ? "user-message" : "bot-message"}
              >
                {msg.type === "bot" && msg.message === "Typing..." ? (
                  <span className="typing">Typing</span>
                ) : (
                  msg.message
                )}
              </div>
            ))}
          </div>
    </div>
    )
  }
  
  
  