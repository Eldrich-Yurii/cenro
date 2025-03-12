import { useEffect, useState, useRef } from "react";
import { getFaqs } from "../../api/ChatbotApi";
import {TbMessage, TbSend } from "react-icons/tb"
import "./FloatChatbot.css";
import Fuse from "fuse.js";

export default function PublicChatbot() {
  const [faqs, setFaqs] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const chatMessagesRef = useRef(null); // Create a ref

  useEffect(() => {
    if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
}, [chatHistory]);

  useEffect(() => {
    if (isOpen) {
      getFaqs().then(setFaqs);
      setChatHistory([{ type: "bot", message: "Hello! I'm Cendi 😊 How can I assist you today?" }]);
    }
  }, [isOpen]);

  

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isSending) {
        e.preventDefault(); 
        if (userInput.trim()) {
          handleSendMessage();
        }
      }
    };

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
    if (isSending) return;
    setIsSending(true);
  
    const fuse = new Fuse(faqs, { 
      keys: ["question"], 
      threshold: 0.4, 
      distance: 1,
      includeScore: true, });
    const results = fuse.search(userInput);

    let response;
    if (results.length > 0) {
        
        response = results[0].item.answer;
    } else {
        response = "Sorry, I'm still learning with that, or you can sign up to use our chat support if your concern is not listed." ; 
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

          <div className="chat-messages" ref={chatMessagesRef}>
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
                 <small>
                  
                  {faq.question}
                  </small> 
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
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={isSending}
            />
            <div>

            <button 
            className="rounded-lg px-3 py-[0.68rem] bg-blue-800 text-2xl text-white" 
            onClick={handleSendMessage}
              disabled={isSending || !userInput.trim()}>
              <TbSend/></button>
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
