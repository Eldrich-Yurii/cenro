import jwt from "jsonwebtoken";
import usersSchema from "../../models/usersSchema.js";

export const verifyToken = async (req, res, next) => {
  try {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Received Token:", token);

  if (!token)
    return res.status(400).json({ error: "Access denied, No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await usersSchema.findById(decoded.id).select("-password"); // Attach user to request
    if (!req.user) return res.status(404).json({ message: "User not found" });    
    console.log("Token Verified:", decoded);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ error: "Invalid token", error });
  }
};
