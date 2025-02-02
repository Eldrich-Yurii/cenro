import API from "./AxiosInstance";

// Register a normal user
export const registerUser = async (userData) => {
    return await API.post("/auth/register", userData);
};
// login a user
export const loginUser = async (credentials) => {
    return await API.post("/auth/login", credentials)
};

// Logout function (just remove the token)
export const logoutUser = () => {
    localStorage.removeItem("token");
  };