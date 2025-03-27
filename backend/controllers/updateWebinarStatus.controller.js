import webinarSchema from "../models/webinarSchema.js";
// import progressSchema from "../models/progressSchema.js";
import mongoose from "mongoose";

export const updateWebinarStatus = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging

    const { webinarId } = req.params;
    const { status } = req.body;

    // console.log("Received applicationId:", applicationId);

    if (!mongoose.Types.ObjectId.isValid(webinarId)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const webinar = await webinarSchema.findById(webinarId);

    if (!webinar) {
      console.log("Webinar ID not found in DB:", webinarId);
      return res.status(404).json({ message: "Webinar not found" });
    }

    // console.log("Extracted applicationId:", applicationId); // Debugging

    webinar.status = status;
    await webinar.save();

    return res.status(200).json({
      message: "Status updated successfully",
      webinar,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
};
