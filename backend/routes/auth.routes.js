import express from "express";
import { registerUser } from "../middlewares/auth/auth.regUserController.js";
import { loginUser } from "../middlewares/auth/auth.loginUser.js"
import { verifyToken } from "../middlewares/auth/auth.verifyAdmin.js";
import { createEmployee } from "../middlewares/auth/auth.createEmployee.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { getEmployees } from "../controllers/getEmployee.controller.js";
import { getUsers } from "../controllers/getUser.controller.js";
import { updateEmpDesignation } from "../middlewares/auth/auth.updateEmpDesignation.js";
import { deleteEmployee } from "../middlewares/auth/auth.deleteEmployee.js";

const router = express.Router();

// Register Normal User
router.post("/register", registerUser);
// Login for All of the Users
router.post("/login", loginUser);

  
  
// Admin routes
//CREATE an employee account
router.post("/admin/create-employee", verifyToken, verifyRoles("admin"), createEmployee);

// GET Admin account
router.get("/admin", verifyToken, verifyRoles("admin"), (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
  res.json({ message: "Welcome, Admin" });
});

// GET users from DB to admin table
router.get("/admin/employees", verifyToken, verifyRoles("admin"), getEmployees);

// GET users from DB to admin table
router.get("/admin/users", verifyToken, verifyRoles("admin"), getUsers);

//UPDATE employee designation
router.put("/admin/update-employee/:id", verifyToken, verifyRoles("admin"), updateEmpDesignation);

// DELETE employee account
router.delete("/admin/delete-employee/:id", verifyToken, verifyRoles("admin"), deleteEmployee);

export default router;