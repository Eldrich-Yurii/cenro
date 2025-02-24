import axios from "axios";

const API = "http://localhost:5000/api/application";


export const submitApplication = async (applicationData) => {
    
    try {
        const response = await axios.post(`${API}/generate-pdf`, applicationData);
        return response.data;
    } catch (err) {
        throw err.response?.data.message || "Application Submission failed"; 
    }
}