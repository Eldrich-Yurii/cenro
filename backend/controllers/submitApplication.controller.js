import applicationSchema from "../models/applicationSchema.js";
import { generatePdf } from "./generatePdf.controller.js";

export const submitApplication = async (req, res) => {
    try {
       const { userId, businessName, ownerName, formType } = req.body;

       if (!userId || !formType || !businessName || !ownerName) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
       if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

       const pdfPath = await generatePdf({ businessName, ownerName, userId, formType });
        
       const newApplication = new applicationSchema({
        userId,
        ownerName,
        businessName,
        formType,
        pdfPath,
        // status: "pending",
        submittedAt: Date.now()
       });

       await newApplication.save()

       const normalizedPath = pdfPath.replace(/\\/g, "/"); // Fix Windows backslashes
       const pdfUrl = `${req.protocol}://${req.get("host")}/${normalizedPath}`
       res.json({ message: "PDF Generated", pdfUrl});
    } catch(err) {
        res.status(500).json({ message: "Error generating PDF file", error: err.message })
    }
}