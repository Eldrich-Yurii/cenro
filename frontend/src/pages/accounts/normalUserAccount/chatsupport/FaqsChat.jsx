import { getFaqs } from "../../../../api/ChatbotApi";
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import "./Chatbot.css";

export default function ChatSupport() {
  const [faqs, setFaqs] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

    setIsOpen(false)
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
      setSuggestions(filteredSuggestions.slice(0, 5));    } else {
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
            : "Sorry, I don't have an answer for that yet. Would you like to create a support ticket? 💡 You can create a support ticket, and a staff member will assist you.",
        };
        return updatedChat;
      });
    }, 1500); // Delay for 1.5 seconds

    setUserInput("");
    setSuggestions([]);
  };

  const handleCreateTicket = () => {
    // Redirect to ticket creation page
    window.location.href = "/user-account/support-ticket";
  };

  const handleDismissSuggestion = () => {
    setChatHistory((prev) => [
      ...prev,
      { type: "bot", message: "Alright! Let me know if you need anything else. 😊" }
    ]);
  };

  return (
    <div className="h-screen bg-yellow-200">
      <h2>Ask Cendi for FAQs</h2>

      {/* mesage content */}
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
         <div key={index} className={msg.type === "user" ? "user-message" : "bot-message"}>
         {msg.type === "bot" && msg.message === "Typing..." ? (
           <span className="typing">Typing</span>
         ) : (
           <>
             {msg.message}
             {msg.message.includes("Would you like to create a support ticket?") && (
               <div className="ticket-suggestion">
                <div className="pt-4">

                 <button className="ticket-btn" onClick={handleCreateTicket}>🎫 Yes, create a ticket</button>
                 <button className="cancel-btn" onClick={handleDismissSuggestion}>❌ No, thanks</button>
                </div>
               </div>
             )}
           </>
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
  {isOpen && (
             <div className="faq-list">
            <h4>Common Questions:</h4>
            {faqs.map((faq) => (
              <p key={faq._id} onClick={() => handleQuestionClick(faq)} className="faq-question">
                {faq.question}
              </p>
            ))}
          </div>
          )}
          <div className="p-2 pb-4 flex items-center justify-between">
            <input
            className="w-full p-2  m-1 mt-2 rounded-lg"
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your question..."
            />
            <div>

            <button className="rounded-lg px-3 py-[0.68rem] bg-blue-800 text-2xl text-white" onClick={handleSendMessage}><TbSend/></button>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="">
        FAQs
      </button>
          </div>
        
    </div>
  );
}
