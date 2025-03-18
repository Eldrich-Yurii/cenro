import applicationSchema from "../models/applicationSchema.js";
import progressSchema from "../models/progressSchema.js";
import { generatePdf } from "./generatePdf.controller.js";

export const submitApplication = async (req, res) => {
    try {
       const { userId, accountNumber, businessName, ownerName, locationAddress, formType } = req.body;
       console.log("Request Body:", req.body);
       if (!userId || !accountNumber || !formType || !businessName || !locationAddress || !ownerName) {
        return res.status(400).json({ message: "Missing required fields" });
    }

       const pdfPath = await generatePdf({ businessName, accountNumber, ownerName, locationAddress, userId, formType });
        
       const newApplication = new applicationSchema({
        userId,
        accountNumber,
        ownerName,
        businessName,
        formType,
        locationAddress,
        pdfPath,
        // status: "pending",
        submittedAt: Date.now()
       });

       await newApplication.save()

       const progress = new progressSchema({
        userId,
        applicationId: newApplication._id,
        steps: {
            formSubmitted: true
        }});

        await progress.save()

        // save the progress ID in application Schema
        newApplication.progressId = progress._id
        await newApplication.save();

       const normalizedPath = pdfPath.replace(/\\/g, "/"); // Fix Windows backslashes
       const pdfUrl = `${req.protocol}://${req.get("host")}/${normalizedPath}`
       res.json({ message: "PDF Generated", pdfUrl});
    } catch(err) {
        res.status(500).json({ message: "Error generating PDF file", error: err.message })
    }
}