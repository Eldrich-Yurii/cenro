import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user?.token) {
        return <Navigate to="/login"/>;
    }

    if (!allowedRoles.includes(user.role)) {
        return <h2>Access Denied</h2>
    }

    return children;
};

// PropTypes
ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
  };

export default ProtectedRoute;