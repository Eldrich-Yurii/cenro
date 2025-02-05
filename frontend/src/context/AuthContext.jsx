import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Get user from localStorage if exists
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const navigate = useNavigate();

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    // useEffect(() => {
    //   const storedToken = localStorage.getItem("token");
    //   const storedRole = localStorage.getItem("role");
  
    //   if (storedToken && storedRole) {
    //     setUser({ token: storedToken, role: storedRole });
    //   }
    // }, []);
  
    // PropTypes
    AuthProvider.propTypes = {
      allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
      children: PropTypes.node.isRequired,
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
