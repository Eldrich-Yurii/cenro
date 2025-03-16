import webinarSchema from "../models/webinarSchema.js";
import applicationSchema from "../models/applicationSchema.js";
import mongoose from "mongoose";

export const confirmAttendees = async (req, res) => {
    
    const { userId } = req.body;
    const webinarId  = req.params.id
    
    try {

        console.log("USER:", userId)

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format" });
          }

        const webinar = await webinarSchema.findById(webinarId)

        console.log("Webinar:", webinarId)

        if(!webinar) {
            return res.status(404).json({ message: "Webinar not found" })
        }

        const alreadyConfirmed = webinar.attendees.some(att => att.userId.equals(userId));

        if(alreadyConfirmed) {
            return res.status(400).json({ message: "You have already confirmed your attendance" });
        }

        if(webinar.attendees.length === webinar.maxAttendees.length) {
            return res.status(400).json({ message: "Webinar is full" });
        }

        const userApplication = await applicationSchema.find({
            userId: userId,
            status: "Approved"
        })

        webinar.attendees.push({
            userId: userId,
            applicationId: userApplication.map(application => application._id),
            confirmedAt: Date.now()
        })

        await webinar.save()
        res.status(200).json({ message: "Attendance Confirm Successfully"})
    } catch (error) {
        res.status(500).json({ message: "Error confirming attendance", error: error.message })
    }
}