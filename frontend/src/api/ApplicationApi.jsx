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

export const getApplication = async (userId) => {
  try {
    const response = await axios.get(`${API}/get-application/${userId}`);

    return response.data;
  } catch (err) {
    throw err.response?.data.message || "Application Retrieval failed";
  }
};

export const getAllApplication = async () => {
    try {
        const response = await axios.get(`${API}/get-application`);
    
        return response.data;
      } catch (err) {
        throw err.response?.data.message || "Application Retrieval failed";
      }
}

export const uploadAssessment = async (applicationId, file) => {
  try {

    
    const formData = new FormData();
    formData.append("assessmentCert", file);

    const response = await axios.post(
      `http://localhost:5000/api/application/upload-assessment/${applicationId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error uploading file:", err.response?.data || err.message);
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
    return axios.put(`http://localhost:5000/api/application/${applicationId}/status`, { status });
  };