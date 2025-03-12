import mongoose from "mongoose";
import User from "../../models/usersSchema.js"; // Adjust path if needed
import { saveLog } from "../../controllers/saveLog.controller.js";

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params; // Get employee ID from the request URL

    console.log("Received Employee ID for Deletion:", id);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user._id;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee ID format" });
    }

    // Convert the ID to an ObjectId and find the employee
    const employeeId = new mongoose.Types.ObjectId(id);
    const employee = await User.findOne({ _id: employeeId });

    console.log("Found Employee:", employee); // Log to check if employee exists

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ✅ Delete the employee
    await User.deleteOne({ _id: employeeId });
    await saveLog("Employee Created", userId);

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
