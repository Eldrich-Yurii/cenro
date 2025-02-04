const verifyRoles = (...allowedRoles) => {
    return (request, response, next) => {
      if (!request.user) return response.status(401).json({ message: "Unauthorized" });
  
      if (!allowedRoles.includes(request.user.role)) {
        return response.status(403).json({ message: "Access Denied" });
      }
      
      next();
    };
  };
  
  export default verifyRoles;