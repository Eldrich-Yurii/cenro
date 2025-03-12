export const verifyDesignation = (allowedDesignation) => {
    return (req, res, next) => {
      console.log("User:", req.user)
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  
      if (req.user.role === "admin") {
        return next();
      }

      console.log("User role:", req.user.role)
      if (!req.user.role || !allowedDesignation.includes(req.user.designation)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    };
  };
  
  export default verifyDesignation;