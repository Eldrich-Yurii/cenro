import axios from "axios";

const API = "http://localhost:5000/api/auth";

// Register a normal user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData);
    return response.data;
  } catch (err) {
    throw err.response?.data.message || "Registration Failed";
  }
};

// create an employee
const user = JSON.parse(localStorage.getItem("user"));
console.log("Stored Token:", localStorage.getItem("user"));
const token = user?.token; // Extract only the token
console.log("Stored Token:", token);

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(
      `${API}/admin/create-employee`,
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure you're sending the token
          // "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Sending Employee Data:", employeeData);
    throw err.response?.data.message || "Registration Failed";
  }
};

// login a user
export const loginUser = async (email, password) => {
  // console.log("Sending login request with:", { email, password });
  try {
    const response = await axios.post(
      `${API}/login`,
      {
        email,
        password,
      }
      // { headers: { "Content-Type": "application/json" }}
    );

    console.log("Login Response:", response); //debugging

    return response.data;
  } catch (err) {
    console.error("Error logging in:", err.response?.data || err.message);
    throw err;
  }
};

export const getEmployees = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/employees`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching employees:", err);
  }
};

export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

// Logout function (just remove the token)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
