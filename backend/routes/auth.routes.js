import express from "express";
import { registerUser } from "../middlewares/auth/auth.regUserController.js";
import { loginUser } from "../middlewares/auth/auth.loginUser.js"
import { verifyToken } from "../middlewares/auth/auth.verifyAdmin.js";
import { createEmployee } from "../middlewares/auth/auth.createEmployee.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { getEmployees } from "../controllers/getEmployee.controller.js";
import { getUsers } from "../controllers/getUser.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/create-employee", verifyToken, verifyRoles("admin"), createEmployee)
// router.get("/dashboard", verifyToken, (req, res) => {
//   res.json({ message: `Welcome, ${req.user.role}` });
// });


// Admin routes
router.get("/admin", verifyToken, verifyRoles("admin"), (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
  res.json({ message: "Welcome, Admin" });
});
router.get("/admin/employees", verifyToken, verifyRoles("admin"), getEmployees);
router.get("/admin/users", verifyToken, verifyRoles("admin"), getUsers);

export default router;