import applicationSchema from "../models/applicationSchema.js";
import mongoose from "mongoose";

export const updateApplicationStatus = async (req, res) => {
    try {

        console.log("Received request body:", req.body); // Debugging

        const { applicationId } = req.params;
        const { status } = req.body

        // console.log("Received applicationId:", applicationId);

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({ message: "Invalid application ID" });
        }

        const application = await applicationSchema.findById(applicationId);

        if (!application) {
            console.log("Application ID not found in DB:", applicationId);
            return res.status(404).json({ message: "Application not found" });
        }

        // console.log("Extracted applicationId:", applicationId); // Debugging

        application.status = status;
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            application
        });

    } catch(err) {
        res.status(500).json({ message: "Error updating status", err})
    }
}