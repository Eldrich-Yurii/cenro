import express from "express";
import { registerUser } from "../middlewares/auth/auth.regUserController.js";
import { loginUser } from "../middlewares/auth/auth.loginUser.js";
import { verifyToken, isAdmin } from "../middlewares/auth/auth.verifyAdmin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}` });
});

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

export default router;