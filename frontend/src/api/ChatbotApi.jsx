import axios from "axios";

const API = "http://localhost:5000/api/faqs";

export const getFaqs = async () => {
    try {
        const response = await axios.get(`${API}/get-faqs`);
        return response.data
    } catch (err) {
        throw err.response?.message.data || "Error Fetching FAQs";
    }
};


// Add new FAQ (For future admin panel)
// export const addFaq = async (newFaq) => {
//     try {
//       const response = await axios.post(API, newFaq);
//       return response.data;
//     } catch (error) {
//       console.error("Error adding FAQ:", error);
    //   return null;
//     }
//   };
  
  // Update FAQ (For future admin panel)
//   export const updateFaq = async (id, updatedFaq) => {
//     try {
//       const response = await axios.put(`${API}/${id}`, updatedFaq);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating FAQ:", error);
    //   return null;
//     }
//   };
  
  // Delete FAQ (For future admin panel)
//   export const deleteFaq = async (id) => {
//     try {
//       const response = await axios.delete(`${API}/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting FAQ:", error);
//       return false;
//     }
//   };