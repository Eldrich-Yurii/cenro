import axios from "axios";

const API = "http://localhost:5000/api/logs"

export const getLogs = async () => {
    try {
      const response = await axios.get(`${API}/get-logs`);
  
      return response.data;
    } catch (err) {
      throw err.response?.data.message || "Logs Retrieval failed";
    }
  };