import { Button, Select, Option } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { createWebinar } from "../../api/webinarApi";
// import { toast } from "react-toastify";
import { TbVideo } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function WebSchedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [dateTime, setDateTime] = useState("");
  const [formType, setFormType] = useState("");
  const [webinarLink, setWebinarLink] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
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

  // Click outside to close modal
  // useEffect(() => {
  //     const handleClickOutside = (event) => {
  //         if (modalRef.current && !modalRef.current.contains(event.target)) {
  //             setIsOpen(false);
  //         }
  //     };
  //     if (isOpen) {
  //         document.addEventListener("mousedown", handleClickOutside);
  //     }
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await createWebinar(dateTime, formType, webinarLink);
      alert(JSON.stringify(data))
      // toast.success("Webinar scheduled successfully!", data, { autoClose: 3000 });
      navigate(0)
    } catch (err) {
      alert(err || "Failed to Schedule Webinar");
    } finally {
      setLoading(false);
    }
  };

  const handleWebinarTitle = (value) => {
    console.log("Title:", value);
    setFormType(value);
  };

  return (
    <div className="z-10">
      {/* Button to open modal */}
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
        className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all font-inter"
      >
        <TbVideo className="text-lg" />
        Schedule a Webinar
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
          >
            <form onSubmit={handleSubmit}>
              <header className="grid grid-flow-row gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Schedule A Webinar</h2>
                  <IoClose
                    onClick={() => setIsOpen(false)}
                    className="text-xl hover:text-red-700 cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="">Webinar Title</label>
                  <br />
                  <Select
                    label="Choose a title..."
                    value={formType}
                    onChange={handleWebinarTitle}
                  >
                    <Option value="New Business Application">
                      New Business Application
                    </Option>
                    <Option value="Renewal of Business">
                      Renewal of Business
                    </Option>
                  </Select>
                </div>
                <div>
                  <label htmlFor="">Date and Time</label>
                  <br />
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">Webinar Link</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Paste your Webinar Link here"
                    value={webinarLink}
                    onChange={(e) => setWebinarLink(e.target.value)}
                    className="w-full"
                  />
                </div>
              </header>
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
                  {loading ? "Scheduling..." : "Schedule"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
