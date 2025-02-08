import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types"

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

     // Wait until the user is loaded (prevents "reading null" error)
     if (user === null) {
        return <div>Loading...</div>;
    }

    console.log("Checking ProtectedRoute - user:", user);

    if (!user.token) {
        console.warn("Redirecting to login - user is missing or token is invalid");
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <h2>Access Denied</h2>
    }

    console.log("User Data in ProtectedRoute: ", user);
    return <Outlet />;

};
// console.log("🚀 Allowed Roles:", allowedRoles);
// console.log("🛠 Current Role:", user.role);

// PropTypes
ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    // children: PropTypes.node,
  };

export default ProtectedRoute;