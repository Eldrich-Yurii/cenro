import webinarSchema from "../models/webinarSchema.js";
import mongoose from "mongoose";

export const updateWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }

    const { dateTime, webinarLink } = req.body;

    if (!dateTime && !webinarLink) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedWebinar = await webinarSchema.findByIdAndUpdate(
      id,
      { dateTime, webinarLink },
      { new: true }
    );

    if (!updatedWebinar) {
      return res.status(404).json({ message: "No webinar found" });
    }

    return res
      .status(200)
      .json({ message: "Webinar Updated Successfully", updatedWebinar });
  } catch (err) {
    console.error("Error Updating Webinar:", err);
    return res
      .status(500)
      .json({ message: "Error Updating Webinar", error: err.message });
  }
};
