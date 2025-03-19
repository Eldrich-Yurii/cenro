import axios from "axios";

const API = "http://localhost:5000/api/notification";

export const getNotif = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // Extract only the token
  console.log("Stored Token:", token);

  try {
    const response = await axios.get(`${API}/get-notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (err) {
    throw err.response?.data || "Error Retrieving Notification";
  }
};
