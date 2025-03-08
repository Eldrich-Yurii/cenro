import axios from "axios";

const API = "http://localhost:5000/api/application";

export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API}/generate-pdf`, applicationData);
    return response.data;
  } catch (err) {
    throw err.response?.data.message || "Application Submission failed";
  }
};

// Get user application
export const getUserApplication = async (token) => {
  try {
    const response = await axios.get(`${API}/get-user-application`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || "Error Retrieving Ticket";
  }
};

export const getAllApplication = async () => {
  try {
    const response = await axios.get(`${API}/get-application`);

    return response.data;
  } catch (err) {
    throw err.response?.data.message || "Application Retrieval failed";
  }
};

export const viewAssessmentCert = async (applicationId) => {
  try {
    const response = await axios.get(
      `${API}/view-assessment-file/${applicationId}`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  } catch (err) {
    console.log("Error retrieving file", err);
  }
};

export const viewCertificateOfAttendance = async (applicationId) => {
  try {
    const response = await axios.get(
      `${API}/view-certificate-of-attendance/${applicationId}`,
      {
        responseType: "blob",
      }
    );

    console.log(response)
    return response.data;
  } catch (err) {
    console.log("Error retrieving file", err);
  }
};
export const viewFinalCertificate = async (applicationId) => {
  try {
    const response = await axios.get(
      `${API}/view-final-certificate/${applicationId}`,
      {
        responseType: "blob",
      }
    );

    console.log(response)
    return response.data;
  } catch (err) {
    console.log("Error retrieving file", err);
  }
};

export const getPendingWebinarUsers = async (token) => {
  try {
    const response = await axios.get(`${API}/pending-webinar-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data.message || "Failed to fetch pending webinar users";
  }
};

export const uploadAssessment = async (applicationId, file) => {
  try {
    const formData = new FormData();
    formData.append("assessmentCert", file);

    const response = await axios.post(
      `${API}/upload-assessment/${applicationId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error uploading file:", err.response?.data || err.message);
    throw new Error(err.response?.data || "Error uploading file");
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    console.log("Sending applicationId:", applicationId); // Debugging

    const response = await axios.put(
      `${API}/update-status/${applicationId}`,
      { status },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Update Response:", response.data);
  } catch (error) {
    console.log(
      "Error updating status:",
      error.response?.data || error.message
    );
  }
};


export const confirmAttendance = async (applicationId) => {
  try {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    console.log("TOKEN:", token)

    if (!token) {
      console.log("Token not found.");
      return;
    }
    console.log("Confirming attendance for:", applicationId); // Debugging

    const response = await axios.post(
      `${API}/generate-certificate/${applicationId}`,
      {}, // Corrected endpoint
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Certificate Generation Response:", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Error generating certificate:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data || "Error generating certificate");
  }
};

