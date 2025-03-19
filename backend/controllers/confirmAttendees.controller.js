import webinarSchema from "../models/webinarSchema.js";
import applicationSchema from "../models/applicationSchema.js";
import notificationSchema from "../models/notificationSchema.js";
import { sendEmail } from "../middlewares/sendEmail.js";
import mongoose from "mongoose";

export const confirmAttendees = async (req, res) => {
    const userId = req.user.id;
    const { webinarId } = req.params;

    try {
        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }
        console.log("Received webinarId:", webinarId);
        console.log("Type:", typeof webinarId);
        
        if (!mongoose.Types.ObjectId.isValid(webinarId)) {
            return res.status(400).json({ message: "Invalid Webinar ID format" });
        }

        const webinar = await webinarSchema.findById(webinarId);
        if (!webinar) {
            return res.status(404).json({ message: "Webinar not found" });
        }

        // Already confirmed?
        const alreadyConfirmed = webinar.attendees.some(att => att.userId.equals(userId));
        if (alreadyConfirmed) {
            return res.status(400).json({ message: "You have already confirmed your attendance" });
        }

        // Webinar full?
        if (webinar.attendees.length >= webinar.maxAttendees) {
            return res.status(400).json({ message: "Webinar is full" });
        }

        // Check approved application
        const userApplication = await applicationSchema.find({
            userId: userId,
            status: "Approved"
        });

        if (userApplication.length === 0) {
            return res.status(400).json({ message: "No approved application found" });
        }

        // Add attendee
        webinar.attendees.push({
            userId: userId,
            applicationId: userApplication.map(application => application._id),
            confirmedAt: Date.now()
        });

        await webinar.save();

        // Notification
        await notificationSchema.create({
            userId,
            message: `You have successfully confirmed attendance for "${webinar.formType}". Webinar Link: ${webinar.webinarLink}`,
            type: "webinar confirmation",
            createdAt: Date.now()
        });

        // Get user email
        // const user = await userSchema.findById(userId);

        // Optional Email Sending
        /*
        await sendEmail({
            to: user.email,
            subject: `Webinar Confirmation: ${webinar.title}`,
            text: `You have successfully confirmed your attendance. Webinar Link: ${webinar.webinarLink}`
        });
        */

        res.status(200).json({ message: "Attendance Confirmed Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error confirming attendance", error: error.message });
    }
};