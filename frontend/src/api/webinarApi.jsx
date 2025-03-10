import axios from "axios"

const API = "http://localhost:5000/api/webinar";


export const createWebinar = async (dateTime, formType, webinarLink) => {
    try {
        const response = await axios.post(`${API}/create-webinar`, {dateTime, formType, webinarLink});

        return response.data;
    } catch (err) {
        throw err.response?.message.data || "Error creating webinar schedule";
    }
};

export const getAllWebinar = async () => {
    try {
        const response = await axios.get(`${API}/get-webinar`);
        console.log(response)
        return response.data;
      } catch (err) {
        throw err.response?.data.message || "Error Retrieving Webinar";
      }
}

// delete webinar sched
export const deleteWebinar = async (id, token) => {
  try {
    const response = await axios.delete(`${API}/delete-webinar/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`
        },
    })
    return response.data
  } catch (err) {
    console.error("Error deleting webinar:", err);
    throw err;
  }
}

// update webinar schedule
export const updateStatus = async (webinarId, status) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token; // Extract only the token
    console.log("Stored Token:", token);
  
    try {
      const response = await axios.put(
        `${API}/admin/update/${webinarId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw err.response?.data || "Error Updating Ticket Status";
    }
  };