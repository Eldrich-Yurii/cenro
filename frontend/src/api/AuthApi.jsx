import axios from "axios";

const API = "http://localhost:5000/api/auth";

// Register a normal user
export const registerUser = async (userData) => {
  try {
    const response  = await axios.post(`${API}/register`, userData);
    return response.data
  } catch(err) {
    throw err.response?.data.message || "Registration Failed"
  }
};

// export const createEmployee = (employeeData) => {
//     return API.post(`${API}/create-employee`, employeeData);
// }
// login a user

export const loginUser = async (email, password) => {
  // console.log("📢 Sending login request with:", { email, password });
  try {
    const response = await axios.post(`${API}/login`,{
      email,
      password
    },
    // { headers: { "Content-Type": "application/json" }}
   );

    console.log("Login Response:", response); //debugging
    
    return response.data;
    
  } catch (err) {
    console.error("Error logging in:", err.response?.data || err.message);
    throw err;
  }
};

// Logout function (just remove the token)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
