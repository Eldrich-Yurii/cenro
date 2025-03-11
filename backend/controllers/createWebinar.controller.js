import webinarSchema from "./../models/webinarSchema.js";
import applicationSchema from "./../models/applicationSchema.js";
import { saveLog } from "../controllers/saveLog.controller.js";

export const createWebinar = async (req, res) => {
  try {
    console.log("ID:", req.user)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user._id;
    const { dateTime, formType, webinarLink } = req.body;
    if (!dateTime || !formType || !webinarLink) {
      return res.status(400).json({ error: "Date and form type are required" });
    }

    // Find users who are approved & don't have a Certificate of Attendance
    const eligibleUsers = await applicationSchema.find({
      formType,
      status: "Approved",
      $or: [
        { certificateOfAttendance: false },
        { certificateOfAttendance: { $exists: false } }, // Include docs where it's missing
      ],
    });

    console.log("Eligible Users After Fix:", eligibleUsers);

    console.log("Eligible Users:", eligibleUsers);
    if (eligibleUsers.length === 0) {
      return res
        .status(400)
        .json({ error: "No eligible users found for this webinar." });
    }

    // Create the webinar

    const webinar = new webinarSchema({
      formType,
      dateTime: new Date(dateTime),
      webinarLink, // Convert to Date object
      attendees: eligibleUsers.map((app) => ({
        userId: app.userId,
        applicationId: app._id,
        businessName: app.businessName,
      })),
    });

    await webinar.save();
    await saveLog("Designation Updated", userId);

    res
      .status(201)
      .json({ message: "Webinar scheduled successfully", webinar });
  } catch (err) {
    res.status(500).json({ message: "Error creating a Schedule", error: err.message });
  }
};
