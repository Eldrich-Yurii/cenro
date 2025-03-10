export const verifyDesignation = (...allowedDesignation) => {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  

      if (req.user.role !== "employee" || "admin" || !allowedDesignation.includes(req.user.designation)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      
      next();
    };
  };
  
  export default verifyDesignation;