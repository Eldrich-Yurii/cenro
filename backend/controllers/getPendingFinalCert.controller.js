import applicationSchema from "../models/applicationSchema.js"

export const getPendingFinalCert = async (req, res) => {
    try {
      const pendingUsers = await applicationSchema.find({ 
        status: "Approved", // Only those approved for a webinar
        attendance: true, // Users who haven't attended yet
        businessCertificate: false
      });
  
      res.status(200).json(pendingUsers);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving pending attendees" });
    }
  }