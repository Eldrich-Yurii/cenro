import applicationSchema from "../models/applicationSchema.js";
import { generatePdf } from "./generatePdf.controller.js";

export const submitApplication = async (req, res) => {
    try {
       const { formData } = req.body;

       const userId = formData.userId;

       if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

       const pdfPath = await generatePdf({ formData, userId });
        
       const newApplication = new applicationSchema({
        userId: formData.userId,
        ownerName: formData.ownerName,
        formType: formData.formType,
        pdfPath,
        // status: "pending",
        submittedAt: Date.now()
       });

       await newApplication.save()

       res.status(200).json({ message: "PDF Generated", pdfPath});
    } catch(err) {
        res.status(500).json({ message: "Error generating PDF file", error: err.message })
    }
}