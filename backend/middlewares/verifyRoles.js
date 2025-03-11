export const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  
      if (!allowedRoles.includes(req.user.role)) {
        console.log("RES:",req.user.role)
        return res.status(403).json({ message: "Access Denied" });
      }
      
      next();
    };
  };
  
  export default verifyRoles;