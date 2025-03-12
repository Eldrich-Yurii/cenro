import webinarSchema from "../models/webinarSchema.js";
import mongoose from "mongoose";

export const deleteWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID for Deletion:", id);

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }

    // Find and delete the webinar
    const deletedWebinar = await webinarSchema.findByIdAndDelete(id);

    if (!deletedWebinar) {
      return res.status(404).json({ message: "No webinar found" });
    }

    return res.status(200).json({ message: "Webinar deleted successfully" });

  } catch (err) {
    console.error("Error deleting webinar:", err);
    return res.status(500).json({ message: "Error deleting webinar", error: err.message });
  }
};