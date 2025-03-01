import { useEffect, useState } from "react";
import { getFaqs } from "../../api/ChatbotApi";
import {TbMessage, TbSend } from "react-icons/tb"
import "./FloatChatbot.css";

export default function PublicChatbot() {
  const [faqs, setFaqs] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getFaqs().then(setFaqs);
      setChatHistory([{ type: "bot", message: "Hello! I'm Cendi 😊 How can I assist you today?" }]);
    }
  }, [isOpen]);

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
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="chat-icon">
        Ask Cendi <TbMessage />
      </button>
      {isOpen && (
        <div className="chat-window">
            <div className=" shadow-lg p-2">

          <h3>Ask Cendi</h3>
            </div>

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

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((faq) => (
                <li key={faq._id} onClick={() => handleQuestionClick(faq)}>
                  {faq.question}
                </li>
              ))}
            </ul>
          )}

          <div className="p-2 pb-4 flex items-center justify-between">
            <input
            className="w-full p-2  m-1 mt-2 rounded-lg"
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type your question..."
            />
            <div>

            <button className="rounded-lg px-3 py-[0.68rem] bg-blue-800 text-2xl text-white" onClick={handleSendMessage}><TbSend/></button>
            </div>
          </div>

          {/* <div className="faq-list">
            <h4>Common Questions:</h4>
            {faqs.map((faq) => (
              <p key={faq._id} onClick={() => handleQuestionClick(faq)} className="faq-question">
                {faq.question}
              </p>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
}
