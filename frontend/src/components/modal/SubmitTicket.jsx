import { Button } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { TbTicket } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../../api/TicketApi";
export default function SubmitTicket() {
  const navigate = useNavigate();

  const { user } = useAuth(); // Get user from context
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Get user and token from AuthContext instead of localStorage
    const token = user?.token;
    if (!token) {
      setMessage("Authentication error: No token found.");
      setLoading(false);
      return;
    }
  
    console.log("Stored Token:", token);
    console.log("Sending Ticket Data:", { subject, description });
  
    try {
      const ticketData = { subject, description };
  
      // FIX: Correct argument order (ticketData first, then token)
      const newTicket = await createTicket(ticketData, token);
  
      setMessage("Ticket created successfully!");
      console.log("Ticket Created:", newTicket);
      
      setSubject("");
      setDescription("");
      navigate(0); // Refresh page
    } catch (err) {
      setMessage(err?.message || "Error creating ticket");
      console.error("Create Ticket Error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // const handleFormType = (value) => {
  //   console.log("Selected form type:", value); // Debugging
  //   setFormtype(value);
  // };

  return (
    <div className="z-10">
      {/* Button to open modal */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outlined"
        className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
      >
        <TbTicket className="text-lg" />
        Submit Ticket
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <form onSubmit={handleSubmit}>
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
            >
              <div className="grid grid-flow-row gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Submit A Ticket</h2>
                  <IoClose
                    onClick={() => setIsOpen(false)}
                    className="text-xl hover:text-red-700 cursor-pointer"
                  />
                </div>
                <div>
                  {/* <div>
                    <Select label="Select Category" value={formType} onChange={handleFormType}>
                      <Option value="General Inquiry">General Inquiry</Option>
                      <Option value="Application Concerns">Application Concern</Option>
                      <Option value="Webinar Assisstance">Webinar Assisstance</Option>
                      <Option value="Others">Others</Option>
                    </Select>
                  </div> */}
                   {message && <p>{message}</p>}
                  <div>
                    <label>Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={subject}
                      required
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea
                      name="desc"
                      rows="7"
                      cols="44"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border-2"
                      required
                      placeholder="Enter Your Concerns Here..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-red-600 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
                >
                  {loading ? "Submitting..." : "Create Ticket"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
