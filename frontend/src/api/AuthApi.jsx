import axios from "axios"

// Register a normal user
// export const registerUser = async (userData) => {
//     return await API.post(`${API}/register`, userData);
// };
// export const createEmployee = (employeeData) => {
//     return API.post(`${API}/create-employee`, employeeData);
// }
// login a user
export const loginUser = async (userData) => {
  return axios.post("http://localhost:5000/api/auth/login", userData, { withCredentials: true })
}

// Logout function (just remove the token)
export const logoutUser = () => {
    localStorage.removeItem("token");
  };