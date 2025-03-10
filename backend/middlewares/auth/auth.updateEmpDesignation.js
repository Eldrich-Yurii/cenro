import usersSchema from "../../models/usersSchema.js";
import mongoose from "mongoose";
import { saveLog } from "../../controllers/saveLog.controller.js";

export const updateEmpDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user._id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const { designation } = req.body;

    if (!designation) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedDesignation = await usersSchema.findByIdAndUpdate(
      id,
      { designation },
      { new: true }
    );

    if (!updatedDesignation) {
      return res.status(404).json({ message: "No employee found" });
    }

    await saveLog("Designation Updated", userId, `Webinar ID: ${id}`);

    return res
      .status(200)
      .json({
        message: "Designation Updated Successfully",
        updatedDesignation,
      });
  } catch (err) {
    console.error("Error Updating Employee Designation:", err);
    return res
      .status(500)
      .json({
        message: "Error Updating Employee Designation",
        error: err.message,
      });
  }
};
