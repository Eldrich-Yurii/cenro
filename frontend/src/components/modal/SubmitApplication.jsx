import { Button, Select, Option } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { TbUserPlus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { submitApplication } from "../../api/ApplicationApi";

export default function SubmitApplication() {
  const { user } = useAuth(); // Get user from context
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  // const [formType] = useState("New Business Application");
  const [formType, setFormtype] = useState("");
  // const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.userId) {
      console.log("User ID not found. Please log in.");
      return;
    }

    const formData = {
      userId: user.userId,
      businessName,
      ownerName,
      formType,
      role: user.role,
    };

    try {
      const data = await submitApplication(formData); // Directly access `data`
      console.log("Backend Response Data:", data);

      if (data.pdfUrl) {
        const pdfUrl = data.pdfUrl;
        console.log("PDF URL:", pdfUrl);

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute("download", "Application-form.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("Error submitting application:", err);
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

  const handleFormType = (value) => {
    console.log("Selected Designation:", value); // Debugging
    setFormtype(value);
  };

  return (
    <div className="z-10">
      {/* Button to open modal */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outlined"
        className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
      >
        <TbUserPlus className="text-lg" />
        Submit Application
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
                  <h2 className="text-xl font-bold">Application for New Business</h2>
                  <IoClose
                    onClick={() => setIsOpen(false)}
                    className="text-xl hover:text-red-700 cursor-pointer"
                  />
                </div>
                <div>
                  <div>
                    <Select label="Select form type" value={formType} onChange={handleFormType}>
                      <Option value="New Business Application">New Business Application</Option>
                      <Option value="Renewal of Business">Renewal of Business</Option>
                    </Select>
                  </div>
                <div>
                  <label>Business Name:</label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div>
                  <label>Owner Name:</label>
                  <input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    />
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
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
                >
                  Submit Application
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
