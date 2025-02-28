import axios from "axios"

const API = "http://localhost:5000/api/webinar";


export const createWebinar = async (dateTime, formType, webinarLink) => {
    try {
        const response = await axios.post(`${API}/create-webinar`, {dateTime, formType, webinarLink});

        return response.data;
    } catch (err) {
        throw err.response?.message.data || "Error creating webinar schedule";
    }
}