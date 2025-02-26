import applicationSchema from "../models/applicationSchema.js";

export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.body;
        const { status }= req.body

        const application = await applicationSchema(applicationId);
        if(!applicationId) {
            res.status(404).json({ message: "Application not found"});
        };

        application.status = status;

        await application.save();

        res.status(200).json({ message: "Status updated successfully"}, application)
    } catch(err) {
        res.status(500).json({ message: "Error updating status", err})
    }
}