import express from "express";
import { registerUser } from "../middlewares/auth/auth.regUserController.js";
import { loginUser } from "../middlewares/auth/auth.loginUser.js"
import { verifyToken } from "../middlewares/auth/auth.verifyAdmin.js";
import { createEmployee } from "../middlewares/auth/auth.createEmployee.js";
import verifyRoles from "../middlewares/verifyRoles.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/create-employee", verifyToken, createEmployee)
router.post("/login", loginUser);
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}` });
});

router.get("/admin", verifyToken, verifyRoles("admin"), (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
  res.json({ message: "Welcome, Admin" });
});

export default router;