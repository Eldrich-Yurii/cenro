import { Button, Select, Option, Input, Typography } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { TbFileText } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { submitApplication } from "../../api/ApplicationApi";
import { useNavigate } from "react-router-dom";

export default function SubmitApplication() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [formType, setFormtype] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.userId) {
      console.log("User ID not found. Please log in.");
      return;
    }

    const formData = {
      userId: user.userId,
      accountNumber,
      businessName,
      ownerName,
      locationAddress,
      formType,
      role: user.role,
    };

    setIsSubmitting(true);
    try {
      await submitApplication(formData);
      navigate(0);
    } catch (err) {
      console.error("Error submitting application:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    setFormtype(value);
  };

  return (
    <div className="z-10">
      <Button
        onClick={() => setIsOpen(true)}
        variant="outlined"
        className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
      >
        <TbFileText className="text-lg" />
        Submit Application
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-lg shadow-lg w-full transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
            >
              <div className="grid grid-flow-row gap-4">
                <header className="flex justify-between items-center mb-4">
                  <Typography variant="h5" className="font-bold">
                    Application for New Business
                  </Typography>
                  <IoClose
                    onClick={() => setIsOpen(false)}
                    className="text-xl hover:text-red-700 cursor-pointer"
                  />
                </header>

                <div>
                  <Select label="Select form type" value={formType} onChange={handleFormType}>
                    <Option value="New Business Application">New Business Application</Option>
                    <Option value="Renewal of Business">Renewal of Business</Option>
                  </Select>
                </div>

                <div>
                  <Input
                    label="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="border-black-500 rounded-md p-2 focus:border-black-700"
                  />
                </div>

                <div>
                  <Input
                    label="Owner Name"
                    placeholder="John dela Cruz"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>

                <div>
                  <Input
                    label="Account Number"
                    placeholder="00000"
                    value={accountNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 5);
                      setAccountNumber(numericValue);
                    }}
                  />
                </div>

                <div>
                  <Input
                    label="Business Location"
                    placeholder="Business Address"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value.toUpperCase())}
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="text"
                    color="red"
                    className="mr-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="blue"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}