import axios from "axios";

const API = "http://localhost:5000/api/progress";

// Fetch user progress
export const getUserProgress = async (userId) => {
  try {
    const response = await axios.get(`${API}/${userId}`);
    return response.data.currentStep; // Return only the step
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw error;
  }
};

// Update user progress
export const updateUserProgress = async (userId, newStep) => {
  try {
    const response = await axios.put(`${API}/${userId}`, { newStep });
    return response.data.currentStep; // Return updated step
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};