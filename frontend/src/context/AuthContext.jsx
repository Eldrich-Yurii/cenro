import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null)

    const login = (userData) => {
        // console.log("Logging in with:", {userData});
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/admin/dashboard") // Store user in localStorage
    };

    
    // Ensure user stays logged in after refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user"); // Remove corrupt data
                setUser(null);            }
        }
    }, [localStorage.getItem("user")]);
    
    console.log(localStorage.getItem("user"));
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    };
    // PropTypes
    AuthProvider.propTypes = {
      allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
      children: PropTypes.node
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext)
}
