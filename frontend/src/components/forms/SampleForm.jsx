import { submitApplication } from "../../api/ApplicationApi";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SampleForm() {
  const { user } = useAuth(); // Get user from context
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [formType] = useState("New Business Application");

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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Application for New Business</h2>
      <div>
        <label>Business Name:</label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <label>Owner Name:</label>
        <input
          id="ownerName"
          name="ownerName"
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <button type="submit" className="bg-green-200 hover:bg-green-600">
          Submit Application
        </button>
      </div>
    </form>
  );
}
