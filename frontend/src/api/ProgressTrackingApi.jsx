import axios from "axios";

const API = "http://localhost:5000/api/progress";

// Fetch user progress
export const getUserApplicationProgress = async (token) => {
  try {
    const response = await axios.get(`${API}/user-progress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || "Error Retrieving Ticket";
  }
};

// Update user progress
// export const updateUserProgress = async (userId, newStep) => {
//   try {
//     const response = await axios.put(`${API}/${userId}`, { newStep });
//     return response.data.currentStep; // Return updated step
//   } catch (error) {
//     console.error("Error updating progress:", error);
//     throw error;
//   }
// };