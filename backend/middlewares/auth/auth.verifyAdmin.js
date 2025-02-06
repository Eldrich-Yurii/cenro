import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(400).json({ error: "Access denied, No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Access Denied, Admin Only." });

    req.user = decoded; // Attach user data to request
    // console.log("Token Verified:", decoded);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token", error });
  }
};
